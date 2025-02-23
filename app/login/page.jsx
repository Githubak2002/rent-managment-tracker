"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import "antd/dist/reset.css";
import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import useStore from "@/lib/store";

const loginSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  password: z.string().min(3, "Password must be at least 3 characters"),
});

export default function LoginPage() {

  const {
    isAuthenticated,
    setIsAuthenticated,
  } = useStore();

  const router = useRouter();

  const defaultValues = {
    username: "",
    password: "",
  }

  const form = useForm({
    resolver: zodResolver(loginSchema), 
    defaultValues
  });

  const handleSubmit = async (formData) => {
    try {
      // Send login request to the server
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData }),
        credentials: 'include', // Include cookies in the request
      });
  
      const data = await response.json();
  
      if (response.ok) {
        // Login successful
        toast.success('Login successful!');
        setIsAuthenticated(true); // Update authentication state
        router.push('/rent'); // Redirect to the /rent page
      } else {
        // Login failed
        toast.error(data.error || 'Login failed');
      }
    } catch (error) {
      console.error('Error during login:', error);
      toast.error('An error occurred during login');
    } finally {
      form.reset(defaultValues); // Reset the form
    }
  };
  
  const handleSubmit123 = async (formData) => {
    // console.log("Form data: ", formData);
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...formData }),
    });

    const data = await response.json();

    // console.log("Login api Data: ", data);

    if (response.ok) {
      localStorage.setItem('token', data.token);
      toast.success('Login successful!');
      setIsAuthenticated(true);
      router.push('/rent');
    } else {
      toast.error(data.error || 'Login failed');
    }

    form.reset(defaultValues);
  };

  return (
    <Form {...form}>
    <section className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm">
        <h2 className="text-xl font-bold mb-4 text-center">Admin Login</h2>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4 p-4">

          {/* === UserName Field === */}
          <FormField control={form.control} name="username" render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl><Input {...field} placeholder="Enter username" /></FormControl>
              <FormMessage />
            </FormItem>
          )} />

          {/* === Password Field === */}
          <FormField control={form.control} name="password" render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl><Input {...field} type="password" placeholder="Enter your password" /></FormControl>
              <FormMessage />
            </FormItem>
          )} />

          <Button type="submit" className="w-full">Login</Button>
        </form>
      </div>
    </section>
    </Form>
  );
}





// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import toast from "react-hot-toast";
// import { z } from "zod";

// const loginSchema = z.object({
//   username: z.string().min(3, "Username must be at least 3 characters"),
//   password: z.string().min(3, "Password must be at least 3 characters"),
// });

// export default function LoginPage() {
//   const router = useRouter();
//   const [formData, setFormData] = useState({ username: "", password: "" });

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Validate input
//     const result = loginSchema.safeParse(formData);
//     if (!result.success) {
//       toast.error(result.error.errors[0].message);
//       return;
//     }

//     const res = await fetch("/api/login", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(formData),
//     });

//     const data = await res.json();
//     if (!res.ok) {
//       toast.error(data.error);
//     } else {
//       localStorage.setItem("token", data.token);
//       toast.success("Login successful!");
//       router.push("/rent");
//       // router.push("/dashboard");
//     }
//   };

//   return (
//     <div className="flex min-h-screen items-center justify-center bg-gray-100">
//       <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm">
//         <h2 className="text-xl font-bold mb-4 text-center">Admin Login</h2>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <Input 
//             type="text" 
//             name="username" 
//             placeholder="Username" 
//             onChange={handleChange} 
//             required 
//           />
//           <Input 
//             type="password" 
//             name="password" 
//             placeholder="Password" 
//             onChange={handleChange} 
//             required 
//           />
//           <Button type="submit" className="w-full">Login</Button>
//         </form>
//       </div>
//     </div>
//   );
// }

