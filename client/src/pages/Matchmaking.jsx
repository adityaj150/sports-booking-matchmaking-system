import { useEffect, useRef, useState } from "react";
import socket from "../socket/socket";
import { useAuth } from "../context/AuthContext";
import FeedbackModal from "../components/FeedbackModal";

const Matchmaking = () => {
  const [sportType, setSportType] = useState("Badminton");
  const [skillLevel, setSkillLevel] = useState("Intermediate");
  // Default to today/tomorrow, or just empty
  const [date, setDate] = useState("");
  const [timeSlot, setTimeSlot] = useState("");
  const [status, setStatus] = useState("");
  const [searching, setSearching] = useState(false);
  const [booking, setBooking] = useState(null);
  const { user } = useAuth();

  const [showFeedback, setShowFeedback] = useState(false);

  const handleFeedbackSubmit = async ({ rating, reliability }) => {
    try {
      if (!booking) return;
      // Identify opponent: In booking.players, finding the one that is NOT me.
      const opponentId = booking.players.find(id => id !== user.uid);
      if (!opponentId) {
        alert("No opponent found to rate.");
        return;
      }

      const token = await user.getIdToken();
      const res = await fetch("http://localhost:5000/api/feedback/rate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          targetUserId: opponentId,
          rating,
          reliability
        })
      });

      const data = await res.json();
      if (data.success) {
        alert("Feedback submitted! XP Earned!");
        setShowFeedback(false);
        setBooking(null); // Clear booking to start over
        setStatus("");
      } else {
        alert("Failed to submit feedback");
      }
    } catch (err) {
      console.error(err);
      alert("Error submitting feedback");
    }
  };

  const handleFindMatch = () => {
    if (!user) {
      alert("Please login again");
      return;
    }
    if (!date || !timeSlot) {
      alert("Please select date and time");
      return;
    }

    setSearching(true);
    setStatus("Searching for a player...");

    socket.emit("find_match", {
      userId: user.uid, // Firebase UID
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
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-extrabold text-white mb-8 text-center">
        Match<span className="text-neon">Making</span>
      </h1>

      {!booking && (
        <div className="bg-dark-card border border-white/5 rounded-2xl p-8 shadow-xl">
          <div className="grid gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Sport</label>
              <select
                value={sportType}
                onChange={(e) => setSportType(e.target.value)}
                className="w-full bg-dark border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-neon transition-colors"
              >
                <option>Badminton</option>
                <option>Football</option>
                <option>Pickleball</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Skill Level</label>
              <select
                value={skillLevel}
                onChange={(e) => setSkillLevel(e.target.value)}
                className="w-full bg-dark border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-neon transition-colors"
                disabled // We will use rating system later, for now keep it selectable or locked? User requests gamification/rating. 
              // Implementation Plan said: "Update logic to find matches within a specific rating range".
              // I should probably disable this and infer from user profile later, but for now let's keep it manual as MVP step.
              >
                <option>Beginner</option>
                <option>Intermediate</option>
                <option>Pro</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Date</label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full bg-dark border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-neon transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Time Slot</label>
                <input
                  type="time"
                  value={timeSlot}
                  onChange={(e) => setTimeSlot(e.target.value)}
                  className="w-full bg-dark border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-neon transition-colors"
                />
              </div>
            </div>

            <button
              onClick={handleFindMatch}
              disabled={searching}
              className={`w-full py-4 rounded-lg font-bold text-lg transition-all flex items-center justify-center gap-2 ${searching
                ? "bg-gray-700 text-gray-400 cursor-not-allowed"
                : "bg-neon text-black hover:bg-neon/90 hover:scale-[1.02]"
                }`}
            >
              {searching ? (
                <>
                  <span className="animate-spin text-xl">⏳</span> Searching...
                </>
              ) : (
                "Find Match"
              )}
            </button>
          </div>

          {status && (
            <div className={`mt-6 text-center font-medium ${searching ? "text-neon animate-pulse" : "text-gray-400"}`}>
              {status}
            </div>
          )}
        </div>
      )}

      {/* MATCH FOUND CARD */}
      {booking && (
        <div className="bg-gradient-to-br from-gray-900 to-black border border-neon/30 rounded-2xl p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-neon/10 rounded-full blur-3xl -mr-16 -mt-16"></div>

          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-neon text-black rounded-full text-3xl mb-4">
              ✅
            </div>
            <h2 className="text-2xl font-bold text-white">Booking Confirmed!</h2>
            <p className="text-gray-400">Get ready for your game</p>
          </div>

          <div className="space-y-4 bg-white/5 rounded-xl p-6 border border-white/10">
            <div className="flex justify-between items-center border-b border-white/10 pb-2">
              <span className="text-gray-400">Sport</span>
              <span className="font-bold text-white">{booking.sportType}</span>
            </div>
            <div className="flex justify-between items-center border-b border-white/10 pb-2">
              <span className="text-gray-400">Date</span>
              <span className="font-bold text-white">{booking.date}</span>
            </div>
            <div className="flex justify-between items-center border-b border-white/10 pb-2">
              <span className="text-gray-400">Time</span>
              <span className="font-bold text-white">{booking.timeSlot}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Players</span>
              <span className="font-bold text-neon">{booking.players.length} Players</span>
            </div>
          </div>

          <button
            onClick={() => setShowFeedback(true)}
            className="w-full mt-6 bg-neon text-black font-bold py-3 rounded-lg hover:bg-neon/90 transition-all hover:scale-[1.02] mb-3"
          >
            Finish Game & Rate Player
          </button>

          <button
            onClick={() => setBooking(null)}
            className="w-full bg-white/10 hover:bg-white/20 text-white font-semibold py-3 rounded-lg transition-colors border border-white/10"
          >
            Find Another Match
          </button>
        </div>
      )}

      {/* FEEDBACK MODAL */}
      <FeedbackModal
        isOpen={showFeedback}
        onClose={() => setShowFeedback(false)}
        onSubmit={handleFeedbackSubmit}
        targetPlayerName="Opponent"
      />
    </div>
  );
};

export default Matchmaking;
