import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db"; 
import Renter from "@/models/renter.model"; 
// // import Renter from "../../../models/renter.model";


// ✅ Fetch Renter Details by ID
export async function GET(request, { params }) {
  const { id } = await params; // Extract renter ID from the URL

  try {
    await connectDB();
    const renter = await Renter.findById(id); // Fetch renter details

    if (!renter) {
      return NextResponse.json(
        {
          success: false,
          msg: "Renter not found",
          error: "Renter not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        msg: "Renter details fetched successfully",
        error: "",
        renter,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("Error in Get renter details → ", error);
    return NextResponse.json(
      {
        success: false,
        msg: "Failed to fetch renter details",
        error: error.message,
      },
      { status: 500 }
    );
  }
}




// // ✅ Fetch Renter Details by ID
// export async function GET(request, { params }) {
//   const { id } = params; // Extract renter ID from the URL

//   try {
//     await connectDB();
//     const renter = await Renter.findById(id).populate("payments"); // Populate payments

//     if (!renter) {
//       return NextResponse.json(
//         {
//           success: false,
//           msg: "Renter not found",
//           error: "Renter not found",
//         },
//         { status: 404 }
//       );
//     }

//     return NextResponse.json(
//       {
//         success: true,
//         msg: "Renter details fetched successfully",
//         error: "",
//         renter,
//       },
//       { status: 200 }
//     );
//   } catch (error) {
//     console.log("Error in Get renter details → ", error);
//     return NextResponse.json(
//       {
//         success: false,
//         msg: "Failed to fetch renter details",
//         error: error.message,
//       },
//       { status: 500 }
//     );
//   }
// }