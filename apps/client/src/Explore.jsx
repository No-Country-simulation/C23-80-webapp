import SearchI from './components/Search';
import { useEffect, useRef, useState } from 'react';
import { fetchLastResources } from './Apis';
import NewsCard from './components/NewsCard';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Explore = () => {
  const newsScrollRef = useRef(null);
  const popularScrollRef = useRef(null);
  const collectionsScrollRef = useRef(null);
  const [resources, setResources] = useState([]);
  const [isResourcesLoading, setIsResourcesLoading] = useState(true);
  const [isNewsResourcesLoading, setIsNewsResourcesLoading] = useState(true);
  const [isPopularResourcesLoading, setIsPopularResourcesLoading] = useState(true);
  const [isCollectionsResourcesLoading, setIsCollectionsResourcesLoading] = useState(true);
  
  useEffect(() => {
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
    getLastResources();
  }, []);

  const newsScrollLeft = () => {
    newsScrollRef.current.scrollBy({
      left: -400,
      behavior: 'smooth',
    });
  };

  const newsScrollRight = () => {
    newsScrollRef.current.scrollBy({
      left: 400,
      behavior: 'smooth',
    });
  };

  const popularScrollLeft = () => {
    popularScrollRef.current.scrollBy({
      left: -400,
      behavior: 'smooth',
    });
  };

  const popularScrollRight = () => {
    popularScrollRef.current.scrollBy({
      left: 400,
      behavior: 'smooth',
    });
  };

  const collectionsScrollLeft = () => {
    collectionsScrollRef.current.scrollBy({
      left: -400,
      behavior: 'smooth',
    });
  };

  const collectionsScrollRight = () => {
    collectionsScrollRef.current.scrollBy({
      left: 400,
      behavior: 'smooth',
    });
  };

  return(
    <div className='max-w-[1200px] mx-auto p-4 space-y-14 mt-10 mb-16'>
      <SearchI />

      <section className='w-full max-w-[1200px] relative mb-24'>
        <h2 style={{color: 'var(--purple)', font: 'var(--h1)'}} className='text-xl font-bold mb-4'>Novedades</h2>
        <button
          onClick={newsScrollLeft}
          className='absolute left-3 top-1/2 -translate-y-1/2 bg-gray-700 p-2 rounded-full shadow-md z-10'
        >
          <ChevronLeft className='h-6 w-6 text-[var(--grey50)]'/>
        </button>
        <div ref={newsScrollRef} className='flex overflow-hidden space-x-4 py-2'>
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
          onClick={newsScrollRight}
          className='absolute right-3 top-1/2 -translate-y-1/2 bg-gray-700 p-2 rounded-full shadow-md z-10'
        >
          <ChevronRight className='h-6 w-6 text-[var(--grey50)]' />
        </button>
      </section>

      <section className='w-full max-w-[1200px] relative mb-24'>
        <h2 style={{color: 'var(--purple)', font: 'var(--h1)'}} className='text-xl font-bold mb-4'>Las más populares</h2>
        <button
          onClick={popularScrollLeft}
          className='absolute left-3 top-1/2 -translate-y-1/2 bg-gray-700 p-2 rounded-full shadow-md z-10'
        >
          <ChevronLeft className='h-6 w-6 text-[var(--grey50)]'/>
        </button>
        <div ref={popularScrollRef} className='flex overflow-hidden space-x-4 py-2'>
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
          onClick={popularScrollRight}
          className='absolute right-3 top-1/2 -translate-y-1/2 bg-gray-700 p-2 rounded-full shadow-md z-10'
        >
          <ChevronRight className='h-6 w-6 text-[var(--grey50)]' />
        </button>
      </section>

      <section className='w-full max-w-[1200px] relative'>
        <h2 style={{color: 'var(--purple)', font: 'var(--h1)'}} className='text-xl font-bold mb-4'>Colecciones</h2>
        <button
          onClick={collectionsScrollLeft}
          className='absolute left-3 top-1/2 -translate-y-1/2 bg-gray-700 p-2 rounded-full shadow-md z-10'
        >
          <ChevronLeft className='h-6 w-6 text-[var(--grey50)]'/>
        </button>
        <div ref={collectionsScrollRef} className='flex overflow-hidden space-x-4 py-2'>
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
          onClick={collectionsScrollRight}
          className='absolute right-3 top-1/2 -translate-y-1/2 bg-gray-700 p-2 rounded-full shadow-md z-10'
        >
          <ChevronRight className='h-6 w-6 text-[var(--grey50)]' />
        </button>
      </section>
    </div>
  )
}

export default Explore;