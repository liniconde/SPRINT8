import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className=" w-full bg-violet-500 text-white py-4">
      <div className="container mx-auto flex justify-center space-x-8">
        <Link
          to="/"
          className="text-lg font-title hover:text-secondary transition"
        >
          Home
        </Link>
        <Link
          to="/mapa"
          className="text-lg font-title hover:text-secondary transition"
        >
          Mapa
        </Link>
        <Link
          to="/fullcalendar"
          className="text-lg font-title hover:text-secondary transition"
        >
          Full Calendar
        </Link>
        <Link
          to="/charts"
          className="text-lg font-title hover:text-secondary transition"
        >
          Gráficos
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
