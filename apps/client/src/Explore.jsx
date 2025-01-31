import SearchI from "./components/Search";
import Card from "./components/Card";

const Explore = () => {
  return(
    <div className='max-w-[1200px] mx-auto p-4 space-y-14 mt-10 mb-16'>
      <SearchI />

      <section className="mb-24">
        <h2 style={{color: 'var(--purple)'}} className='text-xl font-bold mb-4'>Nuevas publicaciones</h2>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-4">
          <Card backgroundImage='https://picsum.photos/1000/500?random=1' />
          <Card backgroundImage='https://picsum.photos/1000/500?random=2' />
          <Card backgroundImage='https://picsum.photos/1000/500?random=3' />
        </div>
      </section>

      <section className="mb-24">
        <h2 style={{color: 'var(--purple)'}} className='text-xl font-bold mb-4'>Las más populares</h2>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-4">
          <Card backgroundImage='https://picsum.photos/1000/500?random=4' />
          <Card backgroundImage='https://picsum.photos/1000/500?random=5' />
        </div>
      </section>

      <section>
        <h2 style={{color: 'var(--purple)'}} className='text-xl font-bold mb-4'>Colecciones</h2>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-4">
          <Card backgroundImage='https://picsum.photos/1000/500?random=6' />
          <Card backgroundImage='https://picsum.photos/1000/500?random=7' />
          <Card backgroundImage='https://picsum.photos/1000/500?random=8' />
        </div>
      </section>
    </div>
  )
}

export default Explore;