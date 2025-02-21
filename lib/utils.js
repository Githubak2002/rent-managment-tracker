// import { clsx, type ClassValue } from "clsx"
// import { twMerge } from "tailwind-merge"

// export function cn(...inputs: ClassValue[]) {
//   return twMerge(clsx(inputs))
// }


// import { clsx, type ClassValue } from "clsx";
// import { twMerge } from "tailwind-merge";
// import { format } from "date-fns";

// export function cn(...inputs: ClassValue[]) {
//   return twMerge(clsx(inputs));
// }

// export function formatDate(date: Date): string {
//   return format(date, "dd/MMMM/yyyy");
// }

// export function formatCurrency(amount: number): string {
//   return new Intl.NumberFormat("en-IN", {
//     style: "currency",
//     currency: "INR",
//   }).format(amount);
// }


import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { format } from "date-fns";

// Utility function to merge and combine class names
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// Format a date to "dd/MMMM/yyyy" format
export function formatDate(date) {
  return format(date, "dd/MMMM/yyyy");
}

// Format a number as currency (INR)
export function formatCurrency(amount) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  }).format(amount);
}
