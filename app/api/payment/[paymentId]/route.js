// app/api/payment/[paymentId]/route.js

import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db"; 
import Renter from "@/models/renter.model"; 

// ✅ Get Payment by Payment ID
export async function GET(request, { params }) {
  const { paymentId } = await params; 

  try {
    await connectDB(); 

    // Find the payment by its _id from the renters' payments array
    const renter = await Renter.findOne({ "payments._id": paymentId }, { "payments.$": 1 });

    if (!renter) {
      return NextResponse.json(
        {
          success: false,
          msg: "Payment not found",
          error: "Payment not found",
        },
        { status: 404 }
      );
    }

    // Extract the payment
    const payment = renter.payments[0];

    return NextResponse.json(
      {
        success: true,
        msg: "Payment fetched successfully",
        error: "",
        payment, // Return the payment object
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("Error in getting payment → ", error);
    return NextResponse.json(
      {
        success: false,
        msg: "Failed to fetch payment",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
