'use client'
import { useState } from "react";
// import { useRoute, useLocation } from "wouter";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
// import { DeleteDialog } from "@/components/DeleteDialog";
// import { RenterForm } from "@/components/RenterForm";
// import { PaymentForm } from "@/components/PaymentForm";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ArrowLeft,
  Plus,
  Edit2,
  Trash2,
  Power,
  PowerOff,
} from "lucide-react";
import { nanoid } from "nanoid";
// import {
//   getRenters,
//   saveRenter,
//   deleteRenter,
//   getPayments,
//   savePayment,
//   deletePayment,
// } from "@/lib/renterStore";
import { formatDate, formatCurrency } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";


import React from 'react'
import Link from "next/link";

const payments = [
  {
    id: 1,
    date: "2025-02-01",
    lightMeterReading: 1234,
    rentAmount: 500,
    lightBillAmount: 75,
    waterBillAmount: 30,
    totalAmount: 605,
    paymentMode: "Cash",
    onlinePaymentType: null,
    comment: "Paid in full.",
  },
  {
    id: 2,
    date: "2025-03-01",
    lightMeterReading: 1300,
    rentAmount: 500,
    lightBillAmount: 80,
    waterBillAmount: 35,
    totalAmount: 615,
    paymentMode: "Online",
    onlinePaymentType: "Credit Card",
    comment: "Paid via credit card.",
  },
  {
    id: 3,
    date: "2025-04-01",
    lightMeterReading: 1350,
    rentAmount: 500,
    lightBillAmount: 85,
    waterBillAmount: 40,
    totalAmount: 625,
    paymentMode: "Bank Transfer",
    onlinePaymentType: null,
    comment: null,
  },
];

const renter = {
  isActive: true,
  initialLightMeterReading : 2341,
  moveInDate: new Date(),
  name: "Akatab",

}


const page = () => {

  return (
    <section className="container mx-auto py-8 px-4">
      
      <Link href="/rent">
      <Button variant="ghost"
        className="mb-6">
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
      </Button>
      </Link>


      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-2xl font-bold">{renter.name}</CardTitle>
            <div className="flex items-center gap-2 mt-2">
              <Badge variant={renter.isActive ? "default" : "secondary"}>
                {renter.isActive ? "Active" : "Inactive"}
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
              onClick={() => setShowStatusChange(true)}
            >
              {renter.isActive ? (
                <PowerOff className="h-4 w-4" />
              ) : (
                <Power className="h-4 w-4" />
              )}
            </Button>
            <Button
              variant="destructive"
              size="icon"
              onClick={() => setShowDeleteRenter(true)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>

        <CardContent>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <p className="text-sm text-muted-foreground">Move-in Date</p>
              <p className="text-lg">{formatDate(renter.moveInDate)}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground text-gray-400">
                Initial Light Meter Reading
              </p>
              <p className="text-lg">{renter.initialLightMeterReading}</p>
            </div>
          </div>

          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Payment History</h3>
            <Button onClick={() => setShowAddPayment(true)}>
              <Plus className="mr-2 h-4 w-4" /> Add Payment
            </Button>
          </div>

          {payments.length > 0 ? (
            <div className="grid gap-4">
              {payments.map((payment) => (
                <Card key={payment.id}>
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
                            setSelectedPaymentId(payment.id);
                            setShowEditPayment(true);
                          }}
                        >
                          <Edit2 className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => {
                            setSelectedPaymentId(payment.id);
                            setShowDeletePayment(true);
                          }}
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    </div>

                    <div className="grid gap-2">
                      <div className="flex justify-between">
                        <span>Rent:</span>
                        <span>{formatCurrency(payment.rentAmount)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Light Bill:</span>
                        <span>{formatCurrency(payment.lightBillAmount)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Water Bill:</span>
                        <span>{formatCurrency(payment.waterBillAmount)}</span>
                      </div>
                      <div className="flex justify-between font-semibold">
                        <span>Total:</span>
                        <span>{formatCurrency(payment.totalAmount)}</span>
                      </div>
                      <div className="flex justify-between text-sm text-muted-foreground">
                        <span>Payment Mode:</span>
                        <span>
                          {payment.paymentMode}
                          {payment.onlinePaymentType &&
                            ` (${payment.onlinePaymentType})`}
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


    </section>
  )
}

export default page