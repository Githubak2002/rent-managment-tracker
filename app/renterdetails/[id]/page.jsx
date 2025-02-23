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


// ✅ Date Formatting Helper
const formatDate = (date) => dayjs(date).format("DD/MMMM/YYYY");

const page = () => {
  const params = useParams();
  const router = useRouter();

  const { showDeleteRenterDialog, setShowDeleteRenterDialog, showStatusChangeDialog, setShowStatusChangeDialog, showEditRenter, setShowEditRenter, isSubmitting, setIsSubmitting } = useStore();

  // console.log("param.id: ", params.id);

  const [renter, setRenter] = useState({});
  const [payments, setPayments] = useState([]);


  useEffect(() => {
    const id = params.id.toString(); // Ensure the ID is a string
    getRenterDetails(id);
  }, [params.id, showEditRenter]);

  // useEffect(() => {
  //   console.log("show delete Dialog: ", showDeleteRenterDialog);
  // }, [showDeleteRenterDialog]);

  const getRenterDetails = async (id) => {
    try {
      const res = await fetch(`/api/renterdetails/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const data = await res.json();

      if (res.ok) {
        console.log("Renter details:", data.renter);
        // console.log("Renter details payments:", data.renter.payments.length);
        // console.log("type of:", typeof data.renter.payments);
        setRenter(data.renter);
        setPayments(data.renter.payments);
      } else {
        console.error("Failed to fetch renter details:", data.error);
      }
    } catch (error) {
      console.error("Error fetching renter details:", error);
    }
  };

  // === Add payment ==
  const addPayment = async (paymentData) => {
    try {
      const response = await fetch("/api/payments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(paymentData),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Payment added successfully:", data.renter);
        toast.success("Payment added successfully!");
      } else {
        console.error("Failed to add payment:", data.error);
        toast.error(data.msg || "Failed to add payment");
      }
    } catch (error) {
      console.error("Error adding payment:", error);
      toast.error("An error occurred while adding payment");
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
        moveInDate: formatDate(formData.moveInDate),
          ...formData
        };

      const response = await fetch(`/api/renters`, {
        method : "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials:"include",
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

  // === Default values for updating a renter ===
  const defaultValues = { 
    _id: renter._id,
    name: renter.name,
    moveInDate: renter.moveInDate ? dayjs(renter.moveInDate).toDate() : new Date(),
    initialLightMeterReading: renter.initialLightMeterReading || 0,
    comments: renter.comments || "",
  }
   
  return (
    <section className="container mx-auto py-8 px-4">
      <Button
        variant="ghost"
        className="mb-6"
        onClick={() => router.push("/rent")}
      >
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
      </Button>


      {/* === RENTER DETAILS === */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-2xl font-bold">{renter.name}</CardTitle>
            <div className="flex items-center gap-2 mt-2">
              <Badge variant={renter.active ? "default" : "secondary"}>
                {renter.active ? "Active" : "Inactive"}
              </Badge>
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setShowEditRenter(true)}
            >
              <Edit2 className="h-4 w-4" />
            </Button>
            <Button
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

        <CardContent>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <p className="text-sm text-muted-foreground">Move-in Date</p>
              <p className="text-lg">{renter.moveInDate}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">
                Initial Light Meter Reading
              </p>
              <p className="text-lg">{renter.initialLightMeterReading}</p>
            </div>
          </div>

          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Payment History</h3>
            <Button
            // onClick={() => setShowAddPayment(true)}
            >
              <Plus className="mr-2 h-4 w-4" /> Add Payment
            </Button>
          </div>


          {/* === RENTER PAYMENTS === */}
          {payments.length > 0 ? (
            <div className="grid gap-4">
              {renter.payments.map((payment) => (
                <Card key={payment._id}>
                  <CardContent className="pt-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <div className="font-semibold">{payment.date}</div>
                        <div className="text-sm text-muted-foreground">
                          Reading: {payment.lightMeterReading}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => {
                            // setSelectedPaymentId(payment._id);
                            // setShowEditPayment(true);
                          }}
                        >
                          <Edit2 className="h-4 w-4 text-blue-400" />
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => {
                            // setSelectedPaymentId(payment.id);
                            // setShowDeletePayment(true);
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
                          ₹ {payment.lightBillPaid + payment.waterBillPaid}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm text-muted-foreground">
                        <span>Payment Mode:</span>
                        <span>
                          {payment.paymentMode}
                          {payment.onlinePlatform &&
                            ` (${payment.onlinePlatform})`}
                        </span>
                      </div>
                      {payment.comment && (
                        <div className="mt-2 text-sm">
                          <span className="text-muted-foreground">Note: </span>
                          {payment.comment}
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



      {/* === EDIT RENTER DETAILS DIALOG === */}
      <Dialog open={showEditRenter} onOpenChange={setShowEditRenter}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update {renter.name} </DialogTitle>
          </DialogHeader>
          {/* <RentForm /> */}
          <RenterForm defaultValues={defaultValues} onSubmit={handleUpdateRenter} isSubmitting={isSubmitting} />
        </DialogContent>
      </Dialog>


      {/* === DELETE DIALOG === */}
      <DeleteDialog
        isOpen={showDeleteRenterDialog}
        onClose={() => setShowDeleteRenterDialog(false)}
        onConfirm={() => deleteRenter(renter._id)}
        title="Delete Renter"
        description="Are you sure you want to delete this renter? This action cannot be undone."
        requireConfirmation={true}
      />

      {/* === TOGGLE ACTIVE/INACTIVE DIALOG === */}
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
