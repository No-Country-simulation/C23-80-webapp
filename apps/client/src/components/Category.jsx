import { ChevronLeft, ChevronRight } from 'lucide-react';
import NewsCard from './NewsCard'
import Carousel from './Carousel';
import SearchI from './Search';
import { useEffect, useRef, useState } from 'react';
import { fetchCategories, fetchResourcesByHandle } from '../Apis';
import { useParams } from 'react-router';

const Category = () => {
  const scrollRef = useRef(null);
  const [category, setCategory] = useState([]);
  const [resources, setResources] = useState([]);
  const { handle } = useParams();
  const [isCategoryLoading, setIsCategoryLoading] = useState(true);
  const [isResourcesLoading, setIsResourcesLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categories = await fetchCategories();
        if (Array.isArray(categories) && categories.length > 0) {
          const filteredCategory = categories.find(item => item.handle === handle);
          setCategory(filteredCategory || null);
        }
      } catch (err) {
        console.error('Error al obtener categoría:', err);
      } finally {
        setIsCategoryLoading(false);
      }
    };

    const getResources = async () => {
      try {
        const resourcesData = await fetchResourcesByHandle(handle);
        setResources(resourcesData);
      } catch (err) {
        console.error('Error al obtener recursos:', err);
      } finally {
        setIsResourcesLoading(false);
      }
    };

    if (handle) {
      fetchData();
      getResources();
    }
  }, [handle]);

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
      <div className='w-full min-h-[300px] lg:min-h-[500px] flex justify-center items-center'>
        {isCategoryLoading ? (
          <div className='animate-spin rounded-full h-12 w-12 border-4 border-[var(--purple)] border-t-transparent'></div>
        ) : (
          <Carousel
            isCarousel={false}
            title={category?.title || 'Categoría sin título'}
            image={category?.featuredImage?.secure_url || ''}
          />
        )}
      </div>
      <SearchI />
      <div className='w-full max-w-[1200px] relative mt-4'>
        <h2
          style={{ color: 'var(--purple10)', font: 'var(--h2)' }}
          className='text-xl font-bold mb-4'
        >
          Recursos
        </h2>
        <button
          onClick={scrollLeft}
          className='absolute left-3 top-1/2 -translate-y-1/2 bg-gray-500 p-2 rounded-full shadow-md z-10'
        >
          <ChevronLeft className='h-6 w-6 text-[var(--purple)]' />
        </button>
        <div ref={scrollRef} className='flex overflow-hidden space-x-4 py-2'>
          {isResourcesLoading ? (
            <div className='flex justify-center items-center w-full'>
              <div className='animate-spin rounded-full h-12 w-12 border-4 border-[var(--purple)] border-t-transparent'></div>
            </div>
          ) : resources.length > 0 ? (
            resources.map((resource) => {
              const dataObject = {
                image: resource.featuredImage.secure_url,
                title: resource.title,
              };
              return <NewsCard key={resource.id} data={dataObject} />;
            })
          ) : (
            <p className='text-center text-gray-500'>No hay recursos disponibles...</p>
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
  );
};

export default Category;