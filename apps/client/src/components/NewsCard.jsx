import { Star, Bookmark } from 'lucide-react';
import { useNavigate } from 'react-router';

const NewsCard = ({ data }) => {
  const navigate = useNavigate();
  const handleResource = data.handle;

  const handleClic = () =>{
    navigate(`/recurso/${handleResource}`, { state: data });
  }

  return(
    <div className='bg-gray-200 min-w-[250px] max-w-sm w-full rounded-lg shadow-md overflow-hidden flex-shrink-0'>
      <div className='h-40 relative bg-gray-300'>
        {data.featuredImage.secure_url ? (
          <img 
            src={data.featuredImage.secure_url} 
            alt={data.title} 
            className='absolute top-0 left-0 w-full h-full object-cover'
          />
        ) : (
          <p className='text-gray-500 w-full flex justify-center items-center'>Sin imagen</p>
        )}
        <div className='relative z-10 flex space-x-2 p-2'>
          <Star className='cursor-pointer active:scale-90 transition-transform duration-300 text-white' />
          <Bookmark className='cursor-pointer active:scale-90 transition-transform duration-300 text-white' />
        </div>
      </div>
      <div className='flex items-center justify-between p-4 bg-purple-200'>
        <span className='text-lg text-gray-800 font-semibold'>{data.title}</span>
        <button onClick={handleClic} className='text-white text-sm rounded-md px-4 py-2 bg-[var(--purple10)] cursor-pointer active:scale-90 transition-transform duration-300'>
          Ver más
        </button>
      </div>
    </div>
  )
}

export default NewsCard;