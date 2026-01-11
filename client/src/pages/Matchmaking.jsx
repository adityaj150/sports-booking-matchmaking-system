import { useEffect, useRef, useState } from "react";
import socket from "../socket/socket";

const Matchmaking = () => {
  const [sportType, setSportType] = useState("Badminton");
  const [skillLevel, setSkillLevel] = useState("Intermediate");
  const [date, setDate] = useState("");
  const [timeSlot, setTimeSlot] = useState("");
  const [status, setStatus] = useState("");
  const [searching, setSearching] = useState(false);
  const [booking, setBooking] = useState(null);

  const userIdRef = useRef(
    localStorage.getItem("userId") ||
      (() => {
        const id = "user-" + Math.random().toString(36).slice(2, 8);
        localStorage.setItem("userId", id);
        return id;
      })()
  );

  const handleFindMatch = () => {
    if (!date || !timeSlot) {
      alert("Please select date and time");
      return;
    }

    setSearching(true);
    setStatus("Searching for a player...");

    socket.emit("find_match", {
      userId: userIdRef.current,
      sportType,
      skillLevel,
      preferredDate: date,
      preferredTimeSlot: timeSlot
    });
  };

  useEffect(() => {
    const onWaiting = (data) => {
      setStatus(data.message);
    };

    const onMatchFound = (data) => {
      setBooking(data.booking);
      setStatus("🎉 Match Found! Booking Confirmed");
      setSearching(false);
    };

    socket.on("waiting", onWaiting);
    socket.on("match_found", onMatchFound);

    return () => {
      socket.off("waiting", onWaiting);
      socket.off("match_found", onMatchFound);
    };
  }, []);

  return (
    <div style={styles.container}>
      <h2>🤝 Find Players & Book Together</h2>

      {!booking && (
        <>
          {/* FORM */}
          <div style={styles.form}>
            <label>
              Sport
              <select
                value={sportType}
                onChange={(e) => setSportType(e.target.value)}
              >
                <option>Badminton</option>
                <option>Football</option>
                <option>Pickleball</option>
              </select>
            </label>

            <label>
              Skill Level
              <select
                value={skillLevel}
                onChange={(e) => setSkillLevel(e.target.value)}
              >
                <option>Beginner</option>
                <option>Intermediate</option>
                <option>Pro</option>
              </select>
            </label>

            <label>
              Date
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </label>

            <label>
              Time Slot
              <input
                type="time"
                value={timeSlot}
                onChange={(e) => setTimeSlot(e.target.value)}
              />
            </label>
          </div>

          <button
            style={styles.findBtn}
            onClick={handleFindMatch}
            disabled={searching}
          >
            {searching ? "Searching..." : "Find Match"}
          </button>

          <p style={styles.status}>{status}</p>
        </>
      )}

      {/* MATCH FOUND CARD */}
      {booking && (
        <div style={styles.card}>
          <h3>✅ Booking Confirmed</h3>
          <p><strong>Sport:</strong> {booking.sportType}</p>
          <p><strong>Date:</strong> {booking.date}</p>
          <p><strong>Time:</strong> {booking.timeSlot}</p>
          <p><strong>Players:</strong> {booking.players.join(", ")}</p>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: "40px",
    maxWidth: "700px",
    margin: "auto"
  },
  form: {
    display: "grid",
    gap: "15px",
    marginBottom: "20px"
  },
  findBtn: {
    padding: "12px",
    fontSize: "16px",
    backgroundColor: "#000",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer"
  },
  status: {
    marginTop: "10px",
    color: "#555"
  },
  card: {
    marginTop: "30px",
    padding: "20px",
    border: "2px solid #4CAF50",
    borderRadius: "8px",
    backgroundColor: "#f9fff9"
  }
};

export default Matchmaking;
