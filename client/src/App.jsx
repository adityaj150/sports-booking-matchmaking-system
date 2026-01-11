import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Matchmaking from "./pages/Matchmaking";
import BookCourt from "./pages/BookCourt";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

function App() {
  return (
    <Routes>
      {/* <Route path="/" element={<Home />} />
      <Route path="/matchmaking" element={<Matchmaking />} />
      <Route path="/book-court" element={<BookCourt />} /> */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />
      <Route
        path="/matchmaking"
        element={
          <ProtectedRoute>
            <Matchmaking />
          </ProtectedRoute>
        }
      />
      <Route
        path="/book-court"
        element={
          <ProtectedRoute>
            <BookCourt />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
