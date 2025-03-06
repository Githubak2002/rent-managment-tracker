import mongoose from "mongoose";

const PaymentSchema = new mongoose.Schema(
  {
    renterId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Renter",
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    lightMeterReading: {
      type: Number,
      required: true,
    },
    rentPaid: {
      type: Number,
      required: true,
    },
    lightBillPaid: {
      type: Number,
      required: true,
    },
    waterBillPaid: {
      type: Number,
      required: true,
    },
    paymentMode: {
      type: String,
      enum: ["Cash", "Online"],
      required: true,
    },
    onlinePlatform: {
      type: String,
      enum: ["Paytm", "PhonePe", "Other"],
      default: null,
    },
    comments: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const Payment =
  mongoose.models.Payment || mongoose.model("Payment", PaymentSchema);
export default Payment;
