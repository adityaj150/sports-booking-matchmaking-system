import express from "express";
const router = express.Router();
import User from "../models/User.js";

// Create or fetch user from Firebase UID
router.post("/sync", async (req, res) => {
  try {
    const { firebaseUid, email } = req.body;

    if (!firebaseUid || !email) {
      return res.status(400).json({ message: "Missing user data" });
    }

    let user = await User.findOne({ firebaseUid });

    if (!user) {
      user = await User.create({
        firebaseUid,
        email
      });
    }

    res.json(user);
  } catch (err) {
    console.error("User sync error:", err);
    res.status(500).json({ message: "User sync failed" });
  }
});

export default router;
