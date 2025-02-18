import { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import EventCard from "../components/EventCard";
import { getConcerts, updateConcert } from "../services/concertService"; // Importamos la función para actualizar la API
import EditEventModal from "../components/EditEvent";
export interface Concert {
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
  const [selectedEvent, setSelectedEvent] = useState<Concert | null>(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [editedEvent, setEditedEvent] = useState({ name: "", date: "" });

  const updateConcertsAndEvents = () => {
    getConcerts().then((data) => {
      const validConcerts = data.filter(
        (concert: Concert) =>
          concert.location &&
          concert.location.latitude &&
          concert.location.longitude
      );
      setConcerts(validConcerts);

      // Convertimos los conciertos en eventos para el calendario
      setEvents(
        validConcerts.map((concert: { _id: any; name: any; date: any }) => ({
          id: concert._id,
          title: concert.name,
          start: concert.date,
        }))
      );
    });
  };

  useEffect(() => {
    updateConcertsAndEvents();
  }, []);

  // Función para abrir el modal y cargar los datos del evento seleccionado
  const handleEventClick = (clickInfo: any) => {
    const event = concerts.find((c) => c._id === clickInfo.event.id);
    if (event) {
      setSelectedEvent(event);
      setEditedEvent({ name: event.name, date: event.date });
      setModalIsOpen(true);
    }
  };

  // Función para actualizar el evento en el backend y en el estado
  const handleUpdateEvent = async () => {
    if (!selectedEvent) return;

    const updatedEvent = {
      ...selectedEvent,
      name: editedEvent.name,
      date: editedEvent.date,
    };

    try {
      await updateConcert(selectedEvent._id, updatedEvent); // Enviamos los datos actualizados al backend

      // Actualizamos la lista de eventos en el estado
      updateConcertsAndEvents();

      // Cerramos el modal
      setModalIsOpen(false);
    } catch (error) {
      console.error("❌ Error al actualizar el evento:", error);
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen p-6">
      <h1 className="text-4xl font-title text-primary mb-4">
        Calendario de Conciertos
      </h1>
      <p className="text-gray-700 mb-6">
        Haz clic en un evento para editarlo. Puedes cambiar su nombre o fecha.
      </p>

      {/* Contenedor en dos columnas */}
      <div className="flex flex-col lg:flex-row w-full max-w-7xl h-[80vh] gap-6">
        {/* Tarjetas de eventos */}
        <div className="w-full lg:w-1/3 h-full overflow-y-auto rounded-lg p-4">
          <h2 className="text-2xl font-title text-primary mb-4">
            🎼 Selecciona un Evento
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
                onClick={() => setSelectedEvent(concert)}
              />
            ))}
          </div>
        </div>

        {/* Calendario */}
        <div className="w-full lg:w-2/3 bg-white p-4 rounded-lg shadow-lg">
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            editable={true}
            selectable={true}
            events={events}
            eventClick={handleEventClick} // Abrir modal al hacer clic en un evento
            height="auto"
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: "dayGridMonth,dayGridWeek,dayGridDay",
            }}
          />
        </div>
      </div>
  
        {/* Modal para editar eventos */}
      <EditEventModal
        modalIsOpen={modalIsOpen}
        setModalIsOpen={setModalIsOpen}
        editedEvent={editedEvent}
        setEditedEvent={setEditedEvent}
        handleUpdateEvent={handleUpdateEvent}
      />
    </div>
  );
};

export default FullCalendarPage;
