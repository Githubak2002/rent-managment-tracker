import mongoose from "mongoose";

const RenterSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
      match: [/^\d{10}$/, "Please provide a valid 10-digit phone number"],
    },
    moveInDate: {
      type: String,
      required: true,
    },
    initialLightMeterReading: {
      type: Number,
      required: true,
    },
    comments: {
      type: String,
      default: "",
    },
    active: {
      type: Boolean,
      default: true,
    },
    movedOutDate: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

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
