const Booking = require("../models/booking");

// TEMP dummy court
const DUMMY_COURT_ID = "dummy-court-1";

const createMatchmakingBooking = async ({
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

module.exports = { createMatchmakingBooking };
