import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db"; 
import Renter from "@/models/renter.model"; 


// ✅ Add Payment for a Renter
export async function POST(request) {
  try {
    await connectDB();

    // Parse the request body
    const {
      renterId,
      date,
      lightMeterReading,
      rentPaid,
      lightBillPaid,
      waterBillPaid,
      paymentMode,
      onlinePlatform,
      comments,
    } = await request.json();

    // Validate required fields
    if (
      !renterId ||
      !date ||
      !lightMeterReading ||
      !rentPaid ||
      !lightBillPaid ||
      !waterBillPaid ||
      !paymentMode
    ) {
      return NextResponse.json(
        {
          success: false,
          msg: "Missing required fields",
          error: "All fields are required except comments and onlinePlatform",
        },
        { status: 400 }
      );
    }

    // Validate payment mode
    if (paymentMode === "online" && !onlinePlatform) {
      return NextResponse.json(
        {
          success: false,
          msg: "Online platform is required for online payments",
          error: "Online platform is required",
        },
        { status: 400 }
      );
    }

    // Check if the renter exists
    const renter = await Renter.findById(renterId);
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

    // Create a new payment object
    const newPayment = {
      date,
      lightMeterReading,
      rentPaid,
      lightBillPaid,
      waterBillPaid,
      paymentMode,
      onlinePlatform: paymentMode === "Online" ? onlinePlatform : null,
      comments,
    };

    // Add the payment to the renter's payments array
    renter.payments.push(newPayment);
    await renter.save();

    return NextResponse.json(
      {
        success: true,
        msg: "Payment added successfully",
        error: "",
        renter,
      },
      { status: 201 }
    );
  } catch (error) {
    console.log("Error in Add Payment → ", error);
    return NextResponse.json(
      {
        success: false,
        msg: "Failed to add payment",
        error: error.message,
      },
      { status: 500 }
    );
  }
}

// ✅ Delete a Payment of a Renter
export async function DELETE(req) {
  try {
    await connectDB();
    const { renterId, paymentId } = await req.json(); 

    // Find the renter and remove the specific payment
    const renter = await Renter.findById(renterId);

    if (!renter) {
      return NextResponse.json({
        success: false,
        msg: "Renter not found",
        error: "",
      }, { status: 404 });
    }

    // Filter out the payment from the renter's payments array
    const updatedPayments = renter.payments.filter(payment => payment._id.toString() !== paymentId);

    // Update the renter's payments array
    renter.payments = updatedPayments;
    await renter.save();

    return NextResponse.json({
      success: true,
      msg: "Payment deleted successfully",
      error: "",
    }, { status: 200 });
  } catch (error) {
    console.log("Error in deleting payment → ", error);
    return NextResponse.json({
      success: false,
      msg: "Failed to delete payment",
      error: error.message,
    }, { status: 500 });
  }
}



// ✅ Add Payment for a Renter
// export async function POST(request) {
//   try {
//     await connectDB();

//     // Parse the request body
//     const {
//       renterId,
//       date,
//       lightMeterReading,
//       rentPaid,
//       lightBillPaid,
//       waterBillPaid,
//       paymentMode,
//       onlinePlatform,
//       comments,
//     } = await request.json();

//     // Validate required fields
//     if (
//       !renterId ||
//       !date ||
//       !lightMeterReading ||
//       !rentPaid ||
//       !lightBillPaid ||
//       !waterBillPaid ||
//       !paymentMode
//     ) {
//       return NextResponse.json(
//         {
//           success: false,
//           msg: "Missing required fields",
//           error: "All fields are required except comments and onlinePlatform",
//         },
//         { status: 400 }
//       );
//     }

//     // Validate payment mode
//     if (paymentMode === "online" && !onlinePlatform) {
//       return NextResponse.json(
//         {
//           success: false,
//           msg: "Online platform is required for online payments",
//           error: "Online platform is required",
//         },
//         { status: 400 }
//       );
//     }

//     // Check if the renter exists
//     const renter = await Renter.findById(renterId);
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

//     // Create a new payment
//     const newPayment = new Payment({
//       date,
//       lightMeterReading,
//       rentPaid,
//       lightBillPaid,
//       waterBillPaid,
//       paymentMode,
//       onlinePlatform: paymentMode === "online" ? onlinePlatform : null,
//       comments,
//       renter: renterId,
//     });

//     // Save the payment
//     await newPayment.save();

//     // Add the payment reference to the renter's payments array
//     renter.payments = renter.payments || []; // Ensure payments array exists
//     renter.payments.push(newPayment._id);
//     await renter.save();

//     return NextResponse.json(
//       {
//         success: true,
//         msg: "Payment added successfully",
//         error: "",
//         payment: newPayment,
//       },
//       { status: 201 }
//     );
//   } catch (error) {
//     console.log("Error in Add Payment → ", error);
//     return NextResponse.json(
//       {
//         success: false,
//         msg: "Failed to add payment",
//         error: error.message,
//       },
//       { status: 500 }
//     );
//   }
// }


