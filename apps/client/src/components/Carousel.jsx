import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router';

const Carousel = ({ isCarousel = true, data = [], title = '', image = ''}) => {
  const navigate = useNavigate();
  const [currentImage, setCurrentImage] = useState(0);
  const slides = isCarousel && data.length > 0 
  ? data 
  : [{ title, featuredImage: { secure_url: image } }];
  const handleCategory = slides[currentImage].handle;
  
  const prevSlide = () => {
    setCurrentImage((prev) => (prev === 0 ? carrouselItems.length - 1 : prev - 1))
  }

  const nextSlide = () => {
    setCurrentImage((prev) => (prev === carrouselItems.length - 1 ? 0 : prev + 1));
  }


  const handleClickCarousel = () => {
    if(isCarousel){
      navigate(`/categoria/${handleCategory}`);
    }
  }

  return(
    <div className='relative w-full max-w-[1200px] mx-auto'>
      {slides.length > 0 && slides[currentImage]?.featuredImage ? (
        <div onClick={handleClickCarousel} className={`relative w-full h-[300px] md:h-[400px] lg:h-[500px] overflow-hidden rounded-lg shadow-lg ${isCarousel ? 'cursor-pointer' : ''}`}>
          <img 
            src={slides[currentImage].featuredImage.secure_url}
            alt={slides[currentImage].title}
            className='w-full h-full object-cover'
          />
          <div className='absolute top-4 left-4 p-4 rounded-2xl bg-black/70'>
            <h2 style={{color: 'var(--grey60)'}} className='capitalize text-lg md:text-2xl lg:text-4xl font-bold'>{slides[currentImage].title}</h2>
          </div>
        </div>
      ) : (
        <p className='text-center text-gray-500'>No hay datos disponibles ...</p>
      )}

      {
        isCarousel && slides.length > 1 && (
          <>
            <button
              onClick={prevSlide}
              className='absolute left-4 top-1/2 transform -translate-y-1/2 bg-gray-700 text-white p-3 rounded-full shadow-md hover:bg-gray-900'
            >
              <ChevronLeft size={30} />
            </button>
            <button
              onClick={nextSlide}
              className='absolute right-4 top-1/2 transform -translate-y-1/2 bg-gray-700 text-white p-3 rounded-full shadow-md hover:bg-gray-900'
            >
              <ChevronRight size={30} />
            </button>
          </>
        )
      }
    </div>
    )
}

export default Carousel;