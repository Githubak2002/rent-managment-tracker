import mongoose from "mongoose";

const PaymentSchema = new mongoose.Schema({
  date: { type: String, required: true }, // Date of payment
  lightMeterReading: { type: Number, required: true }, // Light meter reading at the time of payment
  rentPaid: { type: Number, required: true }, // Rent paid in Rs
  lightBillPaid: { type: Number, required: true }, // Light bill paid in Rs
  waterBillPaid: { type: Number, required: true }, // Water bill paid in Rs
  paymentMode: { type: String, enum: ["Cash", "Online"], required: true }, // Payment mode (cash/online)
  onlinePlatform: { type: String, enum: ["Paytm", "PhonePe", "Other"], default: null }, // Online platform (if payment mode is online)
  comments: { type: String, default: "" }, // Additional notes
});

const RenterSchema = new mongoose.Schema({
  name: { type: String, required: true }, // Name of the renter
  phoneNumber: { 
    type: String, 
    required: true, 
    match: [/^\d{10}$/, "Please provide a valid 10-digit phone number"] 
  },
  moveInDate: { type: String, required: true }, // Move-in date
  initialLightMeterReading: { type: Number, required: true }, // Initial light meter reading
  comments: { type: String, default: "" }, // General comments
  active: { type: Boolean, default: true }, // Active by default
  movedOutDate: { type: String, default: null }, // Move-out date (if applicable)
  payments: { type: [PaymentSchema], default: [] }, // Array of payments
});

const Renter = mongoose.models.Renter || mongoose.model("Renter", RenterSchema);
export default Renter;

// import mongoose from "mongoose";

// const RenterSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   moveInDate: { type: String, required: true },
//   initialLightMeterReading: { type: Number, required: true },
//   comments: { type: String, default: "" },
//   active: { type: Boolean, default: true }, // Active by default
//   movedOutDate: { type: String, default: null }, // Not shown initially

//   payments: { type: [mongoose.Schema.Types.ObjectId], ref: "Payment", default: [] }, 

// });

// const Renter = mongoose.models.Renter || mongoose.model("Renter", RenterSchema);

// export default Renter;
