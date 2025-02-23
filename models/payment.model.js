// import mongoose from "mongoose";

// const PaymentSchema = new mongoose.Schema({
//   date: { type: String, required: true }, // Date of payment
//   lightMeterReading: { type: Number, required: true }, // Light meter reading at the time of payment
//   rentPaid: { type: Number, required: true }, // Rent paid in Rs
//   lightBillPaid: { type: Number, required: true }, // Light bill paid in Rs
//   waterBillPaid: { type: Number, required: true }, // Water bill paid in Rs
//   paymentMode: { type: String, enum: ["cash", "online"], required: true }, // Payment mode (cash/online)
//   onlinePlatform: { type: String, enum: ["paytm", "phonepay", "others"], default: null }, // Online platform (if payment mode is online)
//   comments: { type: String, default: "" }, // Additional notes
//   renter: { type: mongoose.Schema.Types.ObjectId, ref: "Renter", required: true }, // Reference to Renter
// });

// const Payment = mongoose.models.Payment || mongoose.model("Payment", PaymentSchema);
// export default Payment;