"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";
import { Calendar, Gauge } from "lucide-react";
import { formatDate } from "@/lib/utils";
import { useRouter } from "next/navigation";

import React from 'react'


const RenterCard = ({ renter }) => {

  const router = useRouter(); 

  const handleClick = () => {
    router.push(`/renterdetails/${renter._id}`);
  };

  // useEffect(() => {
  //   console.log("renter data: ", renter); 
  // }, [renter]); 

  return (
    <Card
      className={`cursor-pointer hover:shadow-md transition-shadow ${
        renter.active ? "" : "opacity-75"
      }`}
      onClick={handleClick}
    >
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-xl font-bold">{renter.name}</CardTitle>
        <Badge variant={renter.active ? "default" : "secondary"}>
          {<renter className="active"></renter> ? "Active" : "Inactive"}
        </Badge>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col space-y-2 text-sm">
          <div className="flex items-center text-slate-600">
            <Calendar className="mr-2 h-4 w-4" />
            Move-in: {formatDate(renter.moveInDate)}
          </div>
          <div className="flex items-center text-slate-600">
            <Gauge className="mr-2 h-4 w-4" />
            Initial Reading: {renter.initialLightMeterReading}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RenterCard;


