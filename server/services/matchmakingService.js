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

  // Try to find another matching user
  const match = await MatchmakingPool.findOne({
    sportType,
    skillLevel,
    preferredDate,
    preferredTimeSlot,
    userId: { $ne: userId }
  });

  if (match) {
    // Remove both users from pool
    await MatchmakingPool.deleteMany({
      _id: { $in: [match._id] }
    });

    return match;
  }

  // No match found → add current user to pool
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
