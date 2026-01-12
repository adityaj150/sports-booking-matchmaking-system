const MatchmakingPool = require("../models/MatchmakingPool");


const findMatch = async (currentUser) => {
  const {
    userId,
    sportType,
    skillLevel,
    preferredDate,
    preferredTimeSlot,
    socketId
  } = currentUser;

  console.log("🔎 Searching match for:", userId);

  const match = await MatchmakingPool.findOneAndDelete({
    sportType,
    skillLevel,
    preferredDate,
    preferredTimeSlot,
    userId: { $ne: userId }
  });

  if (match) {
    console.log("✅ Match found:", match.userId);
    return match;
  }

  console.log("➕ No match, adding to queue:", userId);

  await MatchmakingPool.create({
    userId,
    sportType,
    skillLevel,
    preferredDate,
    preferredTimeSlot,
    socketId
  });

  return null;
};

module.exports = { findMatch };
