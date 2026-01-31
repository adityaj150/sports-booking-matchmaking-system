import Booking from "../models/Booking.js";

// TEMP dummy court
const DUMMY_COURT_ID = "dummy-court-1";

export const createMatchmakingBooking = async ({
  userA,
  userB,
  sportType,
  date,
  timeSlot
}) => {
  const booking = await Booking.create({
    courtId: DUMMY_COURT_ID,
    players: [userA, userB],
    bookingType: "MATCHMAKING",
    sportType,
    date,
    timeSlot
  });

  return booking;
};
