"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { LogOut, LogIn } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

export default function NavBar() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    toast.success("Logged out successfully!");
    router.push("/login");
  };

  return (
    <nav className="w-full bg-gradient-to-r from-[#1e293b] via-[#334155] to-[#475569] text-white py-3 px-6 flex justify-between items-center shadow-md">
      {/* Logo on the Left */}
      <h1 className="text-xl sm:text-2xl font-semibold tracking-wide">Rent Management</h1>

      {/* Authentication Buttons on the Right */}
      <div className="ml-auto">
        {!isAuthenticated ? (
          <Button
            onClick={() => {
              router.push("/login");
            }}
            className="flex items-center gap-2 px-4 py-2 bg-white text-gray-800 hover:bg-gray-200 transition"
          >
            <LogIn className="w-5 h-5" />
            Login
          </Button>
        ) : (
          <Button
            variant="ghost"
            onClick={handleLogout}
            className="flex items-center gap-2 text-white hover:scale-100 transition-all"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </Button>
        )}
      </div>
    </nav>
  );
}


// "use client";

// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import { Button } from "@/components/ui/button";
// import { LogOut } from "lucide-react";

// export default function NavBar() {
//   const router = useRouter();
//   const [isAuthenticated, setIsAuthenticated] = useState(false);

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     setIsAuthenticated(!!token);
//   }, []);

//   const handleLogout = () => {
//     localStorage.removeItem("token"); // Remove token
//     setIsAuthenticated(false);
//     router.push("/login"); // Redirect to login
//   };

//   return (
//     <nav className="w-full bg-gradient-to-r from-blue-400 to-purple-400 text-white p-4 flex justify-between items-center shadow-md">
//       {/* Logo on the Left */}
//       <h1 className="text-xl font-bold">Rent Management</h1>

//       {/* Authentication Buttons on the Right */}
//       <div className="ml-auto">
//         {!isAuthenticated ? (
//           <Button onClick={() => router.push("/login")} className=" hover:scale-110 transition-all border-2 border-white bg-transparent hover:bg-transparent font-bold text-white">
//             Login
//           </Button>
//         ) : (
//           <button onClick={handleLogout} className="text-white hover:text-gray-200">
//             <LogOut className="w-6 h-6" />
//           </button>
//         )}
//       </div>
//     </nav>
//   );
// }



// "use client";

// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import { Button } from "@/components/ui/button";
// import { LogOut, LogIn } from "lucide-react";

// export default function NavBar() {
//   const router = useRouter();
//   const [isAuthenticated, setIsAuthenticated] = useState(false);

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     setIsAuthenticated(!!token);
//   }, []);

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     setIsAuthenticated(false);
//     router.push("/login");
//   };

//   return (
//     <nav className="w-full bg-gradient-to-r from-[#1e293b] via-[#334155] to-[#475569] text-white py-3 px-6 flex justify-between items-center shadow-md">
//       {/* Logo on the Left */}
//       <h1 className="text-2xl font-semibold tracking-wide">Rent Management</h1>

//       {/* Authentication Buttons on the Right */}
//       <div className="ml-auto">
//         {!isAuthenticated ? (
//           <Button
//             onClick={() => router.push("/login")}
//             className="flex items-center gap-2 px-4 py-2 bg-white text-gray-800 hover:bg-gray-200 transition"
//           >
//             <LogIn className="w-5 h-5" />
//             Login
//           </Button>
//         ) : (
//           <Button
//             variant="ghost"
//             onClick={handleLogout}
//             className="flex items-center gap-2 text-white hover:text-gray-300 transition"
//           >
//             <LogOut className="w-5 h-5" />
//             Logout
//           </Button>
//         )}
//       </div>
//     </nav>
//   );
// }
