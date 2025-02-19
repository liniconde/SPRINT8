import React from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

interface CarouselProps {
  images: string[];
  title?: string;
}

const Carousel: React.FC<CarouselProps> = ({ images, title }) => {
  const [emblaRef] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 5000 }),
  ]);

  return (
    <div className="w-full max-w-4xl">
      {title && (
        <h2 className="text-2xl font-title text-gray-900 text-center mb-4">
          {title}
        </h2>
      )}

      <div className="overflow-hidden rounded-lg shadow-md" ref={emblaRef}>
        <div className="flex">
          {images.map((image, index) => (
            <div key={index} className="flex-[0_0_100%]">
              <img
                src={image}
                alt={`Slide ${index + 1}`}
                className="w-full h-72 object-cover rounded-lg"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Carousel;
