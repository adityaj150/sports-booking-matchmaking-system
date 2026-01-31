import express from "express";
const router = express.Router();
import User from "../models/User.js";
import authMiddleware from "../middlewares/authMiddleware.js";

// Rate a player
router.post("/rate", authMiddleware, async (req, res) => {
    try {
        const { targetUserId, rating, reliability } = req.body;
        // rating: 1-5 stars? Or direct ELO adjustment?
        // User asked: "give you a rating based on how you played so next time you will get players who are close with your rating"
        // So this should adjust the skillRating. simple ELO-like adjustment: 
        // If positive rating, increase score. If negative, decrease.
        // Or just "Thumbs up/down". 
        // Let's assume 1-5 stars. 5 = +25, 4 = +10, 3 = 0, 2 = -10, 1 = -25.

        if (!targetUserId || !rating) {
            return res.status(400).json({ message: "Missing data" });
        }

        const targetUser = await User.findOne({ firebaseUid: targetUserId });
        if (!targetUser) {
            return res.status(404).json({ message: "User not found" });
        }

        let points = 0;
        if (rating === 5) points = 25;
        if (rating === 4) points = 10;
        if (rating === 3) points = 0;
        if (rating === 2) points = -10;
        if (rating === 1) points = -25;

        targetUser.skillRating = Math.max(0, (targetUser.skillRating || 1000) + points);

        // Reliability
        if (reliability !== undefined) {
            // reliability: 1 (bad) to 5 (good)
            // Adjust reliabilityScore
            const relPoints = (reliability - 3) * 5; // 5->10, 4->5, 3->0, 2->-5, 1->-10
            targetUser.reliabilityScore = Math.min(100, Math.max(0, (targetUser.reliabilityScore || 100) + relPoints));
        }

        // Add XP for rating (gamification)
        targetUser.xp = (targetUser.xp || 0) + 10;

        await targetUser.save();

        res.json({ success: true, newRating: targetUser.skillRating });
    } catch (error) {
        console.error("Rating error:", error);
        res.status(500).json({ message: "Rating failed" });
    }
});

export default router;
