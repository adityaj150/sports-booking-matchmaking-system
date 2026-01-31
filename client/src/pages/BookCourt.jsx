import { useState } from "react";
import { useAuth } from "../context/AuthContext";

const dummyCourts = [
  {
    id: 1,
    name: "Smash Arena",
    sportType: "Badminton",
    location: "Pune",
    price: 400
  },
  {
    id: 2,
    name: "Ace Sports Club",
    sportType: "Badminton",
    location: "Pune",
    price: 500
  }
];

const timeSlots = [
  "06:00 - 07:00",
  "07:00 - 08:00",
  "18:00 - 19:00",
  "19:00 - 20:00"
];

const BookCourt = () => {
  const [selectedCourt, setSelectedCourt] = useState(null);
  const [date, setDate] = useState("");
  const [slot, setSlot] = useState("");
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleBooking = async () => {
    if (!user) {
      alert("Please login again");
      return;
    }
    if (!selectedCourt || !date || !slot) {
      alert("Please select court, date and time slot");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          courtId: selectedCourt.id,
          userId: user.uid,
          sportType: selectedCourt.sportType,
          date,
          timeSlot: slot
        })
      });

      const data = await res.json();

      if (data.success) {
        alert("✅ Booking Confirmed!");
        // Reset
        setSelectedCourt(null);
        setDate("");
        setSlot("");
      } else {
        alert("❌ Booking failed: " + (data.message || "Unknown error"));
      }
    } catch (err) {
      console.error(err);
      alert("Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-extrabold text-white mb-8">
        Book a <span className="text-neon">Court</span>
      </h1>

      <div className="grid md:grid-cols-3 gap-8">
        {/* LEFT COLUMN: COURT SELECTION */}
        <div className="md:col-span-2 space-y-8">
          <section>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-full bg-neon text-black flex items-center justify-center font-bold">1</div>
              <h2 className="text-xl font-bold text-white">Select Court</h2>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {dummyCourts.map((court) => (
                <div
                  key={court.id}
                  onClick={() => setSelectedCourt(court)}
                  className={`p-6 rounded-xl border cursor-pointer transition-all ${selectedCourt?.id === court.id
                      ? "bg-neon/10 border-neon shadow-[0_0_15px_rgba(204,255,0,0.3)]"
                      : "bg-dark-card border-white/5 hover:border-white/20"
                    }`}
                >
                  <h4 className="text-lg font-bold text-white mb-2">{court.name}</h4>
                  <p className="text-gray-400 text-sm mb-4 flex items-center gap-2">
                    📍 {court.location}
                  </p>
                  <div className="flex justify-between items-center text-sm">
                    <span className="bg-white/10 px-2 py-1 rounded text-gray-300">{court.sportType}</span>
                    <span className="text-neon font-bold">₹{court.price}/hr</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-full bg-neon text-black flex items-center justify-center font-bold">2</div>
              <h2 className="text-xl font-bold text-white">Select Date & Time</h2>
            </div>

            <div className="bg-dark-card border border-white/5 rounded-xl p-6">
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-400 mb-2">Date</label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full bg-dark border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-neon transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Available Slots</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {timeSlots.map((t) => (
                    <button
                      key={t}
                      onClick={() => setSlot(t)}
                      className={`py-2 px-3 rounded-lg text-sm font-medium transition-all border ${slot === t
                          ? "bg-neon text-black border-neon"
                          : "bg-dark border-white/10 text-gray-300 hover:border-white/30"
                        }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* RIGHT COLUMN: SUMMARY */}
        <div className="md:col-span-1">
          <div className="bg-dark-card border border-white/10 rounded-xl p-6 sticky top-24">
            <h3 className="text-lg font-bold text-white mb-6 border-b border-white/10 pb-4">Booking Summary</h3>
            <div className="space-y-4 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-400">Court</span>
                <span className="text-white font-medium text-right">{selectedCourt?.name || "-"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Date</span>
                <span className="text-white font-medium text-right">{date || "-"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Time</span>
                <span className="text-white font-medium text-right">{slot || "-"}</span>
              </div>
              <div className="border-t border-white/10 my-4 pt-4 flex justify-between items-center">
                <span className="text-gray-300 font-bold">Total</span>
                <span className="text-2xl font-bold text-neon">₹{selectedCourt?.price || 0}</span>
              </div>
            </div>

            <button
              onClick={handleBooking}
              disabled={loading}
              className="w-full py-3 bg-neon text-black font-bold rounded-lg hover:bg-neon/90 transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Processing..." : "Confirm Booking"}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default BookCourt;
