const Mapa: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white">
      <h1 className="text-4xl font-bold text-green-600">Mapa</h1>
      <p className="text-lg text-gray-600 mt-4">
        Aquí podrás encontrar los mejores conciertos en Barcelona.
      </p>
      <div className="mt-6 p-4 border-gray-300 rounded-lg shadow-lg">
        <p className="text-gray-500">Mapa próximamente..</p>
      </div>
    </div>
  );
};

export default Mapa;
