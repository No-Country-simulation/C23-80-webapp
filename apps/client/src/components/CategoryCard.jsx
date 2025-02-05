import { useNavigate } from 'react-router';

const CategoryCard = ({ data }) => {
  const navigate = useNavigate();

  const handleClickCarousel = () => {
    const handle = data.handle;
    navigate(`/categoria/${handle}`);    
  }

  return (
    <div
      className='relative rounded-lg shadow-lg bg-cover bg-center aspect-video max-w-[504px] w-full cursor-pointer'
      style={{ backgroundImage: `url(${data.backgroundImage})` }}
      onClick={handleClickCarousel}
    >
      <div className="absolute top-2 left-2 bg-black bg-opacity-50 text-white px-3 py-1 rounded-lg">
        <p style={{font: 'var(--h3)'}} className="text-base font-semibold capitalize">{data.title}</p>
      </div>
    </div>
  );
}

export default CategoryCard;