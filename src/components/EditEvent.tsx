import Modal from "react-modal"; // Importamos react-modal

Modal.setAppElement("#root"); // Necesario para accesibilidad

interface EditEventProps {
  modalIsOpen: boolean;
  setModalIsOpen: (isOpen: boolean) => void;
  editedEvent: { name: string; date: string };
  setEditedEvent: (event: { name: string; date: string }) => void;
  handleUpdateEvent: () => void;
}

const EditEvent: React.FC<EditEventProps> = (props: EditEventProps) => {
  const {
    modalIsOpen,
    setModalIsOpen,
    editedEvent,
    setEditedEvent,
    handleUpdateEvent,
  } = props;

  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={() => setModalIsOpen(false)}
      className="bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto"
    >
      <h2 className="text-xl font-semibold mb-4">Editar Evento</h2>
      <label className="block mb-2">Nombre del evento:</label>
      <input
        type="text"
        value={editedEvent.name}
        onChange={(e) =>
          setEditedEvent({ ...editedEvent, name: e.target.value })
        }
        className="w-full p-2 border border-gray-300 rounded-lg mb-4"
      />
      <label className="block mb-2">Fecha del evento:</label>
      <input
        type="datetime-local"
        value={editedEvent.date}
        onChange={(e) =>
          setEditedEvent({ ...editedEvent, date: e.target.value })
        }
        className="w-full p-2 border border-gray-300 rounded-lg mb-4"
      />
      <button
        onClick={handleUpdateEvent}
        className="bg-blue-600 text-white px-4 py-2 rounded-lg mr-2"
      >
        Guardar Cambios
      </button>
      <button
        onClick={() => setModalIsOpen(false)}
        className="bg-gray-400 text-white px-4 py-2 rounded-lg"
      >
        Cancelar
      </button>
    </Modal>
  );
};
export default EditEvent;
