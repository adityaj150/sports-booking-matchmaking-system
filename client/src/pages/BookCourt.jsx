import { useState } from "react";
const userId =
  sessionStorage.getItem("userId") || "test-user-booking";
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

  const handleBooking = async () => {
    if (!selectedCourt || !date || !slot) {
      alert("Please select court, date and time slot");
      return;
    }
  
    try {
      const res = await fetch("http://localhost:5000/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          courtId: selectedCourt.id,
          userId,
          sportType: selectedCourt.sportType,
          date,
          timeSlot: slot
        })
      });
  
      const data = await res.json();
  
      if (data.success) {
        alert("✅ Booking Confirmed!");
      } else {
        alert("❌ Booking failed");
      }
    } catch (err) {
      console.error(err);
      alert("Server error");
    }
  };


  return (
    <div style={styles.container}>
      <h2>👥 Book a Court</h2>

      {/* COURT LIST */}
      <h3>Select Court</h3>
      <div style={styles.courtList}>
        {dummyCourts.map((court) => (
          <div
            key={court.id}
            style={{
              ...styles.courtCard,
              border:
                selectedCourt?.id === court.id
                  ? "2px solid #4CAF50"
                  : "1px solid #ddd"
            }}
            onClick={() => setSelectedCourt(court)}
          >
            <h4>{court.name}</h4>
            <p>{court.location}</p>
            <p>₹{court.price} / hour</p>
          </div>
        ))}
      </div>

      {/* DATE */}
      <h3>Select Date</h3>
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />

      {/* TIME SLOT */}
      <h3>Select Time Slot</h3>
      <div style={styles.slotList}>
        {timeSlots.map((t) => (
          <button
            key={t}
            style={{
              ...styles.slotBtn,
              backgroundColor: slot === t ? "#4CAF50" : "#f0f0f0",
              color: slot === t ? "#fff" : "#000"
            }}
            onClick={() => setSlot(t)}
          >
            {t}
          </button>
        ))}
      </div>

      {/* BOOK BUTTON */}
      <button style={styles.bookBtn} onClick={handleBooking}>
        Book Court
      </button>
    </div>
  );
};

const styles = {
  container: {
    padding: "40px",
    maxWidth: "800px",
    margin: "auto"
  },
  courtList: {
    display: "flex",
    gap: "20px",
    marginBottom: "20px"
  },
  courtCard: {
    padding: "15px",
    borderRadius: "8px",
    cursor: "pointer",
    width: "200px"
  },
  slotList: {
    display: "flex",
    gap: "10px",
    marginBottom: "20px",
    flexWrap: "wrap"
  },
  slotBtn: {
    padding: "10px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer"
  },
  bookBtn: {
    padding: "12px 20px",
    fontSize: "16px",
    backgroundColor: "#000",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer"
  }
};

export default BookCourt;
