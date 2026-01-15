const express = require("express");
const router = express.Router();
const Court = require("../models/Court");
const { generateTimeSlots } = require("../utils/slotGenerator");

router.post("/", async (req, res) => {
  try {
    const {
      name,
      sportType,
      pricePerHour,
      location,
      availability
    } = req.body;

    if (!availability || typeof availability !== "object") {
      return res.status(400).json({
        message: "availability must be an object with startDate, endDate, startTime, endTime"
      });
    }
    
    const {
      startDate,
      endDate,
      startTime,
      endTime
    } = availability;

    if (!startDate || !endDate || !startTime || !endTime) {
      return res.status(400).json({
        message: "startDate, endDate, startTime, endTime are required"
      });
    }

    // 🔹 STEP 1: GENERATE DATE LIST (YOUR CODE GOES HERE)
    const dates = [];
    let currentDate = new Date(startDate);
    const lastDate = new Date(endDate);

    while (currentDate <= lastDate) {
      dates.push(currentDate.toISOString().split("T")[0]);
      currentDate.setDate(currentDate.getDate() + 1);
    }

    // 🔹 STEP 2: GENERATE SLOTS FOR EACH DATE
    const availableSlots = dates.map((date) => ({
      date,
      slots: generateTimeSlots(startTime, endTime)
    }));

    // 🔹 STEP 3: CREATE COURT
    const court = await Court.create({
      ownerId: req.body.ownerId, // later from auth middleware
      name,
      sportType,
      location,
      pricePerHour,
      availableSlots
    });

    res.json({
      success: true,
      court
    });
  } catch (err) {
    console.error("Create court error:", err);
    res.status(500).json({ message: "Failed to create court" });
  }
});

module.exports = router;