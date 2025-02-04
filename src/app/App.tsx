import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "../components/Navbar";
import Hombre from "../pages/Hombre";
import Mapa from "../pages/Mapa";
import FullCalendar from "../pages/FullCalendar";
import Graficos from "../pages/Graficos";

const App: React.FC = () => {
  return (
    <Router>
      <Navbar />
      <div className="container mx-auto mt-6">
        <Routes>
          <Route path="/" element={<Hombre />} />
          <Route path="/mapa" element={<Mapa />} />
          <Route path="/fullcalendar" element={<FullCalendar />} />
          <Route path="/graficos" element={<Graficos />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
