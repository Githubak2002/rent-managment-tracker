"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Plus,
  // Trash2, Edit, ToggleLeft, ToggleRight
} from "lucide-react";
import toast from "react-hot-toast";

import RenterCard from "@/components/RenterCard";
import Loader from "@/components/Loader";
import useStore from "@/lib/store"; // ✅ Import Zustand store


import RentForm from "@/components/RenterForm";
import dayjs from "dayjs";

// ✅ Date Formatting Helper
const formatDate = (date) => dayjs(date).format("DD/MMMM/YYYY");

const toggleDefault = "bg-gradient-to-r from-[#8b6add] to-[#425bc3]";

export default function Page() {
  const router = useRouter();

  const {
    renters,
    setRenters,
    showForm,
    setShowForm,
    isSubmitting,
    setIsSubmitting,
  } = useStore();

  const [loading, setLoading] = useState(true); // State for managing loading status

  useEffect(() => {
    const getRenters = async () => {
      await fetchRenters();
    };
    getRenters();
  }, [showForm]);

  // === Fetch Renters from the API ===
  const fetchRenters = async () => {
    try {
      const res = await fetch("/api/renters", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Include cookies in the request
      });

      const data = await res.json();

      if (res.ok) {
        console.log("Renters data API response: ", data);
        setRenters(data.renters); // Update the renters state
      } else {
        console.error("Error fetching renters: ", data.message);

        // If the user is not authenticated, redirect to the login page
        if (res.status === 401) {
          router.push("/login");
          toast.error("Please login again!");
        }
      }
    } catch (error) {
      console.error("Error fetching renters: ", error);

      // Handle network errors or other issues
      // toast.error('An error occurred while fetching renters');
    } finally {
      setLoading(false); 
    }
  };

  // === form submission for adding Renter ===
  const handleAddRenter = async (formData) => {
    try {
      setIsSubmitting(true);

      const formattedData = {
        ...formData,
        moveInDate: formatDate(formData.moveInDate),
      };

      const response = await fetch("/api/renters", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formattedData),
      });

      const data = await response.json();

      if (data.success) {
        setShowForm(false);
        toast.success("Renter added successfully!");
      } else {
        toast.error("Failed to add renter.");
      }
    } catch (error) {
      console.log("Error adding new renter  → ", error);
      toast.error("Error submitting renter data.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const defaultValues = {
    name: "",
    phoneNumber:"",
    moveInDate: new Date(),
    initialLightMeterReading: 0,
    comments: "",
  };

  return (
    <section className="container mx-auto py-8 px-4">
      <div className="container mx-auto py-8 px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-lg sm:text-xl font-bold">Rent Management</h1>
          <Button onClick={() => setShowForm(true)} className={`font-black ${toggleDefault}`}>
            <Plus className="mr-2 h-4 w-4 font-black" /> Add Renter
          </Button>
        </div>

        {/* <div className="space-y-8">
          {renters.length > 0 ? (
            <>
              <section>
                <h2 className="text-xl font-semibold mb-4">Active Renters</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {renters
                    .filter((renter) => renter.active)
                    .reverse()
                    .map((renter) => (
                      <RenterCard key={renter._id} renter={renter} />
                    ))}
                </div>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-4">Inactive Renters</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {renters
                    .filter((renter) => renter.active === false)
                    .reverse()
                    .map((renter) => (
                      <RenterCard key={renter._id} renter={renter} />
                    ))}
                </div>
              </section>
            </>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No renters added yet.</p>
            </div>
          )}
        </div> */}

<main className="space-y-8">
          {loading ? (
            // Show the loader while fetching data
            <div className="flex justify-center items-center py-12">
              <Loader />
            </div>
          ) : renters.length > 0 ? (
            <>
              <section>
                <h2 className="text-xl font-semibold mb-4">Active Renters</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {renters
                    .filter((renter) => renter.active)
                    .reverse()
                    .map((renter) => (
                      <RenterCard key={renter._id} renter={renter} />
                    ))}
                </div>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-4">Inactive Renters</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {renters
                    .filter((renter) => renter.active === false)
                    .reverse()
                    .map((renter) => (
                      <RenterCard key={renter._id} renter={renter} />
                    ))}
                </div>
              </section>
            </>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No renters added yet.</p>
            </div>
          )}
        </main>


        {/* === Dialog for Adding Renter === */}
        <Dialog open={showForm} onOpenChange={setShowForm}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Renter </DialogTitle>
            </DialogHeader>
            {/* <RentForm /> */}
            <RentForm
              defaultValues={defaultValues}
              onSubmit={handleAddRenter}
              isSubmitting={isSubmitting}
            />
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
}
