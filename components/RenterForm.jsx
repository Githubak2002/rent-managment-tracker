"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { DatePicker } from "antd";
import dayjs from "dayjs";
import "antd/dist/reset.css";
import { useEffect } from "react";

// import toast from "react-hot-toast";

// ✅ Define the Zod Schema
const formSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters long."),
  moveInDate: z.date(),
  initialLightMeterReading: z.number().min(0, "Meter reading cannot be negative"),
  comments: z.string().optional(),
});


const RenterForm = ({ defaultValues, onSubmit, isSubmitting }) => {
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
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 p-4 bg-white">
        {/* ✅ Name Field */}
        <FormField control={form.control} name="name" render={({ field }) => (
          <FormItem>
            <FormLabel>Name</FormLabel>
            <FormControl><Input {...field} placeholder="Enter renter's name" /></FormControl>
            <FormMessage />
          </FormItem>
        )} />

        {/* ✅ Move-in Date Picker */}
        <FormField control={form.control} name="moveInDate" render={({ field }) => (
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
        )} />

        {/* ✅ Initial Light Meter Reading */}
        <FormField control={form.control} name="initialLightMeterReading" render={({ field }) => (
          <FormItem>
            <FormLabel>Initial Light Meter Reading</FormLabel>
            <FormControl>
              <Input type="number" {...field} onChange={(e) => field.onChange(Number(e.target.value))} placeholder="Enter meter reading" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />

        {/* ✅ Comments */}
        <FormField control={form.control} name="comments" render={({ field }) => (
          <FormItem>
            <FormLabel>Comments</FormLabel>
            <FormControl>
              <Textarea placeholder="Add any notes..." className="resize-none" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />

        {/* ✅ Submit Button */}
        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {defaultValues._id ? "Update Renter" : "Save Renter"}  {/* Check if it's edit mode */}
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
// import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import { DatePicker } from "antd";
// import dayjs from "dayjs";
// import "antd/dist/reset.css";
// import { useEffect } from "react";
// import toast from "react-hot-toast";
// import useStore from "@/lib/store";

// // ✅ Define the Zod Schema
// const formSchema = z.object({
//   name: z.string().min(3, "Name must be at least 3 characters long."),
//   moveInDate: z.date(),
//   initialLightMeterReading: z.number().min(0, "Meter reading cannot be negative"),
//   comments: z.string().optional(),
// });

// // ✅ Date Formatting Helper
// const formatDate = (date) => dayjs(date).format("DD/MMMM/YYYY");

// const RenterForm = ({

// }) => {

//   const {
//     addRenter,
//     setShowAddRenter,
//     selectedRenter,
//     updateRenter,
//     setShowEditRenter,
//     setSelectedRenter,
//   } = useStore();
  
//   const isEditing = !!selectedRenter; // ✅ Check if editing

//   // ✅ Fix: Ensure `defaultValues` is properly structured
//   const defaultValues = selectedRenter
//     ? {
//         name: selectedRenter.name || "",
//         moveInDate: selectedRenter.moveInDate ? dayjs(selectedRenter.moveInDate).toDate() : new Date(),
//         initialLightMeterReading: selectedRenter.initialLightMeterReading || 0,
//         comments: selectedRenter.comments || "",
//       }
//     : {
//         name: "",
//         moveInDate: new Date(),
//         initialLightMeterReading: 0,
//         comments: "",
//       };

//   const form = useForm({
//     resolver: zodResolver(formSchema),
//     defaultValues,
//   });

//   // ✅ Fix: Reset form values when `selectedRenter` changes
//   useEffect(() => {
//     form.reset(defaultValues);
//   }, [selectedRenter, form]);

//   const handleSubmit = async (formData) => {
//     console.log("Form data: ", formData);
//     const formattedData = {
//       ...formData,
//       moveInDate: formatDate(formData.moveInDate),
//     };

//     const endpoint = isEditing ? "/api/renters" : "/api/renters";
//     const method = isEditing ? "PUT" : "POST";

//     const res = await fetch(endpoint, {
//       method,
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ ...formattedData, _id: selectedRenter?._id }),
//     });

//     const data = await res.json();

//     console.log("api response: ", data);

//     if (data.success && data.newRenter) {
//       toast.success(isEditing ? "Renter updated successfully!" : "Renter added successfully!");

//       if (isEditing) {
//         updateRenter(data.newRenter);
//         setShowEditRenter(false);
//         setSelectedRenter(null); // ✅ Clear selection after editing
//       } else {
//         addRenter(data.newRenter);
//         setShowAddRenter(false);
//       }
//     } else {
//       toast.error("Failed to save renter");
//     }
//   };

//   return (
//     <Form {...form}>
//       <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6 p-4 bg-white">
//         {/* ✅ Name Field */}
//         <FormField control={form.control} name="name" render={({ field }) => (
//           <FormItem>
//             <FormLabel>Name</FormLabel>
//             <FormControl><Input {...field} placeholder="Enter renter's name" /></FormControl>
//             <FormMessage />
//           </FormItem>
//         )} />
        
//         {/* ✅ Move-in Date Picker */}
//         <FormField control={form.control} name="moveInDate" render={({ field }) => (
//           <FormItem>
//             <FormLabel>Move-in Date</FormLabel>
//             <FormControl>
//               <DatePicker
//                 className="w-full p-2 border rounded-md"
//                 format="DD/MMMM/YYYY"
//                 value={field.value ? dayjs(field.value) : null}
//                 onChange={(date) => field.onChange(date?.toDate() || null)}
//                 disabledDate={(current) => current && current > dayjs().endOf("day")}
//               />
//             </FormControl>
//             <FormMessage />
//           </FormItem>
//         )} />

//         {/* ✅ Initial Light Meter Reading */}
//         <FormField control={form.control} name="initialLightMeterReading" render={({ field }) => (
//           <FormItem>
//             <FormLabel>Initial Light Meter Reading</FormLabel>
//             <FormControl>
//               <Input type="number" {...field} onChange={(e) => field.onChange(Number(e.target.value))} placeholder="Enter meter reading" />
//             </FormControl>
//             <FormMessage />
//           </FormItem>
//         )} />

//         {/* ✅ Comments */}
//         <FormField control={form.control} name="comments" render={({ field }) => (
//           <FormItem>
//             <FormLabel>Comments</FormLabel>
//             <FormControl>
//               <Textarea placeholder="Add any notes..." className="resize-none" {...field} />
//             </FormControl>
//             <FormMessage />
//           </FormItem>
//         )} />

//         {/* ✅ Submit Button */}
//         <Button type="submit" className="w-full">
//           {isEditing ? "Update Renter" : "Save Renter"}
//         </Button>
//       </form>
//     </Form>
//   );
// };

// export default RenterForm;
