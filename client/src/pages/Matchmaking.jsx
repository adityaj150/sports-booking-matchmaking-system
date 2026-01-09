import { useEffect, useRef, useState } from "react";
import socket from "../socket/socket";

const Matchmaking = () => {
  const [status, setStatus] = useState("");
  const userIdRef = useRef(crypto.randomUUID());

  const handleFindMatch = () => {
    setStatus("Waiting for another player...");
  
    socket.emit("find_match", {
      userId: userIdRef.current,
      sportType: "Badminton",
      skillLevel: "Intermediate",
      preferredDate: "2026-01-10",
      preferredTimeSlot: "18:00"
    });
  };


  useEffect(() => {
    const onWaiting = (data) => {
      console.log("⏳ waiting received:", data);
      setStatus(data.message);
    };

    const onMatchFound = () => {
      console.log("🎉 match_found received");
      setStatus("🎉 Match found!");
    };

    socket.on("waiting", onWaiting);
    socket.on("match_found", onMatchFound);

    return () => {
      socket.off("waiting", onWaiting);
      socket.off("match_found", onMatchFound);
    };
  }, []);

  return (
    <div style={{ padding: "40px" }}>
      <h2>Find a Player</h2>
      <button onClick={handleFindMatch}>Find Match</button>
      <p>{status}</p>
    </div>
  );
};

export default Matchmaking;
