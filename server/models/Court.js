import mongoose from "mongoose";

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
        date: { type: String, required: true },
        slots: [
          {
            startTime: { type: String, required: true },
            endTime: { type: String, required: true },
            isBooked: { type: Boolean, default: false }
          }
        ]
      }
    ]
  },
  { timestamps: true }
);

export default mongoose.model("Court", courtSchema);
