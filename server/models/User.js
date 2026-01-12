const mongoose = require("mongoose");

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
  stats: {
    matchesPlayed: { type: Number, default: 0 },
    wins: { type: Number, default: 0 },
    cancellations: { type: Number, default: 0 }
  }
});


module.exports = mongoose.model("User", userSchema);
