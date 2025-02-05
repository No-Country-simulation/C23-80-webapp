import { useEffect, useState } from 'react';
import { fetchCategories } from './Apis';
import Card from './components/Card';

const Categories = () => {
  const [category, setCategory] = useState([]);
  const [isCategoryLoading, setIsCategoryLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categories = await fetchCategories();
        if (Array.isArray(categories) && categories.length > 0) {
          setCategory(categories);          
        }
      } catch (err) {
        console.error('Error al obtener categoría:', err);
      } finally {
        setIsCategoryLoading(false);
      }
    };
    fetchData();
  }, []);
  return (
    <div className='w-full flex flex-col items-center space-y-8 px-4 lg:px-8 my-16'>
      <div className='max-w-[1200px] w-full mx-auto'>
        <h2 style={{color: 'var(--purple10)', font: 'var(--h1)'}} className='text-left font-bold mb-10'>Categorías</h2>
        {isCategoryLoading ? (
          <div className='flex justify-center items-center w-full'>
            <div className='animate-spin rounded-full h-12 w-12 border-4 border-[var(--purple)] border-t-transparent'></div>
          </div>
        ) : (
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-[1200px] w-full justify-items-center'>
            {category.length > 0 ? (
              category.map((cat) => {
                const dataObject = {
                  backgroundImage: cat.featuredImage.secure_url,
                  title: cat.title,
                };
                return <Card key={cat.id} data={dataObject} />;
              })
            ) : (
              <p className='text-center text-gray-500'>
                No hay categorías disponibles...
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Categories;