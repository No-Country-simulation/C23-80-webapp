import { useLocation, useNavigate } from 'react-router';
import SimpleCard from './components/SimpleCard';
import { Globe } from 'lucide-react';
import { useEffect } from 'react';

const Resource = () => {
  const navigate = useNavigate();
  const { state: data } = useLocation();

  useEffect(() => {
    if (!data) {
      navigate('/');
    }
  }, [data, navigate]);

  if (!data) return null;
  
  return(
    <div className='flex flex-col-reverse md:flex-row content-center items-center justify-between md:items-center gap-8 p-4 max-w-[1200px] mx-auto md:min-h-[calc(100vh-68px)]'>
      <SimpleCard data={data} />
      <div className='flex flex-col items-center md:items-start md:w-1/2 text-center mt-10 md:mt-0'>
        <h2 style={{ color: 'var(--purple10)', font: 'var(--h1)' }} className='text-xl font-bold mb-2 w-full text-center'>
          {data.title}
        </h2>
        <p style={{font: 'var(--text)' }} className='w-full text-gray-700 mb-8'>
          {data.description}
        </p>
        <a 
          href={data.url} 
          target='_blank' 
          rel='noopener noreferrer' 
          className='self-center flex items-center gap-2 bg-[var(--purple)] hover:bg-[var(--purple-hover)] text-white px-4 py-2 rounded-lg shadow-md transition-all duration-300'
        >
          <Globe size={20} />
          Ir al Sitio
        </a>
      </div>
    </div>
  )
}

export default Resource;