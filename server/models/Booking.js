const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    courtId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Court",
      required: true
    },
    players: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
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

module.exports = mongoose.model("Booking", bookingSchema);
