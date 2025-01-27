import {Star, Bookmark} from 'lucide-react'

const Card = () => {
  return(
    <div className='bg-gray-200 w-90 rounded-lg shadow-md'>
      <div className='h-40 relative flex items-start space-x-2 p-2'>
        <Star />
        <Bookmark />
      </div>
      <div className='flex items-center justify-between p-4 bg-purple-200 rounded-t-lg'>
        <span className='text-lg text-gray-800 font-semibold'>Título</span>
        <button className='text-white text-sm rounded-md px-4 py-2 bg-purple-800'>
          Ver más
        </button>
      </div>
    </div>
  )
}

export default Card;