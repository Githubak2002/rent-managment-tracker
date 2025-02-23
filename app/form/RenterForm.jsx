"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { DatePicker } from "antd";
import dayjs from "dayjs";
import "antd/dist/reset.css";
import toast from "react-hot-toast";


// ✅ Define the Zod Schema
const formSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters long."),
  moveInDate: z.date(),
  initialLightMeterReading: z.number().min(0, "Meter reading cannot be negative"),
  comments: z.string().optional(),
});

// ✅ Date Formatting Helper
const formatDate = (date) => dayjs(date).format("DD/MMMM/YYYY");

const RenterForm = ({ onSubmit }) => {


  
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      moveInDate: new Date(),
      initialLightMeterReading: 0,
      comments: "",
    },
  });

  const handleSubmit = (data) => {
    const formattedData = {
      ...data,
      moveInDate: formatDate(data.moveInDate),
    };
    console.log("Form data: ",data);
    // onSubmit(formattedData);
    toast.success("Renter added successfully!");
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6 p-4">
        
        {/* Name Field */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Enter renter's name" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Move-in Date Picker */}
        <FormField
          control={form.control}
          name="moveInDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Move-in Date</FormLabel>
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
          )}
        />

        {/* Light Meter Reading */}
        <FormField
          control={form.control}
          name="initialLightMeterReading"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Initial Light Meter Reading</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  {...field}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                  placeholder="Enter initial meter reading"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Comments */}
        <FormField
          control={form.control}
          name="comments"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Comments</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Add any additional notes..."
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Submit Button */}
        <Button type="submit" className="w-full">
          Save Renter
        </Button>
      </form>
    </Form>
  );
};

export default RenterForm;



// "use client";

// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { z } from "zod";
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
// import { Textarea } from "@/components/ui/textarea";
// import toast from "react-hot-toast";

// // ✅ Zod Schema for Validation
// const formSchema = z.object({
//   name: z.string().min(1, "Name is required"),
//   moveInDate: z
//     .string()
//     .regex(/^\d{2}\/[A-Za-z]+\/\d{4}$/, "Format: DD/Month/YYYY")
//     .refine((date) => {
//       const parsedDate = new Date(date);
//       return !isNaN(parsedDate);
//     }, "Invalid date"),
//   initialLightMeterReading: z
//     .number()
//     .min(0, "Meter reading cannot be negative"),
//   comments: z.string().optional(),
// });

// // ✅ Date Formatting Helper
// const formatDate = (input) => {
//   try {
//     const parts = input.split("/");
//     const day = parts[0].padStart(2, "0");
//     const month = parts[1].charAt(0).toUpperCase() + parts[1].slice(1).toLowerCase();
//     const year = parts[2];
//     return `${day}/${month}/${year}`;
//   } catch {
//     return input;
//   }
// };

// export default function RenterForm() {
//   const form = useForm({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       name: "",
//       moveInDate: "",
//       initialLightMeterReading: 0,
//       comments: "",
//     },
//   });

//   const onSubmit = (data) => {
//     const formattedDate = formatDate(data.moveInDate);
//     const finalData = { ...data, moveInDate: formattedDate };

//     console.log("Form Data:", finalData);
//     toast.success("Renter saved successfully!");
//   };

//   return (
//     <Form {...form}>
//       <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 p-4">
        
//         {/* Name Field */}
//         <FormField
//           control={form.control}
//           name="name"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Name</FormLabel>
//               <FormControl>
//                 <Input {...field} placeholder="Enter renter's name" />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />

//         {/* Move-in Date Field (Manual Input) */}
//         <FormField
//           control={form.control}
//           name="moveInDate"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Move-in Date</FormLabel>
//               <FormControl>
//                 <Input
//                   {...field}
//                   placeholder="DD/Month/YYYY (e.g., 02/February/2025)"
//                 />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />

//         {/* Light Meter Reading */}
//         <FormField
//           control={form.control}
//           name="initialLightMeterReading"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Initial Light Meter Reading</FormLabel>
//               <FormControl>
//                 <Input
//                   type="number"
//                   {...field}
//                   onChange={(e) => field.onChange(Number(e.target.value))}
//                   placeholder="Enter initial meter reading"
//                 />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />

//         {/* Comments */}
//         <FormField
//           control={form.control}
//           name="comments"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Comments</FormLabel>
//               <FormControl>
//                 <Textarea
//                   placeholder="Add any additional notes..."
//                   className="resize-none"
//                   {...field}
//                 />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />

//         {/* Submit Button */}
//         <Button type="submit" className="w-full">
//           Save Renter
//         </Button>
//       </form>
//     </Form>
//   );
// }