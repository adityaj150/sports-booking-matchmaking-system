import dotenv from "dotenv";
dotenv.config();
import express from "express";
import http from "http";
import cors from "cors";
import { Server } from "socket.io";
import connectDB from "./config/db.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import courtRoutes from "./routes/courtRoutes.js";
import { findMatch } from "./services/matchmakingService.js";
import { createMatchmakingBooking } from "./services/bookingservice.js";

import feedbackRoutes from "./routes/feedbackRoutes.js";

const app = express();
const server = http.createServer(app);

// Middleware
app.use(cors({
  origin: process.env.CLIENT_URL || "http://localhost:5173",
  credentials: true
}));
app.use(express.json());

app.use("/api/bookings", bookingRoutes);
app.use("/api/users", userRoutes);
app.use("/api/courts", courtRoutes);
app.use("/api/feedback", feedbackRoutes);

// Connect Database
connectDB();

// Socket.io setup
const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true
  }
});


io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("find_match", async (data) => {
    console.log("📥 find_match from:", socket.id, data.userId);

    const match = await findMatch({
      ...data,
      socketId: socket.id
    });

    if (match) {
      const booking = await createMatchmakingBooking({
        userA: data.userId,
        userB: match.userId,
        sportType: data.sportType,
        date: data.preferredDate,
        timeSlot: data.preferredTimeSlot
      });

      socket.emit("match_found", {
        booking
      });

      io.to(match.socketId).emit("match_found", {
        booking
      });

    } else {
      socket.emit("waiting", {
        message: "Waiting for another player..."
      });
    }

  });


  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});


const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

