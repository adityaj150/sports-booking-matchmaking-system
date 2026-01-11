import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Matchmaking from "./pages/Matchmaking";
import BookCourt from "./pages/BookCourt";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/matchmaking" element={<Matchmaking />} />
      <Route path="/book-court" element={<BookCourt />} />
    </Routes>
  );
}

export default App;
