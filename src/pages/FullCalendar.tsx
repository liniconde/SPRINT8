import { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
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

const FullCalendarPage: React.FC = () => {
  const [concerts, setConcerts] = useState<Concert[]>([]);
  const [events, setEvents] = useState<
    { id: string; title: string; start: string }[]
  >([]);

  useEffect(() => {
    getConcerts().then((data) => {
      const validConcerts = data.filter(
        (concert: Concert) =>
          concert.location &&
          concert.location.latitude &&
          concert.location.longitude
      );
      setConcerts(validConcerts);
    });
  }, []);

  // Función para añadir un evento al calendario
  const handleAddEvent = (concert: Concert) => {
    const newEvent = {
      id: concert._id,
      title: concert.name,
      start: concert.date, // Fecha del evento desde el backend
    };

    // Verificar si ya está en el calendario
    if (!events.some((event) => event.id === concert._id)) {
      setEvents([...events, newEvent]);
    } else {
      alert("Este evento ya está en el calendario.");
    }
  };

  // Función para eliminar un evento del calendario
  const handleEventClick = (clickInfo: any) => {
    if (
      window.confirm(`¿Quieres eliminar el evento "${clickInfo.event.title}"?`)
    ) {
      setEvents(events.filter((event) => event.id !== clickInfo.event.id));
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen p-6">
      <h1 className="text-4xl font-title text-primary mb-4">
        Calendario de Conciertos
      </h1>
      <p className="text-gray-700 mb-6">
        Selecciona un evento para añadirlo al calendario. También puedes hacer
        clic en un evento dentro del calendario para eliminarlo.
      </p>

      {/* Contenedor en dos columnas */}
      <div className="flex flex-col lg:flex-row w-full max-w-7xl h-[80vh] gap-6">
        {/* Sección de Tarjetas de Conciertos */}
        <div className="w-full lg:w-1/3 h-full overflow-y-auto rounded-lg p-4">
          <h2 className="text-2xl font-title text-primary mb-4">
            Selecciona un Evento
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
                onClick={() => handleAddEvent(concert)} // 🔹 Agregar evento al calendario
              />
            ))}
          </div>
        </div>

        {/* Sección del Calendario */}
        <div className="w-full lg:w-2/3 bg-white p-4 rounded-lg shadow-lg">
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            editable={true}
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
            events={events} // 🔹 Eventos cargados dinámicamente
            eventClick={handleEventClick} // 🔹 Función para eliminar eventos
            height="auto"
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: "dayGridMonth,dayGridWeek,dayGridDay",
            }}
            dayHeaderFormat={{ weekday: "short" }}
            dayCellContent={(info) => (
              <div className="text-gray-700 font-semibold text-sm">
                {info.dayNumberText}
              </div>
            )}
          />
        </div>
      </div>
    </div>
  );
};

export default FullCalendarPage;
