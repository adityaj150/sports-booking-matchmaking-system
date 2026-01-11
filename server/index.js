require("dotenv").config();
const { findMatch } = require("./services/matchmakingService");
const { createMatchmakingBooking } = require("./services/bookingservice");
const bookingRoutes = require("./routes/bookingRoutes");
const express = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
const connectDB = require("./config/db");

const app = express();
const server = http.createServer(app);

// Middleware
app.use(cors());
app.use(express.json());
app.use("/api/bookings", bookingRoutes);
// Connect Database
connectDB();

// Socket.io setup
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true
  }
});


io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

//   socket.on("find_match", async (data) => {
//     console.log("find_match received:", data);
//     try {
//       const match = await findMatch({
//         ...data,
//         socketId: socket.id
//       });

//     if (match) {
//       socket.emit("match_found", { partnerId: match.userId });
//       io.to(match.socketId).emit("match_found", {
//         partnerId: data.userId
//       });
//     }

//     } catch (error) {
//       console.error("Matchmaking error:", error);
//     }
//   });
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

  } 
  else {
  socket.emit("waiting", {
    message: "Waiting for another player..."
  });
  }

});


  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});


server.listen(process.env.PORT || 5000, () => {
  console.log(`Server running on port ${process.env.PORT || 5000}`);
});

