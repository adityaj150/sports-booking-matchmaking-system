const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: {
      type: String,
      enum: ["USER", "OWNER"],
      default: "USER"
    },
    skillLevels: {
      football: { type: String, enum: ["Beginner", "Intermediate", "Pro"] },
      badminton: { type: String, enum: ["Beginner", "Intermediate", "Pro"] },
      pickleball: { type: String, enum: ["Beginner", "Intermediate", "Pro"] }
    },
    stats: {
      matchesPlayed: { type: Number, default: 0 },
      wins: { type: Number, default: 0 },
      cancellations: { type: Number, default: 0 }
    },
    xp: { type: Number, default: 0 },
    badges: [String]
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
