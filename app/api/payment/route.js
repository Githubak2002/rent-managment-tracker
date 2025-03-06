import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Payment from "@/models/payment.model";
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
      rentPaid === undefined ||
      lightBillPaid === undefined ||
      waterBillPaid === undefined ||
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

    // Validate numeric fields are not negative
    if (
      rentPaid < 0 ||
      lightBillPaid < 0 ||
      waterBillPaid < 0 ||
      lightMeterReading < 0
    ) {
      return NextResponse.json(
        {
          success: false,
          msg: "Invalid values",
          error: "Numeric fields cannot be negative",
        },
        { status: 400 }
      );
    }

    // Validate payment mode
    if (paymentMode === "Online" && !onlinePlatform) {
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

    // Create a new payment
    const newPayment = new Payment({
      renterId,
      date,
      lightMeterReading,
      rentPaid,
      lightBillPaid,
      waterBillPaid,
      paymentMode,
      onlinePlatform: paymentMode === "Online" ? onlinePlatform : null,
      comments,
    });

    await newPayment.save();

    return NextResponse.json(
      {
        success: true,
        msg: "Payment added successfully",
        error: "",
        payment: newPayment,
      },
      { status: 201 }
    );
  } catch (error) {
    console.log("Error in Post payment → ", error);
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

// ✅ Get All Payments (with optional renterId filter)
export async function GET(request) {
  try {
    await connectDB();

    // Get renterId from query params if it exists
    const { searchParams } = new URL(request.url);
    const renterId = searchParams.get("renterId");

    // Build query
    const query = renterId ? { renterId } : {};

    // Fetch payments with renter details and sort by date
    const payments = await Payment.find(query)
      .populate("renterId", "name phoneNumber")
      .sort({ date: -1 }) // Sort by date in descending order
      .then((payments) => {
        // Sort payments by converting date strings to Date objects
        return payments.sort((a, b) => {
          const dateA = new Date(a.date.split("/").reverse().join("-"));
          const dateB = new Date(b.date.split("/").reverse().join("-"));
          return dateB - dateA;
        });
      });

    return NextResponse.json(
      {
        success: true,
        msg: "Payments fetched successfully",
        error: "",
        payments,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("Error in Get payments → ", error);
    return NextResponse.json(
      {
        success: false,
        msg: "Failed to fetch payments",
        error: error.message,
      },
      { status: 500 }
    );
  }
}

// ✅ Update Payment of a Renter
export async function PUT(request) {
  const { renterId, paymentId, updatedPaymentData } = await request.json();

  try {
    await connectDB();

    // Find the renter and update the specific payment
    const renter = await Renter.findOneAndUpdate(
      { _id: renterId, "payments._id": paymentId }, // Find the renter and payment
      { $set: { "payments.$": updatedPaymentData } }, // Update the payment
      { new: true } // Return the updated document
    );

    if (!renter) {
      return NextResponse.json(
        { success: false, msg: "Renter or Payment not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, msg: "Payment updated successfully", renter },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in updating payment → ", error);
    return NextResponse.json(
      { success: false, msg: "Failed to update payment", error: error.message },
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
      return NextResponse.json(
        {
          success: false,
          msg: "Renter not found",
          error: "",
        },
        { status: 404 }
      );
    }

    // Filter out the payment from the renter's payments array
    const updatedPayments = renter.payments.filter(
      (payment) => payment._id.toString() !== paymentId
    );

    // Update the renter's payments array
    renter.payments = updatedPayments;
    await renter.save();

    return NextResponse.json(
      {
        success: true,
        msg: "Payment deleted successfully",
        error: "",
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("Error in deleting payment → ", error);
    return NextResponse.json(
      {
        success: false,
        msg: "Failed to delete payment",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
