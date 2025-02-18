import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Carousel from "../components/Carousel";
import EventCard from "../components/EventCard";
import { getConcerts } from "../services/concertService"; // 🔹 Importar el servicio que hace la petición

import img1 from "../assets/img/concert5.jpg";
import img2 from "../assets/img/concert2.jpg";
import img3 from "../assets/img/concert4.jpg";

const images = [img1, img2, img3];

interface Concert {
  _id: string;
  name: string;
  description: string;
  date: string;
  imageUrl?: string;
  location: { latitude: number; longitude: number; venue: string };
}

const Home: React.FC = () => {
  const [events, setEvents] = useState<Concert[]>([]); // 🔹 Estado para los eventos obtenidos del backend
  const [visibleEvents, setVisibleEvents] = useState(2); // 🔹 Estado para controlar cuántos eventos se ven

  useEffect(() => {
    getConcerts().then((data: Concert[]) => {
      console.log("Datos recibidos en Home:", data); // 🔹 Verifica qué llega al frontend

      const validConcerts = data.filter(
        (concert: Concert) =>
          concert.location &&
          concert.location.latitude &&
          concert.location.longitude
      );

      console.log("Eventos válidos en Home:", validConcerts); // 🔹 Verifica si el filtro funciona

      setEvents(validConcerts);
    });
  }, []);
  console.log("Eventos en Home:", events); // 🔹 Verifica si los eventos se guardan en el estado

  return (
    <div className="flex flex-col items-center min-h-screen p-6">
      {/* Sección de bienvenida con animación */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-5xl text-center text-gray-900 mb-6 leading-tight"
      >
        Bienvenido a la <br />
        <span className="text-gray-700">Ruta de Conciertos Clásicos</span>
        <br /> en Barcelona
      </motion.h1>

      <p className="text-lg text-gray-700 text-center max-w-2xl mb-8">
        Descubre y planifica los mejores conciertos de música clásica en la
        ciudad. Explora eventos, mapas y calendarios de forma sencilla e
        intuitiva.
      </p>

      {/* Carrusel */}
      <div className="w-full max-w-4xl">
        <Carousel images={images} title="Próximos Conciertos" />
      </div>

      {/* Contenedor de Tarjetas con Degradado */}
      <div
        className="w-full max-w mt-12 p-6 rounded-lg shadow-lg"
        style={{
          background: "linear-gradient(135deg, #D1C4E9, #FFFFFF, #BBDEFB)",
        }}
      >
        <h2 className="text-3xl font-title text-gray-900 text-center mb-6">
          🎟️ Eventos Destacados
        </h2>

        {/* Tarjetas de eventos */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {events.slice(0, visibleEvents).map((event) => (
            <EventCard
              key={event._id}
              title={event.name}
              description={event.description || "Sin descripción"}
              date={event.date}
              imageUrl={event.imageUrl || "/images/default.jpg"}
              location={event.location.venue || "Ubicación desconocida"}
            />
          ))}
        </div>

        {/* Botón para cargar más eventos */}
        {visibleEvents < events.length && (
          <motion.button
            onClick={() => setVisibleEvents(events.length)} // 🔹 Muestra todos los eventos
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="block mt-8 mx-auto bg-gray-800 text-white py-3 px-6 rounded-lg text-lg font-semibold shadow-lg hover:bg-gray-900 transition-all text-center"
          >
            Ver más eventos
          </motion.button>
        )}

        {/* Botón de acción principal debajo de las tarjetas */}
        <motion.a
          href="/mapa"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="block mt-8 mx-auto bg-gray-800 text-white py-3 px-6 rounded-lg text-lg font-semibold shadow-lg hover:bg-gray-900 transition-all text-center w-fit"
        >
          Explorar Conciertos
        </motion.a>
      </div>
    </div>
  );
};

export default Home;
