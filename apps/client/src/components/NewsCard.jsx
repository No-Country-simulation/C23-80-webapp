import {Star, Bookmark} from 'lucide-react'

/**
 * NewsCard component
 * @description Componente que muestra una tarjeta de noticia
 * @param {object} props - Propiedades del componente
 * @returns JSX.Element
 */
const NewsCard = () => {
  const handleClic = () =>{    
  }

  return(
    <div className='bg-gray-200 min-w-[250px] max-w-sm w-full rounded-lg shadow-md overflow-hidden flex-shrink-0'>
      <div className='h-40 relative flex items-start space-x-2 p-2'>
        <Star className='cursor-pointer active:scale-90 transition-transform duration-300' />
        <Bookmark className='cursor-pointer active:scale-90 transition-transform duration-300' />
      </div>
      <div className='flex items-center justify-between p-4 bg-purple-200 rounded-t-lg'>
        <span className='text-lg text-gray-800 font-semibold'>Título</span>
        <button className='text-white text-sm rounded-md px-4 py-2 bg-purple-800 cursor-pointer active:scale-90 transition-transform duration-300' onClick={handleClic}>
          Ver más
        </button>
      </div>
    </div>
  )
}

export default NewsCard;