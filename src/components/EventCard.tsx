interface Props {
  title: string;
  description: string;
  date: string;
  imageUrl: string;
  location: string;
  onClick?: () => void;
}

const EventCard: React.FC<Props> = ({
  title,
  description,
  date,
  imageUrl,
  location,
  onClick,
}) => {
  return (
    <div
      className="p-4 mb-4 bg-white shadow-md rounded-lg cursor-pointer hover:shadow-xl transition"
      onClick={onClick}
    >
      <img
        src={imageUrl}
        alt={title}
        className="w-full h-40 object-cover rounded-lg"
      />
      <h3 className="text-lg font-bold mt-2">{title}</h3>
      <p className="text-sm text-gray-600">{description}</p>
      <p className="text-sm text-gray-500 mt-1">
        {new Date(date).toLocaleString()}
      </p>
      <p className="text-sm text-gray-700 font-semibold">{location}</p>
    </div>
  );
};

export default EventCard;
