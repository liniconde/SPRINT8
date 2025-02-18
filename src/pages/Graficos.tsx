import MapsTable from "../components/MapsTable";

const Graficos: React.FC = () => {
  return (
    <div className="flex flex-col items-center min-h-screen p-6">
      <h1 className="text-5xl font-title text-primary text-center mb-4">
        Estadísticas y Gráficos de Conciertos
      </h1>
      <p className="text-lg text-gray-700 text-center max-w-2xl mb-8">
        Visualiza datos de los conciertos en Barcelona con tablas y gráficos
        interactivos.
      </p>

      {/* Agregamos la tabla de conciertos */}
      <MapsTable />
    </div>
  );
};

export default Graficos;
