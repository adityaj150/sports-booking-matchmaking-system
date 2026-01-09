require("dotenv").config();
const { findMatch } = require("./services/matchmakingService");

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

// Connect Database
connectDB();

// Socket.io setup
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"]
  }
});

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("find_match", async (data) => {
    try {
      const match = await findMatch({
        ...data,
        socketId: socket.id
      });

      if (match) {
        // Notify both users
        socket.emit("match_found", { partnerId: match.userId });
        io.to(match.socketId).emit("match_found", {
          partnerId: data.userId
        });
      } else {
        socket.emit("waiting", {
          message: "Waiting for another player..."
        });
      }
    } catch (error) {
      console.error("Matchmaking error:", error);
    }
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});


// Start server
server.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
