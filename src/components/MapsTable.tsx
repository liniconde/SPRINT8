import { useEffect, useState } from "react";
import axios from "axios";

interface Concert {
  _id: string;
  name: string;
  ensemble: string;
  repertoire: string[];
  date: string;
  location: { latitude: number; longitude: number };
  venue: string;
  ticketPrice: number;
}

const MapTable: React.FC = () => {
  const [concerts, setConcerts] = useState<Concert[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Obtener datos del backend
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}`)
      .then((response) => {
        setConcerts(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Error fetching concerts");
        setLoading(false);
      });
  }, []);

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold text-center mb-4 text-primary">
        Conciertos en Barcelona
      </h2>

      {loading && <p className="text-center">Cargando conciertos...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      <div className="overflow-x-auto">
        <table className="min-w-ful border border-gray-200 shadow-md rounded-lg">
          <thead className="">
            <tr>
              <th className="px-4 py-2 text-left">Nombre</th>
              <th className="px-4 py-2 text-left">Ensamble</th>
              <th className="px-4 py-2 text-left">Repertorio</th>
              <th className="px-4 py-2 text-left">Fecha</th>
              <th className="px-4 py-2 text-left">Ubicación</th>
              <th className="px-4 py-2 text-left">Precio</th>
              <th className="px-4 py-2 text-left">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {concerts.map((concert) => (
              <tr key={concert._id} className="border-t">
                <td className="px-4 py-2">{concert.name}</td>
                <td className="px-4 py-2">{concert.ensemble}</td>
                <td className="px-4 py-2">{concert.repertoire.join(", ")}</td>
                <td className="px-4 py-2">
                  {new Date(concert.date).toLocaleString()}
                </td>
                <td className="px-4 py-2">
                  {concert.location.latitude}, {concert.location.longitude}
                </td>
                <td className="px-4 py-2">€{concert.ticketPrice}</td>
                <td className="px-4 py-2 flex space-x-2">
                  <button className="bg-blue-500 text-gray-600 px-3 py-1 rounded">
                    Editar
                  </button>
                  <button className="bg-red-500 text-gray-600 px-3 py-1 rounded">
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MapTable;
