import Card from './components/Card';

const Resource = () => {
  return(
    <div className='flex flex-col-reverse md:flex-row content-center items-center md:items-center gap-8 p-4 max-w-[1200px] mx-auto md:min-h-[calc(100vh-68px)]'>
      <Card backgroundImage='https://picsum.photos/1000/500?random=1' />
      <div className='flex flex-col items-center md:items-start md:w-1/2 text-justify'>
        <h2 style={{color: 'var(--purple10)', font: 'var(--h2)'}} className='text-xl font-bold mb-2 w-full text-center'>Titulo</h2>
        <p className='text-sm text-gray-700 mb-4'>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </p>
        <button className='self-center bg-[var(--purple)] hover:bg-[var(--purple-hover)] text-white px-4 py-2 rounded-lg shadow-md'>Ver Recurso</button>
      </div>
    </div>
  )
}

export default Resource;