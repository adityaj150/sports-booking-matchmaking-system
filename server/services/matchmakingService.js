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

  // 🔑 ATOMIC OPERATION
  const match = await MatchmakingPool.findOneAndDelete({
    sportType,
    skillLevel,
    preferredDate,
    preferredTimeSlot,
    userId: { $ne: userId }
  });

  if (match) {
    return match;
  }

  // No match → add user to pool
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
