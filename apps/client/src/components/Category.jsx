import { ChevronLeft, ChevronRight } from 'lucide-react';
import NewsCard from './NewsCard'
import Carousel from './Carousel';
import SearchI from './Search';
import { useEffect, useRef, useState } from 'react';
import { fetchCategories, getResourcesByHandle } from '../Apis';
import { useParams } from 'react-router';

const Category = () => {
  const scrollRef = useRef(null);
  const [category, setCategory] = useState([]);
  const [resources, setResources] = useState([]);
  const [error, setError] = useState(false);
  const { handle } = useParams();  

  useEffect(() => {
    console.log("Valor de handle en useEffect:", handle);
    const fetchData = async () => {
      try {
        const categories = await fetchCategories();
        if (Array.isArray(categories) && categories.length > 0) {
          const filteredCategory = categories.find(item => item.handle === handle);
          setCategory(filteredCategory || null);
        }
      } catch (err) {
        console.error('Error al obtener categoría:', err);
        setError(true);
      }
    };

    const fetchResources = async () => {
      try {
        const resourcesData = await getResourcesByHandle(handle);
        console.log("Datos obtenidos de getResourcesByHandle:", resourcesData);
        setResources(resourcesData);
      } catch (err) {
        console.error('Error al obtener recursos:', err);
        setError(true);
      }
    };

    if (handle) {
      fetchData();
      fetchResources();
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
      <div className='w-full'>
        {category ? (
          <Carousel isCarousel={false} title={category?.title || 'Categoría sin título'} image={category?.featuredImage?.secure_url || ''} />
        ) : (
          <p className='text-center text-gray-500'>Cargando categoría...</p>
        )}
      </div>
      <div className='w-full mt-6 flex justify-center'>
        <SearchI />
      </div>
      <div className='w-full max-w-[1200px] relative mt-4'>
        <h2 style={{color: 'var(--purple10)', font: 'var(--h2)'}} className='text-xl font-bold mb-4'>Recursos</h2>
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

export default Category;