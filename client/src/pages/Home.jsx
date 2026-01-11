import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";

const Home = () => {
  const navigate = useNavigate();
  const user = auth.currentUser;

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  return (
    <div style={styles.page}>
      {/* TOP RIGHT AUTH ACTIONS */}
      <div style={{ position: "absolute", top: 20, right: 20 }}>
        {user ? (
          <>
            <span style={{ marginRight: "10px", fontSize: "14px" }}>
              {user.email}
            </span>
            <button className="secondary-btn" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <button
              className="secondary-btn"
              onClick={() => navigate("/login")}
              style={{ marginRight: "10px" }}
            >
              Login
            </button>

            <button
              className="primary-btn"
              onClick={() => navigate("/signup")}
            >
              Sign Up
            </button>
          </>
        )}
      </div>

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
    padding: "20px",
    position: "relative"
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
