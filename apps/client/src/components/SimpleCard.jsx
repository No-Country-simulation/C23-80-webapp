const SimpleCard = ({ data }) => {
  return(
    <div className='bg-gray-200 min-w-[250px] md:max-w-md lg:max-w-lg w-full rounded-lg shadow-md overflow-hidden flex-shrink-0'>
      <div className='h-70 lg:h-80 relative bg-gray-300'>
        <img 
          src={data.featuredImage.secure_url} 
          alt={data.title} 
          className='absolute top-0 left-0 w-full h-full bg-cover bg-center object-cover'
        />
      </div>
    </div>
  )
}

export default SimpleCard;