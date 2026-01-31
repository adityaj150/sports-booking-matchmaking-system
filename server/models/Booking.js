import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    courtId: {
      type: String,
      required: true
    },
    players: [
      {
        type: String
      }
    ],
    bookingType: {
      type: String,
      enum: ["PRIVATE", "MATCHMAKING"],
      required: true
    },
    sportType: { type: String, required: true },
    date: { type: String, required: true },
    timeSlot: { type: String, required: true },
    status: {
      type: String,
      enum: ["CONFIRMED", "CANCELLED", "COMPLETED"],
      default: "CONFIRMED"
    }
  },
  { timestamps: true }
);

export default mongoose.model("Booking", bookingSchema);
