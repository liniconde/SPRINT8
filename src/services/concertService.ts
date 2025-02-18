import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api/concerts";

// Obtener todos los conciertos
export const getConcerts = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};
