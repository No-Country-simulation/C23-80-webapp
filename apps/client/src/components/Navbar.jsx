import { Link } from 'react-router';
import logo from '../assets/images/juniolandia-logo.svg';
import { Menu, X } from "lucide-react";
import { useState } from "react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return(
    <nav className='bg-white shadow-md py-4 px-6 sticky top-0 left-0 w-full z-50'>
      <div className='max-w-[1200px] mx-auto flex justify-between items-center'>
        <div className='flex items-center space-x-2'>
          <Link to="/">
            <img src={logo} alt='Juniorlandia Logo' className='h-9 w-auto' />
          </Link>
        </div>
        <div className='lg:hidden z-50' onClick={toggleMenu}>
          {
            isMenuOpen 
              ? (<X className='h-6 w-6 text-[var(--purple)] transition-transform transform rotate-90 duration-300' />)
              : (<Menu className='h-6 w-6 text-[var(--purple)] transition-transform transform duration-300' />)
          }
        </div>
        <div className={`fixed lg:static lg:flex inset-0 bg-white lg:bg-transparent flex flex-col lg:flex-row items-center justify-center lg:justify-end space-y-6 lg:space-y-0 lg:space-x-6 z-40 transition-transform duration-300 transform
          ${
            isMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
          }`
        }>
          {
            isMenuOpen && (
              <div className='lg:hidden flex flex-col items-center'>
                <img src={logo} alt='Juniorlandia Logo' className='h-8 w-auto mb-4' />
              </div>
            )
          }
          <Link to='/' style={{color: 'var(--purple)'}} className='text-lg lg:text-base hover:underline' onClick={() => setIsMenuOpen(false)}>Home</Link>
          <Link to='/categorias' style={{color: 'var(--purple)'}} className='text-lg lg:text-base hover:underline' onClick={() => setIsMenuOpen(false)}>Categorías</Link>
          <Link to='/explorar' style={{color: 'var(--purple)'}} className='text-lg lg:text-base hover:underline' onClick={() => setIsMenuOpen(false)}>Explorar</Link>
          <Link to='/sobre-nosotros' style={{color: 'var(--purple)'}} className='text-lg lg:text-base hover:underline' onClick={() => setIsMenuOpen(false)}>Sobre nosotros</Link>
        
          <a href='/login' className='text-white px-4 py-2 rounded-lg hover:bg-[var(--purple-hover)] bg-[var(--purple)] transform transition-transform active:scale-90' onClick={() => setIsMenuOpen(false)}>
            Iniciar sesión
          </a>
          <a href='/#' className='text-white px-4 py-2 rounded-lg hover:bg-[var(--blue-hover)] bg-[var(--blue)] transform transition-transform active:scale-90' onClick={() => setIsMenuOpen(false)}>
            Regístrate
          </a>
        </div>
      </div>
    </nav>
  )
}
export default Navbar;