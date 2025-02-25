"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { CalendarIcon } from "lucide-react";
// import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
// import { Calendar } from "@/components/ui/calendar";
import dayjs from "dayjs";
import { useEffect } from "react";
// import toast from "react-hot-toast";
// import { formatDate } from "@/lib/date-utils"; // Assuming you have this helper
import { DatePicker } from "antd";

// ✅ Define the Zod Schema
const formSchema = z.object({
  date: z.date(),
  rentPaid: z.number().min(0, "Rent amount cannot be negative"), 
  lightBillPaid: z.number().min(0, "Light bill amount cannot be negative"), 
  waterBillPaid: z.number().min(0, "Water bill amount cannot be negative"), 
  lightMeterReading: z.number().min(0, "Light meter reading cannot be negative"),
  paymentMode: z.string().nonempty("Payment mode is required"),
  onlinePlatform: z.string().optional(), 
  comments: z.string().optional(),
});


// ✅ PaymentForm Component
// const PaymentForm = () => {
const PaymentForm = ({ defaultValues, onSubmit, isSubmitting }) => {


  // Default values for the form
  // const defaultValues =  {
  //     date: new Date(),
  //     rentAmount: 110,
  //     lightBillAmount:110,
  //     waterBillAmount: 10,
  //     lightMeterReading: 4530,
  //     paymentMode: "Cash",
  //     onlinePaymentType: "",
  //     comment: "",
  //   };
  // {
  //       date: selectedPayment.date ? dayjs(selectedPayment.date).toDate() : new Date(),
  //       rentAmount: selectedPayment.rentAmount || 0,
  //       lightBillAmount: selectedPayment.lightBillAmount || 0,
  //       waterBillAmount: selectedPayment.waterBillAmount || 0,
  //       lightMeterReading: selectedPayment.lightMeterReading || 0,
  //       paymentMode: selectedPayment.paymentMode || "Cash",
  //       onlinePaymentType: selectedPayment.onlinePaymentType || "",
  //       comment: selectedPayment.comment || "",
  //     }

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  // ✅ Fix: Reset form values when `defaultValues` changes
  useEffect(() => {
    form.reset(defaultValues);
  }, [defaultValues, form]);

  return (
    <Form {...form}>
      <form 
      onSubmit={form.handleSubmit(onSubmit)} 
      className="space-y-6">

        <FormField control={form.control} name="date" render={({ field }) => (
          <FormItem>
            <FormLabel>Payment Date</FormLabel>
            <FormControl>
              <DatePicker
                className="w-full p-2 border rounded-md"
                format="DD/MMMM/YYYY"
                value={field.value ? dayjs(field.value) : null}
                onChange={(date) => field.onChange(date?.toDate() || null)}
                disabledDate={(current) => current && current > dayjs().endOf("day")}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />

        <FormField control={form.control} name="rentPaid" render={({ field }) => (
          <FormItem>
            <FormLabel>Rent Paid (₹)</FormLabel>
            <FormControl>
              <Input
                type="number"
                {...field}
                onChange={(e) => field.onChange(Number(e.target.value))}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />

        <FormField control={form.control} name="lightBillPaid" render={({ field }) => (
          <FormItem>
            <FormLabel>Light Bill Paid (₹)</FormLabel>
            <FormControl>
              <Input
                type="number"
                {...field}
                onChange={(e) => field.onChange(Number(e.target.value))}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />

        <FormField control={form.control} name="waterBillPaid" render={({ field }) => (
          <FormItem>
            <FormLabel>Water Bill Paid (₹)</FormLabel>
            <FormControl>
              <Input
                type="number"
                {...field}
                onChange={(e) => field.onChange(Number(e.target.value))}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />

        <FormField control={form.control} name="lightMeterReading" render={({ field }) => (
          <FormItem>
            <FormLabel>Light Meter Reading</FormLabel>
            <FormControl>
              <Input
                type="number"
                {...field}
                onChange={(e) => field.onChange(Number(e.target.value))}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />

        <FormField control={form.control} name="paymentMode" render={({ field }) => (
          <FormItem>
            <FormLabel>Payment Mode</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select payment mode" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="Cash">Cash</SelectItem>
                <SelectItem value="Online">Online</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )} />

        {form.watch("paymentMode") === "Online" && (
          <FormField control={form.control} name="onlinePlatform" render={({ field }) => (
            <FormItem>
              <FormLabel>Online Payment Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select payment type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Paytm">Paytm</SelectItem>
                  <SelectItem value="PhonePe">PhonePe</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )} />
        )}

        <FormField control={form.control} name="comments" render={({ field }) => (
          <FormItem>
            <FormLabel>Comments</FormLabel>
            <FormControl>
              <Textarea
                placeholder="Add any additional notes here..."
                className="resize-none"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} /> 

        {/* Submit Button */}
        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {/* Submit */}
          {defaultValues._id ? "Update Payment" : "Add Payment"}
        </Button>
      </form>
    </Form>
  );
};

export default PaymentForm;
