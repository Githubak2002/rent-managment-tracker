import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { validateToken } from "../../../lib/auth";
import Renter from "../../../models/renter.model";



// ✅ Fetch All Renters
export async function GET() {
  try {
    await connectDB();
    const renters = await Renter.find();
    // const renters = await Renter.find().populate("payments"); // Populate payments
    return NextResponse.json({
      success: true,
      msg: "Renters fetched successfully",
      error: "",
      renters ,
    }, { status: 200 });
  } catch (error) {
    console.log("Error in Get renters → ", error);
    return NextResponse.json({
      success: false,
      msg: "Failed to fetch renters",
      error: error.message,
    }, { status: 500 });
  }
}

// ✅ Add New Renter
export async function POST(req) {
  try {
    await connectDB();
    const { name, moveInDate, initialLightMeterReading, comments } = await req.json();

    const newRenter = new Renter({
      name,
      moveInDate,
      initialLightMeterReading,
      comments,
      active: true, // Default active
      movedOutDate: null, // Initially not displayed
      payments: []
    });

    await newRenter.save();

    return NextResponse.json({
      success: true,
      msg: "Renter added successfully",
      error: "",
      newRenter,
    }, { status: 201 });
  } catch (error) {
    console.log("Error in Post renter → ", error);
    return NextResponse.json({
      success: false,
      msg: "Error saving renter",
      error: error.message,
    }, { status: 500 });
  }
}

// ✅ Update Renter Details
export async function PUT(req) {
  try {
    await connectDB();
    const { _id, name, moveInDate, initialLightMeterReading, comments } = await req.json();

    const updatedRenter = await Renter.findByIdAndUpdate(
      _id,
      { name, moveInDate, initialLightMeterReading, comments },
      { new: true }
    );

    if (!updatedRenter) {
      return NextResponse.json({
        success: false,
        msg: "Renter not found",
        error: "",

      }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      msg: "Renter updated successfully",
      error: "",
      data: updatedRenter ,
    }, { status: 200 });
  } catch (error) {
    console.log("Error in Update renter → ", error);
    return NextResponse.json({
      success: false,
      msg: "Failed to update renter",
      error: error.message
    }, { status: 500 });
  }
}

// ✅ Toggle Active/Inactive Status
export async function PATCH(req) {
  try {
    await connectDB();
    const { _id } = await req.json();

    const renter = await Renter.findById(_id);
    if (!renter) {
      return NextResponse.json({
        success: false,
        msg: "Renter not found",
        error: "",
        data: {},
      }, { status: 404 });
    }

    // Toggle active state
    const isActive = !renter.active;
    
    // If making active, remove `movedOutDate`, else set it to today's date
    const updatedFields = {
      active: isActive,
      movedOutDate: isActive ? undefined : new Date().toISOString().split("T")[0]
    };

    const updatedRenter = await Renter.findByIdAndUpdate(_id, updatedFields, { new: true });

    return NextResponse.json({
      success: true,
      msg: `Renter status updated to ${updatedRenter.active ? "Active" : "Inactive"}`,
      error: "",
      data: updatedRenter ,
    }, { status: 200 });

  } catch (error) {
    console.log("Error in Active/Inactive renters → ", error);
    return NextResponse.json({
      success: false,
      msg: "Failed to update renter status",
      error: error.message,
    }, { status: 500 });
  }
}

// ✅ Delete Renter
export async function DELETE(req) {
  try {
    await connectDB();
    const { _id } = await req.json();

    const deletedRenter = await Renter.findByIdAndDelete(_id);

    if (!deletedRenter) {
      return NextResponse.json({
        success: false,
        msg: "Renter not found",
        error: "",
      }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      msg: "Renter deleted successfully",
      error: "",
    }, { status: 200 });
  } catch (error) {
    console.log("Error in Deleting a renter → ", error);
    return NextResponse.json({
      success: false,
      msg: "Failed to delete renter",
      error: error.message,
    }, { status: 500 });
  }
}








// // ✅ Fetch All Renters
// export async function GET(req) {
//   // Call validateToken to verify the JWT token
//   const { decoded, error, status } = await validateToken(req);

//   // If the token is invalid or missing, return the error response
//   if (error) {
//     return NextResponse.json({ error: error }, { status: status || 401 });
//   }

//   try {
//     await connectDB(); // Connect to the database

//     console.log('User Info: ', decoded); // You can now use the decoded data, e.g., user info

//     const renters = await Renter.find(); // Fetch renters from DB

//     return NextResponse.json({
//       success: true,
//       msg: 'Renters fetched successfully',
//       renters,
//     }, { status: 200 });
//   } catch (error) {
//     return NextResponse.json(
//       { success: false, msg: 'Failed to fetch renters', error: error.message },
//       { status: 500 }
//     );
//   }
// }

// // ✅ Add New Renter
// export async function POST(req) {
//   // Validate the token
//   const { error, status } = await validateToken(req);
//   if (error) {
//     return NextResponse.json({ error: error }, { status: status || 401 });
//   }

//   try {
//     await connectDB();
//     const { name, moveInDate, initialLightMeterReading, comments } = await req.json();

//     const newRenter = new Renter({
//       name,
//       moveInDate,
//       initialLightMeterReading,
//       comments,
//       active: true, // Default active
//       movedOutDate: null, // Initially not displayed
//     });

//     await newRenter.save();

//     return NextResponse.json({
//       success: true,
//       msg: "Renter added successfully",
//       error: "",
//       newRenter,
//     }, { status: 201 });
//   } catch (error) {
//     return NextResponse.json({
//       success: false,
//       msg: "Error saving renter",
//       error: error.message,
//     }, { status: 500 });
//   }
// }

// // ✅ Update Renter Details
// export async function PUT(req) {
//   // Validate the token
//   const { error, status } = await validateToken(req);
//   if (error) {
//     return NextResponse.json({ error: error }, { status: status || 401 });
//   }

//   try {
//     await connectDB();
//     const { _id, name, moveInDate, initialLightMeterReading, comments } = await req.json();

//     const updatedRenter = await Renter.findByIdAndUpdate(
//       _id,
//       { name, moveInDate, initialLightMeterReading, comments },
//       { new: true }
//     );

//     if (!updatedRenter) {
//       return NextResponse.json({
//         success: false,
//         msg: "Renter not found",
//         error: "",
//       }, { status: 404 });
//     }

//     return NextResponse.json({
//       success: true,
//       msg: "Renter updated successfully",
//       error: "",
//       data: updatedRenter,
//     }, { status: 200 });
//   } catch (error) {
//     return NextResponse.json({
//       success: false,
//       msg: "Failed to update renter",
//       error: error.message
//     }, { status: 500 });
//   }
// }

// // ✅ Delete Renter
// export async function DELETE(req) {
//   // Validate the token
//   const { error, status } = await validateToken(req);
//   if (error) {
//     return NextResponse.json({ error: error }, { status: status || 401 });
//   }

//   try {
//     await connectDB();
//     const { _id } = await req.json();

//     const deletedRenter = await Renter.findByIdAndDelete(_id);

//     if (!deletedRenter) {
//       return NextResponse.json({
//         success: false,
//         msg: "Renter not found",
//         error: "",
//       }, { status: 404 });
//     }

//     return NextResponse.json({
//       success: true,
//       msg: "Renter deleted successfully",
//       error: "",
//     }, { status: 200 });
//   } catch (error) {
//     return NextResponse.json({
//       success: false,
//       msg: "Failed to delete renter",
//       error: error.message,
//     }, { status: 500 });
//   }
// }

// // ✅ Toggle Active/Inactive Status
// export async function PATCH(req) {
//   // Validate the token
//   const { error, status } = await validateToken(req);
//   if (error) {
//     return NextResponse.json({ error: error }, { status: status || 401 });
//   }

//   try {
//     await connectDB();
//     const { _id } = await req.json();

//     const renter = await Renter.findById(_id);
//     if (!renter) {
//       return NextResponse.json({
//         success: false,
//         msg: "Renter not found",
//         error: "",
//         data: {},
//       }, { status: 404 });
//     }

//     // Toggle active state
//     const isActive = !renter.active;
    
//     // If making active, remove `movedOutDate`, else set it to today's date
//     const updatedFields = {
//       active: isActive,
//       movedOutDate: isActive ? undefined : new Date().toISOString().split("T")[0]
//     };

//     const updatedRenter = await Renter.findByIdAndUpdate(_id, updatedFields, { new: true });

//     return NextResponse.json({
//       success: true,
//       msg: `Renter status updated to ${updatedRenter.active ? "Active" : "Inactive"}`,
//       error: "",
//       data: updatedRenter,
//     }, { status: 200 });

//   } catch (error) {
//     return NextResponse.json({
//       success: false,
//       msg: "Failed to update renter status",
//       error: error.message,
//     }, { status: 500 });
//   }
// }



