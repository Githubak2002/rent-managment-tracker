"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CalendarIcon } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
// import { Calendar } from "@/components/ui/calendar";
import dayjs from "dayjs";
import { useEffect } from "react";
import toast from "react-hot-toast";
// import { formatDate } from "@/lib/date-utils"; // Assuming you have this helper
import { DatePicker } from "antd";

// ✅ Define the Zod Schema
const formSchema = z.object({
  date: z.date(),
  rentAmount: z.number().min(0, "Rent amount cannot be negative"),
  lightBillAmount: z.number().min(0, "Light bill amount cannot be negative"),
  waterBillAmount: z.number().min(0, "Water bill amount cannot be negative"),
  lightMeterReading: z.number().min(0, "Light meter reading cannot be negative"),
  paymentMode: z.string().nonempty("Payment mode is required"),
  onlinePaymentType: z.string().optional(),
  comment: z.string().optional(),
});

// ✅ PaymentForm Component
// const PaymentForm = ({ onSubmit, selectedPayment }) => {
const PaymentForm = () => {

  // const isEditing = !!selectedPayment;

  // Default values for the form
  const defaultValues =  {
      date: new Date(),
      rentAmount: 110,
      lightBillAmount:110,
      waterBillAmount: 10,
      lightMeterReading: 4530,
      paymentMode: "Cash",
      onlinePaymentType: "",
      comment: "",
    };
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

  // Reset form values when selectedPayment changes
  // useEffect(() => {
  //   form.reset(defaultValues);
  // }, [defaultValues, form]);

  const onSubmit = (values) => {
    console.log("form data: ",values);
  }

  return (
    <Form {...form}>
      <form 
      onSubmit={form.handleSubmit(onSubmit)} 
      className="space-y-6">
        {/* Payment Date Field */}

        {/* ✅ Move-in Date Picker */}
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

        {/* <FormField control={form.control} name="date" render={({ field }) => (
          <FormItem className="flex flex-col">
            <FormLabel>Payment Date</FormLabel>
            <Popover>
              <PopoverTrigger asChild>
                <FormControl>
                  <Button
                    variant="outline"
                    className="w-full pl-3 text-left font-normal"
                    disabled={!field.value}
                  >
                    {field.value ? formatDate(field.value) : "Pick a date"}
                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                  </Button>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={field.value}
                  onSelect={field.onChange}
                  disabled={(date) => date > new Date()}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            <FormMessage />
          </FormItem>
        )} /> */}

        {/* Rent Amount Field */}
        <FormField control={form.control} name="rentAmount" render={({ field }) => (
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

        {/* Light Bill Amount Field */}
        <FormField control={form.control} name="lightBillAmount" render={({ field }) => (
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

        {/* Water Bill Amount Field */}
        <FormField control={form.control} name="waterBillAmount" render={({ field }) => (
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

        {/* Light Meter Reading Field */}
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

        {/* Payment Mode Selection */}
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

        {/* Online Payment Type (Conditional Field) */}
        {form.watch("paymentMode") === "Online" && (
          <FormField control={form.control} name="onlinePaymentType" render={({ field }) => (
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

        {/* Comments Field */}
        <FormField control={form.control} name="comment" render={({ field }) => (
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
        <Button type="submit" className="w-full">
          submit
          {/* {isEditing ? "Update Payment" : "Save Payment"} */}
        </Button>
      </form>
    </Form>
  );
};

export default PaymentForm;



// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { z } from "zod";
// // import { PaymentSchema } from "@shared/schema";
// import { Button } from "@/components/ui/button";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// // import {
// //   Select,
// //   SelectContent,
// //   SelectItem,
// //   SelectTrigger,
// //   SelectValue,
// // } from "@/components/ui/select";
// // import { Textarea } from "@/components/ui/textarea";
// // import { Calendar } from "@/components/ui/calendar";
// import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
// import { CalendarIcon } from "lucide-react";
// import { cn, formatDate } from "@/lib/utils";

// const formSchema = PaymentSchema.omit({ id: true, renterId: true, totalAmount: true });

// // interface PaymentFormProps {
// //   onSubmit: (data: z.infer<typeof formSchema>) => void;
// //   defaultValues?: z.infer<typeof formSchema>;
// // }




// export default function PaymentForm({ onSubmit, defaultValues }) {
//   const form = useForm({
//     resolver: zodResolver(formSchema),
//     defaultValues: defaultValues || {
//       date: new Date(),
//       rentAmount: 0,
//       lightBillAmount: 0,
//       waterBillAmount: 0,
//       paymentMode: "Cash",
//       lightMeterReading: 0,
//       comment: "",
//     },
//   });

//   const paymentMode = form.watch("paymentMode");

//   return (
//     <Form {...form}>
//       <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
//         <FormField
//           control={form.control}
//           name="date"
//           render={({ field }) => (
//             <FormItem className="flex flex-col">
//               <FormLabel>Payment Date</FormLabel>
//               <Popover>
//                 <PopoverTrigger asChild>
//                   <FormControl>
//                     <Button
//                       variant={"outline"}
//                       className={cn(
//                         "w-full pl-3 text-left font-normal",
//                         !field.value && "text-muted-foreground"
//                       )}
//                     >
//                       {field.value ? (
//                         formatDate(field.value)
//                       ) : (
//                         <span>Pick a date</span>
//                       )}
//                       <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
//                     </Button>
//                   </FormControl>
//                 </PopoverTrigger>
//                 <PopoverContent className="w-auto p-0" align="start">
//                   <Calendar
//                     mode="single"
//                     selected={field.value}
//                     onSelect={field.onChange}
//                     disabled={(date) => date > new Date()}
//                     initialFocus
//                   />
//                 </PopoverContent>
//               </Popover>
//               <FormMessage />
//             </FormItem>
//           )}
//         />

//         <FormField
//           control={form.control}
//           name="rentAmount"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Rent Paid (₹)</FormLabel>
//               <FormControl>
//                 <Input
//                   type="number"
//                   {...field}
//                   onChange={(e) => field.onChange(Number(e.target.value))}
//                 />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />

//         <FormField
//           control={form.control}
//           name="lightBillAmount"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Light Bill Paid (₹)</FormLabel>
//               <FormControl>
//                 <Input
//                   type="number"
//                   {...field}
//                   onChange={(e) => field.onChange(Number(e.target.value))}
//                 />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />

//         <FormField
//           control={form.control}
//           name="waterBillAmount"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Water Bill Paid (₹)</FormLabel>
//               <FormControl>
//                 <Input
//                   type="number"
//                   {...field}
//                   onChange={(e) => field.onChange(Number(e.target.value))}
//                 />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />

//         <FormField
//           control={form.control}
//           name="lightMeterReading"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Light Meter Reading</FormLabel>
//               <FormControl>
//                 <Input
//                   type="number"
//                   {...field}
//                   onChange={(e) => field.onChange(Number(e.target.value))}
//                 />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />

//         <FormField
//           control={form.control}
//           name="paymentMode"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Payment Mode</FormLabel>
//               <Select onValueChange={field.onChange} defaultValue={field.value}>
//                 <FormControl>
//                   <SelectTrigger>
//                     <SelectValue placeholder="Select payment mode" />
//                   </SelectTrigger>
//                 </FormControl>
//                 <SelectContent>
//                   <SelectItem value="Cash">Cash</SelectItem>
//                   <SelectItem value="Online">Online</SelectItem>
//                 </SelectContent>
//               </Select>
//               <FormMessage />
//             </FormItem>
//           )}
//         />

//         {paymentMode === "Online" && (
//           <FormField
//             control={form.control}
//             name="onlinePaymentType"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Online Payment Type</FormLabel>
//                 <Select onValueChange={field.onChange} defaultValue={field.value}>
//                   <FormControl>
//                     <SelectTrigger>
//                       <SelectValue placeholder="Select payment type" />
//                     </SelectTrigger>
//                   </FormControl>
//                   <SelectContent>
//                     <SelectItem value="Paytm">Paytm</SelectItem>
//                     <SelectItem value="PhonePe">PhonePe</SelectItem>
//                     <SelectItem value="Other">Other</SelectItem>
//                   </SelectContent>
//                 </Select>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
//         )}

//         <FormField
//           control={form.control}
//           name="comment"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Comments</FormLabel>
//               <FormControl>
//                 <Textarea
//                   placeholder="Add any additional notes here..."
//                   className="resize-none"
//                   {...field}
//                 />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />

//         <Button type="submit" className="w-full">
//           Save Payment
//         </Button>
//       </form>
//     </Form>
//   );
// }