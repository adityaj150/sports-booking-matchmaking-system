import MatchmakingPool from "../models/MatchmakingPool.js";
import User from "../models/User.js";

const RATING_RANGE = 200; // Allow matches within +/- 200 rating

export const findMatch = async (currentUser) => {
  const {
    userId,
    sportType,
    skillLevel,
    preferredDate,
    preferredTimeSlot,
    socketId
  } = currentUser;

  console.log("🔎 Searching match for:", userId);

  // 1. Get current user's rating
  const userProfile = await User.findOne({ firebaseUid: userId });
  const userRating = userProfile?.skillRating || 1000;

  // 2. Find opponent in pool with similar rating
  const match = await MatchmakingPool.findOneAndDelete({
    sportType,
    preferredDate,
    preferredTimeSlot,
    userId: { $ne: userId },
    skillRating: { $gte: userRating - RATING_RANGE, $lte: userRating + RATING_RANGE }
  });

  if (match) {
    console.log("✅ Match found:", match.userId);
    return match;
  }

  console.log("➕ No match, adding to queue:", userId);

  await MatchmakingPool.create({
    userId,
    sportType,
    skillLevel, // Keeping it for record
    preferredDate,
    preferredTimeSlot,
    socketId,
    skillRating: userRating
  });

  return null;
};
