import React from "react";
import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
  return (
    <nav className=" bg-gradient-to-r from-blue-500 to-purple-600 shadow-lg p-4">
      <ul className="flex gap-6 text-white text-lg">
        <li>
          <Link to="/" className="hover:text-gray-400 transition duration-300">
            Hombre
          </Link>
        </li>
        <li>
          <Link
            to="/mapa"
            className="hover:text-gray-400 transition duration-300"
          >
            Mapa
          </Link>
        </li>
        <li>
          <Link
            to="/fullcalendar"
            className="hover:text-gray-400 transition duration-300"
          >
            FullCalendar
          </Link>
        </li>
        <li>
          <Link
            to="/graficos"
            className="hover:text-gray-400 transition duration-300"
          >
            Gráficos
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
