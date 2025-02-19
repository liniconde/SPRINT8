import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "../components/Navbar";
import Hombre from "../pages/Home";
import Mapa from "../pages/MapPage";
import FullCalendar from "../pages/FullCalendar";
import ChartsPage from "../pages/ChartsPage";

const App: React.FC = () => {
  return (
    <Router>
      <Navbar />
      <div className="container mx-auto mt-6">
        <Routes>
          <Route path="/" element={<Hombre />} />
          <Route path="/mapa" element={<Mapa />} />
          <Route path="/fullcalendar" element={<FullCalendar />} />
          <Route path="/charts" element={<ChartsPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
