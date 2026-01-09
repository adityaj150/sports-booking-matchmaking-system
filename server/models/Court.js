const mongoose = require("mongoose");

const courtSchema = new mongoose.Schema(
  {
    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    name: { type: String, required: true },
    sportType: {
      type: String,
      enum: ["Football", "Badminton", "Pickleball"],
      required: true
    },
    location: { type: String, required: true },
    pricePerHour: { type: Number, required: true },
    images: [String],
    availableSlots: [
      {
        date: String,
        slots: [String]
      }
    ]
  },
  { timestamps: true }
);

module.exports = mongoose.model("Court", courtSchema);
