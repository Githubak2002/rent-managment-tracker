// app/api/payment/[paymentId]/route.js

import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Payment from "@/models/payment.model";

// ✅ Get Payment by ID
export async function GET(request, { params }) {
  const { paymentId } = params;

  try {
    await connectDB();

    const payment = await Payment.findById(paymentId).populate(
      "renterId",
      "name phoneNumber"
    );

    if (!payment) {
      return NextResponse.json(
        {
          success: false,
          msg: "Payment not found",
          error: "Payment not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        msg: "Payment fetched successfully",
        error: "",
        payment,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("Error in Get payment → ", error);
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

// ✅ Update Payment
export async function PUT(request, { params }) {
  const { paymentId } = params;

  try {
    await connectDB();
    const updatedData = await request.json();

    const payment = await Payment.findByIdAndUpdate(
      paymentId,
      { ...updatedData },
      { new: true }
    ).populate("renterId", "name phoneNumber");

    if (!payment) {
      return NextResponse.json(
        {
          success: false,
          msg: "Payment not found",
          error: "Payment not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        msg: "Payment updated successfully",
        error: "",
        payment,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("Error in Update payment → ", error);
    return NextResponse.json(
      {
        success: false,
        msg: "Failed to update payment",
        error: error.message,
      },
      { status: 500 }
    );
  }
}

// ✅ Delete Payment
export async function DELETE(request, { params }) {
  const { paymentId } = params;

  try {
    await connectDB();

    const payment = await Payment.findByIdAndDelete(paymentId);

    if (!payment) {
      return NextResponse.json(
        {
          success: false,
          msg: "Payment not found",
          error: "Payment not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        msg: "Payment deleted successfully",
        error: "",
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("Error in Delete payment → ", error);
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
