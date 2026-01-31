import express from "express";
const router = express.Router();
import Booking from "../models/Booking.js";

router.post("/", async (req, res) => {
  try {
    const {
      courtId,
      userId,
      sportType,
      date,
      timeSlot
    } = req.body;

    const booking = await Booking.create({
      courtId,
      players: [userId],
      bookingType: "PRIVATE",
      sportType,
      date,
      timeSlot
    });

    res.status(201).json({
      success: true,
      booking
    });
  } catch (error) {
    console.error("Booking error:", error);
    res.status(500).json({ success: false, message: "Booking failed" });
  }
});

export default router;
