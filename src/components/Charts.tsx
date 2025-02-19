import { Bar, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
} from "chart.js";
import { useState, useEffect } from "react";
import { getConcerts } from "../services/concertService"; // Llamada al backend

// Registrar los componentes necesarios de Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Charts: React.FC = () => {
  const [concertData, setConcertData] = useState<
    { date: string; attendance: number }[]
  >([]);

  useEffect(() => {
    // Simulación de datos desde el backend OJO AQUÍ MIRAR PARA COLOCAR LOS DATOS REALES DEL BACKEND/
    getConcerts().then((data) => {
      const formattedData = data.map((concert: any) => ({
        date: new Date(concert.date).toLocaleDateString(),
        attendance: Math.floor(Math.random() * 500) + 50, // Simulación de asistentes
      }));
      setConcertData(formattedData);
    });
  }, []);

  // Datos para el gráfico de barras (Asistencia por fecha)
  const barData = {
    labels: concertData.map((c) => c.date),
    datasets: [
      {
        label: "Asistencia",
        data: concertData.map((c) => c.attendance),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
    ],
  };

  // Datos para el gráfico de línea (Tendencia de asistencia)
  const lineData = {
    labels: concertData.map((c) => c.date),
    datasets: [
      {
        label: "Tendencia de Asistencia",
        data: concertData.map((c) => c.attendance),
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 2,
        fill: false,
      },
    ],
  };

  return (
    <div className="flex flex-col items-center w-full max-w-4xl">
      <h2 className="text-3xl font-title text-gray-900 text-center mb-6">
        📊 Estadísticas de Conciertos
      </h2>

      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Gráfico de barras */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-bold text-gray-800 mb-4">
            Asistencia por Fecha
          </h3>
          <Bar data={barData} />
        </div>

        {/* Gráfico de líneas */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-bold text-gray-800 mb-4">
            Tendencia de Asistencia
          </h3>
          <Line data={lineData} />
        </div>
      </div>
    </div>
  );
};

export default Charts;
