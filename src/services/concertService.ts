import axios from "axios";

const viteUrl = import.meta.env.VITE_MAPBOX_TOKEN;

const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5001/api/concerts";

// Obtener todos los conciertos
export const getConcerts = async () => {
  console.log("vite url", viteUrl);
  const response = await axios.get(API_URL);
  return response.data;
};

export const updateConcert = async (id: string, updatedData: any) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, updatedData);
    return response.data;
  } catch (error) {
    console.error("❌ Error actualizando el concierto:", error);
  }
};
