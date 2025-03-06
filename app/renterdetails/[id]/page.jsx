"use client";
import React, { useEffect, useState } from "react";

import { ArrowLeft, Plus, Edit2, Trash2, Power, PowerOff } from "lucide-react";
import { Button } from "@/components/ui/button";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import RenterForm from "@/components/RenterForm";
import { Badge } from "@/components/ui/badge";

import { useParams, useRouter } from "next/navigation";

import DeleteDialog from "@/components/DeleteDialog";

import useStore from "@/lib/store";
import toast from "react-hot-toast";
import dayjs from "dayjs";
import PaymentForm from "@/components/PaymentForm";
import LoadingSpinner from "@/components/LoadingSpinner";

// ✅ Date Formatting Helper
const formatDate = (date) => dayjs(date).format("DD/MMMM/YYYY");

const toggleDefault = "bg-gradient-to-r from-[#8b6add] to-[#425bc3]";
const toggleSecondary =
  "border-transparent bg-neutral-100 text-neutral-900 hover:bg-neutral-100/80";

const page = () => {
  const params = useParams();
  const router = useRouter();

  const {
    showDeleteRenterDialog,
    setShowDeleteRenterDialog,
    showStatusChangeDialog,
    setShowStatusChangeDialog,
    showEditRenter,
    setShowEditRenter,
    isSubmitting,
    setIsSubmitting,
    showForm,
    setShowForm,
    showDeletePaymentDialog,
    setShowDeletePaymentDialog,
    showEditPaymentDialog,
    setShowEditPaymentDialog,
  } = useStore();

  // console.log("param.id: ", params.id);

  const [renter, setRenter] = useState({});
  const [payments, setPayments] = useState([]);
  const [paymentId, setPaymentId] = useState(null);
  const [updatePaymentDefaultValues, setUpdatePaymentDefaultValues] = useState({
    date: new Date(),
    rentPaid: 0,
    lightBillPaid: 0,
    waterBillPaid: 0,
    lightMeterReading: 0,
    paymentMode: "Cash",
    onlinePlatform: "",
    comments: "",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingPayments, setIsLoadingPayments] = useState(false);

  useEffect(() => {
    const id = params.id.toString(); // Ensure the ID is a string
    getRenterDetails(id);
  }, [params.id, showEditRenter, showForm]);

  // useEffect(() => {
  //   console.log("show delete Dialog: ", showDeleteRenterDialog);
  // }, [showDeleteRenterDialog]);

  // === Fetch Renter details ===
  const getRenterDetails = async (id) => {
    try {
      setIsLoading(true);
      const res = await fetch(`/api/renterdetails/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const data = await res.json();

      if (res.ok) {
        setRenter(data.renter);
        // Fetch payments for this renter
        setIsLoadingPayments(true);
        const paymentsRes = await fetch(`/api/payment?renterId=${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });

        const paymentsData = await paymentsRes.json();
        if (paymentsRes.ok) {
          setPayments(paymentsData.payments);
        }
      } else {
        console.error("Failed to fetch renter details:", data.error);
      }
    } catch (error) {
      console.error("Error fetching renter details:", error);
    } finally {
      setIsLoading(false);
      setIsLoadingPayments(false);
    }
  };

  // === form submission for adding Payment Details ===
  const handleAddPayment = async (formData) => {
    try {
      setIsSubmitting(true);

      const formattedData = {
        renterId: renter._id,
        ...formData,
        date: formatDate(formData.date),
      };

      const response = await fetch("/api/payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formattedData),
      });

      const data = await response.json();

      if (response.ok) {
        setShowForm(false);
        toast.success("Payment added successfully!");
        getRenterDetails(renter._id);
      } else {
        throw new Error(data.msg || "Failed to add payment");
      }
    } catch (error) {
      console.error("Error adding payment:", error);
      toast.error(error.message || "Failed to add payment");
    } finally {
      setIsSubmitting(false);
    }
  };

  // === Delete Renter ===
  const deleteRenter = async (renterId) => {
    try {
      const response = await fetch("/api/renters", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ _id: renterId }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log(data.msg); // Handle success message
        setShowDeleteRenterDialog(false);
        toast.success("Renter deleted successfully!");
        router.push("/rent");
        // You can now update your UI based on the success response
      } else {
        console.error(data.msg); // Handle error message
      }
    } catch (error) {
      console.error("Error while deleting renter:", error);
    }
  };

  // === Toggle active/inactive ===
  const toggleRenterStatus = async (renterId) => {
    try {
      const response = await fetch("/api/renters", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ _id: renterId }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log(data.msg); // Handle success message
        toast.success("Renter status updated successfully!");
        router.push("/rent");
        // You can now update your UI based on the success response
      } else {
        console.error(data.msg); // Handle error message
      }
    } catch (error) {
      console.error("Error while toggling renter status:", error);
    }
  };

  // === Update Renter details ===
  const handleUpdateRenter = async (formData) => {
    try {
      setIsSubmitting(true);
      let reqData = {
        _id: renter._id,
        ...formData,
        moveInDate: formatDate(formData.moveInDate),
      };

      const response = await fetch(`/api/renters`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(reqData),
      });

      const data = await response.json();

      if (data.success) {
        toast.success("Renter updated successfully!");
        setShowEditRenter(false);
      } else {
        toast.error("Failed to update renter data.");
      }
    } catch (error) {
      console.log("Error updating renter data → ", error);
      toast.error("Error updating renter data.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // === Delete a Payment ===
  const deletePayment = async (renterId, paymentId) => {
    try {
      setIsSubmitting(true);
      const response = await fetch(`/api/payment/${paymentId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const data = await response.json();

      if (response.ok) {
        setShowDeletePaymentDialog(false);
        toast.success("Payment deleted successfully!");
        getRenterDetails(renterId);
      } else {
        throw new Error(data.msg || "Failed to delete payment");
      }
    } catch (error) {
      console.error("Error deleting payment:", error);
      toast.error(error.message || "Failed to delete payment");
    } finally {
      setIsSubmitting(false);
    }
  };

  // === Update a Payment ===
  const updatePayment = async (renterId, paymentId, formData) => {
    try {
      setIsSubmitting(true);

      const formattedData = {
        ...formData,
        date: formatDate(formData.date),
      };

      const response = await fetch(`/api/payment/${paymentId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formattedData),
      });

      const data = await response.json();

      if (response.ok) {
        setShowEditPaymentDialog(false);
        toast.success("Payment updated successfully!");
        getRenterDetails(renterId);
      } else {
        throw new Error(data.msg || "Failed to update payment");
      }
    } catch (error) {
      console.error("Error updating payment:", error);
      toast.error(error.message || "Failed to update payment");
    } finally {
      setIsSubmitting(false);
    }
  };

  // === Get a Payment Details ===
  const getPaymentDetails = async (paymentId) => {
    try {
      const response = await fetch(`/api/payment/${paymentId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const data = await response.json();

      if (response.ok) {
        const payment = data.payment;

        setUpdatePaymentDefaultValues({
          date: payment.date ? dayjs(payment.date).toDate() : new Date(),
          rentPaid: payment.rentPaid || 0,
          lightBillPaid: payment.lightBillPaid || 0,
          waterBillPaid: payment.waterBillPaid || 0,
          lightMeterReading: payment.lightMeterReading || 0,
          paymentMode: payment.paymentMode || "Cash",
          onlinePlatform: payment.onlinePlatform || "",
          comments: payment.comments || "",
        });
      } else {
        throw new Error(data.msg || "Failed to fetch payment details");
      }
    } catch (error) {
      console.error("Error fetching payment details:", error);
      toast.error(error.message || "Failed to fetch payment details");
    }
  };

  // === Default values for updating a renter ===
  const updateFormDefaultValues = {
    _id: renter._id,
    phoneNumber: renter.phoneNumber,
    name: renter.name,
    moveInDate: renter.moveInDate
      ? dayjs(renter.moveInDate).toDate()
      : new Date(),
    initialLightMeterReading: renter.initialLightMeterReading || 0,
    comments: renter.comments || "",
  };

  // === Default values for add payment form ===
  const addPaymentDefaultValues = {
    date: new Date(),
    lightMeterReading: 0,
    rentPaid: 0,
    lightBillPaid: 0,
    waterBillPaid: 0,
    paymentMode: "Cash",
    onlinePlatform: "", // updated from onlinePaymentType
    comments: "", // updated from comment
  };

  return (
    <section className="container mx-auto py-8 px-4">
      <Button
        variant="ghost"
        className="mb-6 text-blue-500"
        onClick={() => router.push("/rent")}
      >
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
      </Button>

      {isLoading ? (
        <div className="min-h-[400px] flex items-center justify-center">
          <LoadingSpinner size="lg" />
        </div>
      ) : (
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-2xl font-bold text-purple-500">
                {renter.name}
              </CardTitle>
              <div className="flex items-center gap-2 mt-2">
                <Badge
                  className={renter.active ? toggleDefault : toggleSecondary}
                >
                  {/* <Badge variant={renter.active ? "default" : "secondary"}> */}

                  {renter.active ? "Active" : "Inactive"}
                </Badge>
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                className="text-blue-500"
                variant="outline"
                size="icon"
                onClick={() => setShowEditRenter(true)}
              >
                <Edit2 className="h-4 w-4" />
              </Button>
              <Button
                className="text-orange-500"
                variant="outline"
                size="icon"
                onClick={() => setShowStatusChangeDialog(true)}
              >
                {renter.active ? (
                  <PowerOff className="h-4 w-4" />
                ) : (
                  <Power className="h-4 w-4" />
                )}
              </Button>
              <Button
                variant="destructive"
                size="icon"
                onClick={() => setShowDeleteRenterDialog(true)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>

          {/* <CardContent className=""> */}

          <CardContent className="px-0 sm:px-4">
            <main className="px-3 sm:px-0">
              <div className="flex-col flex sm:grid sm:grid-cols-2 sm:gap-2 ">
                <div className="flex justify-between sm:block">
                  <p className="mb-1">Move-in Date</p>
                  <p className="text-sm sm:text-lg font-bold">
                    {renter.moveInDate}
                  </p>
                </div>
                <div className="flex justify-between sm:block">
                  <p className="mb-1">Phone No</p>
                  <p className="text-sm sm:text-lg">{renter.phoneNumber}</p>
                </div>
                <div className="flex justify-between sm:block">
                  <p className="mb-1">Initial Light Meter Reading</p>
                  <p className="text-sm sm:text-lg font-bold">
                    {renter.initialLightMeterReading}
                  </p>
                </div>

                <div className="flex flex-col sm:bloc mb-3">
                  <p className="mb-1">Commetns</p>
                  <p className=" text-md text-[#797b7f]">{renter.comments}</p>
                </div>
              </div>

              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Payment History</h3>
                <Button
                  onClick={() => setShowForm(true)}
                  className={`${toggleDefault}`}
                >
                  <Plus className="mr-2 h-4 w-4" /> Add Payment
                </Button>
              </div>
            </main>

            {/* === RENTER PAYMENTS === */}
            {isLoadingPayments ? (
              <div className="min-h-[200px] flex items-center justify-center">
                <LoadingSpinner />
              </div>
            ) : payments.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-0 sm:gap-4">
                {payments.map((payment) => (
                  <Card
                    key={payment._id}
                    className="rounded-none px-0 border-x-0 sm:border"
                  >
                    <CardContent className="pt-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <div className="font-semibold">
                            {formatDate(payment.date)}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            Reading: {payment.lightMeterReading}
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => {
                              getPaymentDetails(payment._id);
                              setPaymentId(payment._id);
                              setShowEditPaymentDialog(true);
                            }}
                          >
                            <Edit2 className="h-4 w-4 text-blue-400" />
                          </Button>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => {
                              console.log(
                                "delete btn paymentId: ",
                                payment._id
                              );
                              setPaymentId(payment._id);
                              setShowDeletePaymentDialog(true);
                            }}
                          >
                            <Trash2 className="h-4 w-4 text-red-500" />
                          </Button>
                        </div>
                      </div>

                      <div className="grid gap-2">
                        <div className="flex justify-between">
                          <span>Rent:</span>
                          <span>₹ {payment.rentPaid}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Light Bill:</span>
                          <span>₹ {payment.lightBillPaid}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Water Bill:</span>
                          <span>₹ {payment.waterBillPaid}</span>
                        </div>
                        <div className="flex justify-between font-bold">
                          <span>Total:</span>
                          <span>
                            ₹{" "}
                            {payment.lightBillPaid +
                              payment.waterBillPaid +
                              payment.rentPaid}
                          </span>
                        </div>
                        <div className="flex justify-between text-sm text-[#797b7f]">
                          <span>Payment Mode:</span>
                          <span>
                            {payment.paymentMode}
                            {payment.onlinePlatform &&
                              ` (${payment.onlinePlatform})`}
                          </span>
                        </div>
                        {payment.comments && (
                          <div className="mt-0 text-sm text-[#797b7f]">
                            <span className="">Note: </span>
                            {payment.comments}
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <p className="text-center py-8 text-muted-foreground">
                No payments recorded yet.
              </p>
            )}
          </CardContent>
        </Card>
      )}

      {/* === DIALOG - EDIT RENTER DETAILS === */}
      <Dialog open={showEditRenter} onOpenChange={setShowEditRenter}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update {renter.name} </DialogTitle>
          </DialogHeader>
          {/* <RentForm /> */}
          <RenterForm
            defaultValues={updateFormDefaultValues}
            onSubmit={handleUpdateRenter}
            isSubmitting={isSubmitting}
          />
        </DialogContent>
      </Dialog>

      {/* === DIALOG - PAYMENT FORM === */}
      <Dialog open={showForm} onOpenChange={setShowForm} className="mx-3">
        <DialogContent className="p-4 max-w-3xl mx-auto">
          <div className="space-y-4">
            {" "}
            {/* This will ensure there's space between the dialog sections */}
            <DialogHeader>
              <DialogTitle>Add New Payment</DialogTitle>
            </DialogHeader>
            <div className="overflow-y-auto max-h-[70vh] px-3 custom-scrollbar">
              {" "}
              {/* Makes the form scrollable */}
              <PaymentForm
                defaultValues={addPaymentDefaultValues}
                onSubmit={handleAddPayment}
                isSubmitting={isSubmitting}
              />
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* === DIALOG - EDIT PAYMENT FORM === */}
      <Dialog
        open={showEditPaymentDialog}
        onOpenChange={setShowEditPaymentDialog}
        className="mx-3"
      >
        <DialogContent className="p-4 max-w-3xl mx-auto">
          <div className="space-y-4">
            {" "}
            <DialogHeader>
              <DialogTitle>Update Payment</DialogTitle>
            </DialogHeader>
            <div className="overflow-y-auto max-h-[70vh] px-3 custom-scrollbar">
              {" "}
              <PaymentForm
                defaultValues={updatePaymentDefaultValues}
                onSubmit={(formData) =>
                  updatePayment(renter._id, paymentId, formData)
                }
                // onSubmit={() => updatePayment(renter._id, paymentId,FormData)}
                isSubmitting={isSubmitting}
              />
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* === DIALOG - DELETE RENTER === */}
      <DeleteDialog
        isOpen={showDeleteRenterDialog}
        onClose={() => setShowDeleteRenterDialog(false)}
        onConfirm={() => deleteRenter(renter._id)}
        title="Delete Renter"
        description="Are you sure you want to delete this renter? This action cannot be undone."
        requireConfirmation={true}
      />

      {/* === DIALOG - DELETE A PATMENT === */}
      <DeleteDialog
        isOpen={showDeletePaymentDialog}
        onClose={() => setShowDeletePaymentDialog(false)}
        onConfirm={() => deletePayment(renter._id, paymentId)}
        title="Delete Payment"
        description="Are you sure you want to delete this Payment? This action cannot be undone."
        requireConfirmation={true}
      />

      {/* === DIALOG - TOGGLE ACTIVE/INACTIVE === */}
      <DeleteDialog
        isOpen={showStatusChangeDialog}
        onClose={() => setShowStatusChangeDialog(false)}
        onConfirm={() => toggleRenterStatus(renter._id)}
        title={renter.isActive ? "Deactivate Renter" : "Activate Renter"}
        description={
          renter.isActive
            ? "Are you sure you want to mark this renter as inactive?"
            : "Are you sure you want to mark this renter as active?"
        }
        requireConfirmation={false}
      />
    </section>
  );
};

export default page;
