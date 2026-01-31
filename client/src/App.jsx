import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Matchmaking from "./pages/Matchmaking";
import BookCourt from "./pages/BookCourt";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Layout from "./components/Layout";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Layout><Login /></Layout>} />
      <Route path="/signup" element={<Layout><Signup /></Layout>} />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Layout>
              <Home />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/matchmaking"
        element={
          <ProtectedRoute>
            <Layout>
              <Matchmaking />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/book-court"
        element={
          <ProtectedRoute>
            <Layout>
              <BookCourt />
            </Layout>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
