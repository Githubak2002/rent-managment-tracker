import mongoose from "mongoose";

const RenterSchema = new mongoose.Schema({
  name: { type: String, required: true },
  moveInDate: { type: String, required: true },
  initialLightMeterReading: { type: Number, required: true },
  comments: { type: String, default: "" },
  active: { type: Boolean, default: true }, // Active by default
  movedOutDate: { type: String, default: null }, // Not shown initially
});

const Renter = mongoose.models.Renter || mongoose.model("Renter", RenterSchema);

export default Renter;
