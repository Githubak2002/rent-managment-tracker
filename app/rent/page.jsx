"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";
import { Calendar, Gauge } from "lucide-react";
import { formatDate } from "@/lib/utils";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Plus, Trash2, Edit, ToggleLeft, ToggleRight } from "lucide-react";
import RenterForm from "./RenterForm";
import toast from "react-hot-toast";

import RenterCard from "@/components/RenterCard";
import useStore from "@/lib/store"; // ✅ Import Zustand store
import { DialogOverlay } from "@radix-ui/react-dialog";

const renter = {
  isActive: true,
  initialLightMeterReading: 2341,
  moveInDate: new Date(),
  naam: "Akatab",
};

export default function Page() {
  const router = useRouter();

  const {
    renters,
    setRenters,
    showAddRenter,
    setShowAddRenter,
    showEditRenter,
    setShowEditRenter,
    selectedRenter,
    setSelectedRenter,
    isAuthenticated,
    setIsAuthenticated,
  } = useStore();

  // const [activeRenters,setActiveRenters] = useState(null);
  // const [inactiveRenters,setInactiveRenters] = useState(null);

  useEffect(() => {
    const getRenters = async () => {
      await fetchRenters();
    };
    getRenters();

    // const checkAuthAndFetchRenters = async () => {
    //   try {
    //     // Check if the user is authenticated by making a request to the server
    //     const res = await fetch('/api/check-auth', {
    //       method: 'GET',
    //       credentials: 'include', // Include cookies in the request
    //     });

    //     const data = await res.json();

    //     if (res.ok && data.isAuthenticated) {
    //       // User is authenticated, fetch renters
    //       await fetchRenters();
    //       setIsAuthenticated(true);
    //     } else {
    //       // User is not authenticated, redirect to login
    //       router.push('/login');
    //       toast.error('Please login again!');
    //     }
    //   } catch (error) {
    //     console.error('Error checking authentication:', error);
    //     router.push('/login');
    //     // toast.error('An error occurred while checking authentication');
    //   }
    // };

    // checkAuthAndFetchRenters();
  }, []);

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

        // const x = data.renters.filter(r => r.isActive);
        // setActiveRenters(x);
        // const y = data.renters.filter(r => !r.isActive);
        // setInactiveRenters(y);
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
    }
  };

  const fetchRenters1 = async () => {
    try {
      const token = localStorage.getItem("token"); // Assuming the token is stored in localStorage
      if (!token) {
        router.push("/login");
        toast.error("Please login again!");
        throw new Error("Authorization token missing");
      }

      const res = await fetch("/api/renters", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Include the token in the Authorization header
        },
      });

      const data = await res.json();
      if (res.ok) {
        console.log("Renters data API response: ", data);
        setRenters(data.renters);
      } else {
        console.error("Error fetching renters: ", data.message);
      }
    } catch (error) {
      console.error("Error fetching renters: ", error);
    }
  };

  const handleAddRenter = async (renterData) => {
    const res = await fetch("/api/renters", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(renterData),
    });

    const data = await res.json();
    if (res.ok) {
      toast.success("Renter added successfully!");
      addRenter(data.renter);
      setShowAddRenter(false);
    } else {
      toast.error("Failed to add renter");
    }
  };

  const handleEditRenter = async (renterData) => {
    const res = await fetch("/api/renters", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(renterData),
    });

    const data = await res.json();
    if (res.ok) {
      toast.success("Renter updated successfully!");
      updateRenter(data.renter);
      setShowEditRenter(false);
    } else {
      toast.error("Failed to update renter");
    }
  };

  // useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   if (!token) {
  //     router.push("/login");
  //   } else {
  //     fetchRenters();
  //     setIsAuthenticated(true);
  //   }
  // }, []);

  // const fetchRenters = async () => {
  //   const res = await fetch("/api/renters");
  //   const data = await res.json();
  //   if (res.ok) {
  //     setRenters(data.renters);
  //   }
  // };

  // const handleAddRenter = async (renterData) => {
  //   const res = await fetch("/api/renters", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify(renterData),
  //   });

  //   const data = await res.json();
  //   if (res.ok) {
  //     toast.success("Renter added successfully!");
  //     setRenters((prev) => [data.renter, ...prev]); // Instantly update UI
  //     setShowAddRenter(false);
  //   } else {
  //     toast.error("Failed to add renter");
  //   }
  // };

  // const handleEditRenter = async (renterData) => {
  //   const res = await fetch("/api/renters", {
  //     method: "PUT",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify(renterData),
  //   });

  //   const data = await res.json();
  //   if (res.ok) {
  //     toast.success("Renter updated successfully!");
  //     fetchRenters(); // Refresh UI
  //     setShowEditRenter(false);
  //   } else {
  //     toast.error("Failed to update renter");
  //   }
  // };

  // const toggleActiveStatus = async (renter) => {
  //   const res = await fetch("/api/renters", {
  //     method: "PATCH",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({ _id: renter._id }),
  //   });

  //   if (res.ok) {
  //     toast.success(`Renter marked as ${renter.active ? "Inactive" : "Active"}`);
  //     fetchRenters();
  //   } else {
  //     toast.error("Failed to update renter status");
  //   }
  // };

  // if (!isAuthenticated) return null;

  return (
    <div className="container mx-auto py-8 px-4">
      {/* <div className="flex justify-between items-center mb-8">
        <h1 className="text-lg sm:text-xl font-bold">Rent Management</h1>
        <Button onClick={() => setShowAddRenter(true)}>
          <Plus className="mr-2 h-4 w-4" /> Add Renter
        </Button>
      </div> */}

      {/* Dialog for Editing Renter */}
      {/* <Dialog open={showEditRenter} onOpenChange={setShowEditRenter}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Renter</DialogTitle>
          </DialogHeader>
          <RenterForm onSubmit={handleEditRenter} defaultValues={selectedRenter} />
        </DialogContent>
      </Dialog> */}

      <div className="container mx-auto py-8 px-4">
        {/* <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Rent Management</h1>
          <Button onClick={() => setShowAddRenter(true)}>
            <Plus className="mr-2 h-4 w-4" /> Add Renter
          </Button>
        </div> */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-lg sm:text-xl font-bold">Rent Management</h1>
          <Button onClick={() => setShowAddRenter(true)}>
            <Plus className="mr-2 h-4 w-4" /> Add Renter
          </Button>
        </div>

        {/* Dialog for Adding Renter */}
        <Dialog open={showAddRenter} onOpenChange={setShowAddRenter}>
        <DialogOverlay className="bg-white/50" />
          <DialogContent>
          {/* <DialogContent className="bg-white"> */}
          {/* <DialogContent aria-labelledby="dialog-title" aria-describedby="dialog-description"> */}
            <DialogHeader>
              <DialogTitle>Add New Renter</DialogTitle>
            </DialogHeader>
            <RenterForm />
            {/* <RenterForm onSubmit={handleAddRenter} /> */}
          </DialogContent>
        </Dialog>

        <div className="space-y-8">
          {renters.length > 0 ? (
            <>
              <section>
                <h2 className="text-xl font-semibold mb-4">Active Renters</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {renters
                    .filter((renter) => renter.active)
                    .map((renter) => (
                      // <h2>hello {renter.name}</h2>
                      <RenterCard key={renter._id} renter={renter} />
                    ))}
                </div>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-4">Inactive Renters</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {renters
                    .filter((renter) => renter.active === false)
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
        </div>

        <Dialog open={showAddRenter} onOpenChange={setShowAddRenter}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Renter</DialogTitle>
            </DialogHeader>
            <RenterForm onSubmit={handleAddRenter} />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
