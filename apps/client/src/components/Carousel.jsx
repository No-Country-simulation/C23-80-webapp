import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

const slides = [
  {title: 'Frontend', image: 'https://picsum.photos/1000/500?random=1'},
  {title: 'Backend', image: 'https://picsum.photos/1000/500?random=2'},
  {title: 'FullStack', image: 'https://picsum.photos/1000/500?random=3'},
  {title: 'UI/UX', image: 'https://picsum.photos/1000/500?random=4'},
]

const Carousel = ({ isCarousel = true, carrouselItems }) => {
  const [currentImage, setCurrentImage] = useState(0);

  const prevSlide = () => {
    setCurrentImage((prev) => (prev === 0 ? carrouselItems.length - 1 : prev - 1))
  }

  const nextSlide = () => {
    setCurrentImage((prev) => (prev === carrouselItems.length - 1 ? 0 : prev + 1));
  }
  console.log(carrouselItems);
  return(
    carrouselItems ? (
      <div className="relative w-full max-w-[1200px] mx-auto">
      <div className="relative w-full h-[300px] md:h-[400px] lg:h-[500px] overflow-hidden rounded-lg shadow-lg">
        <img 
          src={carrouselItems[currentImage].featuredImage.secure_url}
          alt={carrouselItems[currentImage].title}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-4 left-4 p-4 rounded-2xl bg-black/70">
          <h2 style={{color: "var(--purple)"}} className="text-lg md:text-2xl lg:text-4xl font-bold">{slides[currentImage].title}</h2>
        </div>
      </div>

      {
        isCarousel && (
          <>
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-gray-700 text-white p-3 rounded-full shadow-md hover:bg-gray-900"
            >
              <ChevronLeft size={30} />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-gray-700 text-white p-3 rounded-full shadow-md hover:bg-gray-900"
            >
              <ChevronRight size={30} />
            </button>
          </>
        )
      }
    </div>
    ): null
  )
}

export default Carousel;