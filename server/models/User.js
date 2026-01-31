import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  firebaseUid: {
    type: String,
    required: true,
    unique: true
  },
  email: { type: String, required: true },
  name: { type: String },
  role: {
    type: String,
    enum: ["USER", "OWNER"],
    default: "USER"
  },
  xp: { type: Number, default: 0 },
  badges: [String],
  skillRating: { type: Number, default: 1000 },
  reliabilityScore: { type: Number, default: 100 },
  stats: {
    matchesPlayed: { type: Number, default: 0 },
    wins: { type: Number, default: 0 },
    cancellations: { type: Number, default: 0 }
  }
});


export default mongoose.model("User", userSchema);
