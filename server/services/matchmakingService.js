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

  // ✅ CLEAN OLD ENTRIES
  await MatchmakingPool.deleteMany({
    $or: [{ userId }, { socketId }]
  });

  const match = await MatchmakingPool.findOneAndDelete({
    sportType,
    skillLevel,
    preferredDate,
    preferredTimeSlot,
    userId: { $ne: userId },
    socketId: { $ne: socketId } // ✅ extra safety
  });

  if (match) {
    return match;
  }

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
