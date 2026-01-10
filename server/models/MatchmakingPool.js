const mongoose = require("mongoose");

const matchmakingPoolSchema = new mongoose.Schema(
  {
    userId: {
    type: String,
    required: true
    },
    sportType: { type: String, required: true },
    skillLevel: { type: String, required: true },
    preferredDate: { type: String, required: true },
    preferredTimeSlot: { type: String, required: true },
    socketId: { type: String, required: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model("MatchmakingPool", matchmakingPoolSchema);
