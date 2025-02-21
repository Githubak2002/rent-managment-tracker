"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { z } from "zod";

const loginSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  password: z.string().min(3, "Password must be at least 3 characters"),
});

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({ username: "", password: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate input
    const result = loginSchema.safeParse(formData);
    if (!result.success) {
      toast.error(result.error.errors[0].message);
      return;
    }

    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const data = await res.json();
    if (!res.ok) {
      toast.error(data.error);
    } else {
      localStorage.setItem("token", data.token);
      toast.success("Login successful!");
      router.push("/rent");
      // router.push("/dashboard");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm">
        <h2 className="text-xl font-bold mb-4 text-center">Admin Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input 
            type="text" 
            name="username" 
            placeholder="Username" 
            onChange={handleChange} 
            required 
          />
          <Input 
            type="password" 
            name="password" 
            placeholder="Password" 
            onChange={handleChange} 
            required 
          />
          <Button type="submit" className="w-full">Login</Button>
        </form>
      </div>
    </div>
  );
}


// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";

// export default function LoginPage() {
//   const router = useRouter();
//   const [formData, setFormData] = useState({ username: "", password: "" });
//   const [error, setError] = useState("");

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");

//     const res = await fetch("/api/login", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(formData),
//     });

//     const data = await res.json();
//     if (!res.ok) {
//       setError(data.error);
//     } else {
//       localStorage.setItem("token", data.token);
//       router.push("/dashboard"); // Redirect to dashboard
//     }
//   };

//   return (
//     <div className="flex min-h-screen items-center justify-center bg-gray-100">
//       <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm">
//         <h2 className="text-xl font-bold mb-4 text-center">Admin Login</h2>
//         {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
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
