"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";
import { Calendar, Gauge } from "lucide-react";
import { formatDate } from "@/lib/utils";


import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Plus, Trash2, Edit, ToggleLeft, ToggleRight } from "lucide-react";
import RenterForm from "./RenterForm";
import toast from "react-hot-toast";

import useStore from "@/lib/store"; // ✅ Import Zustand store

const renter = {
  isActive: true,
  initialLightMeterReading : 2341,
  moveInDate: new Date(),
  naam: "Akatab",
}

export default function Page() {

  const router = useRouter();

  const { renters, setRenters, showAddRenter, setShowAddRenter, showEditRenter, setShowEditRenter, selectedRenter, setSelectedRenter, isAuthenticated, setIsAuthenticated } = useStore();

  // if (!selectedRenter) {
  //   return <div>Loading...</div>;
  // }

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
    } else {
      fetchRenters();
      setIsAuthenticated(true);
    }
  }, []);

 
  const fetchRenters = async () => {
    const res = await fetch("/api/renters");
    const data = await res.json();
    if (res.ok) {
      console.log("Renters data api response: ", data);
      setRenters(data.renters);
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

  if (!isAuthenticated) return null;

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-lg sm:text-xl font-bold">Rent Management</h1>
        <Button onClick={() => setShowAddRenter(true)}>
          <Plus className="mr-2 h-4 w-4" /> Add Renter
        </Button>
      </div>


      
      <Card 
      className={`cursor-pointer hover:shadow-md transition-shadow ${
        renter.isActive ? "" : "opacity-75"
      }`}
      // onClick={onClick}
    >
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-xl font-bold">{renter.naam}</CardTitle>
        <Badge variant={renter.isActive ? "default" : "secondary"}>
          {renter.isActive ? "Active" : "Inactive"}
        </Badge>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col space-y-2 text-sm">
          <div className="flex items-center text-muted-foreground">
            <Calendar className="mr-2 h-4 w-4" />
            Move-in: {formatDate(renter.moveInDate)}
          </div>
          <div className="flex items-center text-muted-foreground">
            <Gauge className="mr-2 h-4 w-4" />
            Initial Reading: {renter.initialLightMeterReading}
          </div>
        </div>
      </CardContent>
      </Card>



      {renters.map((renter) => (
        <div key={renter._id} className="p-4 border rounded-md flex justify-between">
          <div>
            <p className="font-semibold">{renter.name}</p>
            <p>Move-in Date: {renter.moveInDate}</p>
          </div>
          <div className="flex gap-2">
            <Button 
              // onClick={() => { setSelectedRenter(renter); setShowEditRenter(true); }}
            >
              <Edit />
            </Button>
            <Button 
              // onClick={() => toggleActiveStatus(renter)}
            >
              {renter.active ? <ToggleRight /> : <ToggleLeft 
            />}
            </Button>
            <Button 
              // onClick={() => { setSelectedRenter(renter); setShowDeleteDialog(true); }}
            >
              <Trash2 />
            </Button>
          </div>
        </div>
      ))}

      {/* Dialog for Adding Renter */}
      <Dialog open={showAddRenter} onOpenChange={setShowAddRenter}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Renter</DialogTitle>
          </DialogHeader>
          <RenterForm />
          {/* <RenterForm onSubmit={handleAddRenter} /> */}
        </DialogContent>
      </Dialog>

      {/* Dialog for Editing Renter */}
      {/* <Dialog open={showEditRenter} onOpenChange={setShowEditRenter}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Renter</DialogTitle>
          </DialogHeader>
          <RenterForm onSubmit={handleEditRenter} defaultValues={selectedRenter} />
        </DialogContent>
      </Dialog> */}
    </div>
  );
}

