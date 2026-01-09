import socket from "../socket/socket";

export const findMatch = (matchData) => {
  console.log("📤 Emitting find_match:", matchData);
  socket.emit("find_match", matchData);
};

export const onMatchFound = (callback) => {
  socket.on("match_found", callback);
};

export const onWaiting = (callback) => {
  socket.on("waiting", callback);
};
