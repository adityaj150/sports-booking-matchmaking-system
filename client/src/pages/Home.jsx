import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div style={styles.page}>
      <h1>🏟️ SportsHub</h1>
      <p style={styles.subtitle}>
        Book courts or find players to play with
      </p>

      <div style={styles.cardContainer}>
        {/* BOOK COURT */}
        <div className="card" style={styles.card}>
          <h2>👥 Book a Court</h2>
          <p>
            Already have players?<br />
            Quickly book a court for your game.
          </p>
          <button
            className="primary-btn"
            onClick={() => navigate("/book-court")}
          >
            Book Court
          </button>
        </div>

        {/* MATCHMAKING */}
        <div className="card" style={styles.card}>
          <h2>🤝 Find Players</h2>
          <p>
            Playing solo?<br />
            We’ll match you with players and book automatically.
          </p>
          <button
            className="secondary-btn"
            onClick={() => navigate("/matchmaking")}
          >
            Find Players
          </button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  page: {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px"
  },
  subtitle: {
    marginBottom: "40px",
    color: "#555",
    fontSize: "16px"
  },
  cardContainer: {
    display: "flex",
    gap: "30px",
    flexWrap: "wrap"
  },
  card: {
    width: "260px",
    textAlign: "center"
  }
};

export default Home;
