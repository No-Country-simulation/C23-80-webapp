import Carousel from './components/Carousel';
import NewsCard from './components/NewsCard';
import SearchI from './components/Search';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { fetchCategories, fetchLastResources } from './Apis';

const Home = () => {
  const scrollRef = useRef(null);
  const [categories, setCategories] = useState([]);
  const [resources, setResources] = useState([]);
  const [isCategoriesLoading, setIsCategoryLoading] = useState(true);
  const [isResourcesLoading, setIsResourcesLoading] = useState(true);
  
  useEffect(() => {
    const getCategories = async () => {
      try {
        const result = await fetchCategories();
        if (Array.isArray(result) && result.length > 0) {
          setCategories(result);
        } else {
          setCategories([]);
        }
      } catch (err) {
        console.error('Error al obtener datos:', err);
      } finally {
        setIsCategoryLoading(false);
      }
    };

    const getLastResources = async () => {
      try {
        const result = await fetchLastResources();
        if (Array.isArray(result) && result.length > 0) {
          setResources(result.slice(0, 7));
        } else {
          setResources([]);
        }
      } catch (err) {
        console.error('Error al obtener los recursos:', err);
      } finally {
        setIsResourcesLoading(false);
      }
    };
    getCategories();
    getLastResources();
  }, []);
  
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
      <div className='w-full min-h-[300px] lg:min-h-[500px] flex items-center justify-center'>
        { isCategoriesLoading ? (
            <div className='animate-spin rounded-full h-12 w-12 border-4 border-[var(--purple)] border-t-transparent'></div>
          ) : (
            <Carousel isCarousel={true} data={categories} />
        )}
      </div>
      <div className='w-full max-w-[1200px] relative mt-12'>
        <h2 style={{color: 'var(--purple10)', font: 'var(--h2)'}} className='text-xl font-bold mb-4'>Otras novedades</h2>
        <button
          onClick={scrollLeft}
          className='absolute left-3 top-1/2 -translate-y-1/2 bg-gray-700 p-2 rounded-full shadow-md z-10'
        >
          <ChevronLeft className='h-6 w-6 text-[var(--grey50)]'/>
        </button>
        <div ref={scrollRef} className='flex overflow-hidden space-x-4 py-2'>
          { isResourcesLoading ? (
            <div className='w-full flex justify-center items-center'>
              <div className='animate-spin rounded-full h-12 w-12 border-4 border-[var(--purple)] border-t-transparent'></div>
            </div>
          ) : (
            resources.map(resource => (
              <NewsCard key={resource.id} data={resource}/>
            ))
          )}
        </div>
        <button
          onClick={scrollRight}
          className='absolute right-3 top-1/2 -translate-y-1/2 bg-gray-500 p-2 rounded-full shadow-md z-10'
        >
          <ChevronRight className='h-6 w-6 text-[var(--grey50)]' />
        </button>
      </div>
    </div>
  )
}

export default Home;