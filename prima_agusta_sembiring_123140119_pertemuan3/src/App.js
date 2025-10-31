import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { BookProvider } from "./context/BookContext";
import Home from "./pages/Home";
import Stats from "./pages/Stats";
import "./App.css";

export default function App() {
  return (
    <BookProvider>
      <Router>
        <nav>
          <div className="logo">Pencatatan Buku</div>
          <div className="links">
            <Link to="/">Beranda</Link>
            <Link to="/stats">Statistik</Link>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/stats" element={<Stats />} />
        </Routes>
      </Router>
    </BookProvider>
  );
}
