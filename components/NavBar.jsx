"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { LogOut, LogIn } from "lucide-react";
import toast from "react-hot-toast";
import useStore from "@/lib/store";

export default function NavBar() {
  const router = useRouter();
  const { isAuthenticated, setIsAuthenticated } = useStore();
  // const [isLoading, setIsLoading] = useState(true); // Add loading state

  // Check authentication status when the component mounts
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch('/api/check-auth', {
          method: 'GET',
          credentials: 'include', // Include cookies in the request
        });

        const data = await res.json();

        if (res.ok && data.isAuthenticated) {
          setIsAuthenticated(true); // Update authentication state
        } else {
          setIsAuthenticated(false); // User is not authenticated
        }
      } catch (error) {
        console.error('Error checking authentication:', error);
        setIsAuthenticated(false); // Assume user is not authenticated on error
      } 
      // finally {
      //   setIsLoading(false); // Set loading to false after the check
      // }
    };

    checkAuth();
  }, [setIsAuthenticated]);

  // Handle logout
  const handleLogout = async () => {
    try {
      const res = await fetch('/api/logout', {
        method: 'POST',
        credentials: 'include', // Include cookies in the request
      });

      const data = await res.json();

      if (res.ok) {
        toast.success('Logout successful!');
        setIsAuthenticated(false); // Update authentication state
        router.push('/login'); // Redirect to the login page
      } else {
        toast.error(data.error || 'Logout failed');
      }
    } catch (error) {
      console.error('Error during logout:', error);
      toast.error('An error occurred during logout');
    }
  };

  // Show loading state while checking authentication
  // if (isLoading) {
  //   return (
  //     <nav className="w-full bg-gradient-to-r from-[#1e293b] via-[#334155] to-[#475569] text-white py-3 px-6 flex justify-between items-center shadow-md">
  //       <h1 className="text-xl sm:text-2xl font-semibold tracking-wide">Rent Management</h1>
  //       <div className="ml-auto">
  //         <Button disabled className="flex items-center gap-2 px-4 py-2 bg-white text-gray-800 hover:bg-gray-200 transition">
  //           Loading...
  //         </Button>
  //       </div>
  //     </nav>
  //   );
  // }

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

// import { useEffect } from "react";
// import { useRouter } from "next/navigation";
// import { Button } from "@/components/ui/button";
// import { LogOut, LogIn } from "lucide-react";
// import { useState } from "react";
// import toast from "react-hot-toast";

// import useStore from "@/lib/store";

// export default function NavBar() {
//   const router = useRouter();

//   const {isAuthenticated, setIsAuthenticated} = useStore();

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     setIsAuthenticated(!!token);
//   }, []);

//   const handleLogout = async () => {
//     try {
//       const res = await fetch('/api/logout', {
//         method: 'POST',
//         credentials: 'include', // Include cookies in the request
//       });

//       const data = await res.json();

//       if (res.ok) {
//         toast.success('Logout successful!');
//         router.push('/login'); // Redirect to the login page
//       } else {
//         toast.error(data.error || 'Logout failed');
//       }
//     } catch (error) {
//       console.error('Error during logout:', error);
//       toast.error('An error occurred during logout');
//     }
//   };


  // const handleLogout = () => {
  //   localStorage.removeItem("token");
  //   setIsAuthenticated(false);
  //   toast.success("Logged out successfully!");
  //   router.push("/login");
  // };

//   return (
//     <nav className="w-full bg-gradient-to-r from-[#1e293b] via-[#334155] to-[#475569] text-white py-3 px-6 flex justify-between items-center shadow-md">
//       {/* Logo on the Left */}
//       <h1 className="text-xl sm:text-2xl font-semibold tracking-wide">Rent Management</h1>

//       {/* Authentication Buttons on the Right */}
//       <div className="ml-auto">
//         {!isAuthenticated ? (
//           <Button
//             onClick={() => {
//               router.push("/login");
//             }}
//             className="flex items-center gap-2 px-4 py-2 bg-white text-gray-800 hover:bg-gray-200 transition"
//           >
//             <LogIn className="w-5 h-5" />
//             Login
//           </Button>
//         ) : (
//           <Button
//             variant="ghost"
//             onClick={handleLogout}
//             className="flex items-center gap-2 text-white hover:scale-100 transition-all"
//           >
//             <LogOut className="w-5 h-5" />
//             Logout
//           </Button>
//         )}
//       </div>
//     </nav>
//   );
// }



// "use client";

// import { useEffect } from "react";
// import { useRouter } from "next/navigation";
// import { Button } from "@/components/ui/button";
// import { LogOut, LogIn } from "lucide-react";
// import { useState } from "react";
// import toast from "react-hot-toast";

// import useStore from "@/lib/store";

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
//     toast.success("Logged out successfully!");
//     router.push("/login");
//   };

//   return (
//     <nav className="w-full bg-gradient-to-r from-[#1e293b] via-[#334155] to-[#475569] text-white py-3 px-6 flex justify-between items-center shadow-md">
//       {/* Logo on the Left */}
//       <h1 className="text-xl sm:text-2xl font-semibold tracking-wide">Rent Management</h1>

//       {/* Authentication Buttons on the Right */}
//       <div className="ml-auto">
//         {!isAuthenticated ? (
//           <Button
//             onClick={() => {
//               router.push("/login");
//             }}
//             className="flex items-center gap-2 px-4 py-2 bg-white text-gray-800 hover:bg-gray-200 transition"
//           >
//             <LogIn className="w-5 h-5" />
//             Login
//           </Button>
//         ) : (
//           <Button
//             variant="ghost"
//             onClick={handleLogout}
//             className="flex items-center gap-2 text-white hover:scale-100 transition-all"
//           >
//             <LogOut className="w-5 h-5" />
//             Logout
//           </Button>
//         )}
//       </div>
//     </nav>
//   );
// }

