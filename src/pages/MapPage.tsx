import { useEffect, useState } from "react";
import MapComponent from "../components/MapComponent";
import EventCard from "../components/EventCard";
import { getConcerts } from "../services/concertService";

interface Concert {
  _id: string;
  name: string;
  description: string;
  date: string;
  imageUrl?: string;
  location: { latitude: number; longitude: number; venue: string };
}

// 🔹 Función para determinar la estación del año según la fecha
const getSeason = (dateString: string) => {
  const date = new Date(dateString);
  const month = date.getMonth() + 1;
  if (month >= 3 && month <= 5) return "Primavera";
  if (month >= 6 && month <= 8) return "Verano";
  if (month >= 9 && month <= 11) return "Otoño";
  return "Invierno";
};

const MapPage: React.FC = () => {
  const [concerts, setConcerts] = useState<Concert[]>([]);
  const [selectedConcert, setSelectedConcert] = useState<Concert | null>(null);
  const [seasonFilter, setSeasonFilter] = useState<string>(""); // 🔹 Estado del filtro de estaciones

  useEffect(() => {
    console.log("📡 Solicitando datos del backend...");
    getConcerts().then((data) => {
      const validConcerts = data.filter(
        (concert: Concert) =>
          concert.location &&
          concert.location.latitude &&
          concert.location.longitude
      );

      // 🔹 Aplicar filtro por estación
      const filteredConcerts =
        seasonFilter === ""
          ? validConcerts
          : validConcerts.filter(
              (concert: { date: string }) =>
                getSeason(concert.date) === seasonFilter
            );

      setConcerts(filteredConcerts);
    });
  }, [seasonFilter]); // 🔹 Se ejecuta cuando cambia la estación seleccionada

  return (
    <div className="flex flex-col items-center min-h-screen p-6">
      <h1 className="text-4xl font-title text-primary mb-4">
        Mapa de Conciertos
      </h1>
      <p className="text-gray-700 mb-6">
        Explora los conciertos más importantes de la ciudad. Haz clic en un
        evento para más detalles.
      </p>

      {/* 🔹 Selector de filtro */}
      <div className="mb-4">
        <label className="text-lg font-semibold text-gray-700 mr-2">
          Filtrar por estación:
        </label>
        <select
          className="border border-gray-400 p-2 rounded"
          value={seasonFilter}
          onChange={(e) => setSeasonFilter(e.target.value)}
        >
          <option value="">Todas</option>
          <option value="Primavera">🌸 Primavera</option>
          <option value="Verano">☀️ Verano</option>
          <option value="Otoño">🍂 Otoño</option>
          <option value="Invierno">❄️ Invierno</option>
        </select>
      </div>

      {/* Contenedor en dos columnas */}
      <div className="flex flex-col lg:flex-row w-full max-w-7xl h-[80vh] gap-6">
        {/* Mapa en la izquierda */}
        <div className="flex-1 h-full">
          <MapComponent concerts={concerts} selectedConcert={selectedConcert} />
        </div>

        {/* Tarjetas de eventos en la derecha */}
        <div className="w-full lg:w-1/3 h-full overflow-y-auto rounded-lg p-4">
          <h2 className="text-2xl font-title text-primary mb-4">
            Eventos Cercanos
          </h2>
          <div className="flex flex-col gap-4">
            {concerts.map((concert) => (
              <EventCard
                key={concert._id}
                title={concert.name}
                description={concert.description || "Sin descripción"}
                date={concert.date}
                imageUrl={concert.imageUrl || "/images/default.jpg"}
                location={concert.location.venue}
                onClick={() => setSelectedConcert(concert)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapPage;
