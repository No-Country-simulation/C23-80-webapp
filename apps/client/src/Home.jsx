import Carousel from './components/Carousel';
import NewsCard from './components/NewsCard';
import SearchI from './components/Search';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useRef } from 'react';

const Home = () => {
  const scrollRef = useRef(null);

  const scrollLeft = () => {
    scrollRef.current.scrollBy({
      left: -400,
      behavior: 'smooth',
    });
  };

  const scrollRight = () => {
    scrollRef.current.scrollBy({
      left: 400,
      behavior: 'smooth',
    });
  };

  return (
    <div className='w-full flex flex-col items-center space-y-8 px-4 lg:px-8 my-10'>
      <div className='w-full mt-4 flex justify-center'>
        <SearchI />
      </div>
      <div className='w-full'>
        <Carousel />
      </div>
      <div className='w-full max-w-[1200px] relative mt-12'>
        <h2 className='text-xl font-bold mb-4'>Otras novedades</h2>
        <button
          onClick={scrollLeft}
          className='absolute left-3 top-1/2 -translate-y-1/2 bg-white/60 p-2 rounded-full shadow-md z-10'
        >
          <ChevronLeft className='h-6 w-6 text-[var(--purple)]'/>
        </button>
        <div ref={scrollRef} className='flex overflow-hidden space-x-4 py-2'>
          <NewsCard />
          <NewsCard />
          <NewsCard />
          <NewsCard />
          <NewsCard />
          <NewsCard />
          <NewsCard />
          <NewsCard />
          <NewsCard />
        </div>
        <button
          onClick={scrollRight}
          className='absolute right-3 top-1/2 -translate-y-1/2 bg-white/60 p-2 rounded-full shadow-md z-10'
        >
          <ChevronRight className='h-6 w-6 text-[var(--purple)]' />
        </button>
      </div>
    </div>
  )
}

export default Home;