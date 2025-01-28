import { Link } from 'react-router';
import logo from '../assets/images/juniolandia-logo.svg';

const Navbar = () => {
  return(
    <>
      <nav className="bg-white shadow-md py-4 px-6 flex justify-between items-center">
      <div className="flex items-center space-x-2">
        <Link to="/">
          <img src={logo} alt="Juniorlandia Logo" className="h-10 w-auto" />
        </Link>
      </div>
      <div className="flex space-x-6">
        <Link to="/" style={{color: "var(--purple)"}} className="hover:underline">Home</Link>
        <Link to="/categorias" style={{color: "var(--purple)"}} className="hover:underline">Categorías</Link>
        <Link to="/explorar" style={{color: "var(--purple)"}} className="hover:underline">Explorar</Link>
        <Link to="/sobre-nosotros" style={{color: "var(--purple)"}} className="hover:underline">Sobre nosotros</Link>
      </div>
      <div className="flex space-x-4">
        <a href="/#" className="text-white px-4 py-2 rounded-lg hover:bg-[var(--purple-hover)] bg-[var(--purple)] transform transition-transform active:scale-90">
          Iniciar sesión
        </a>
        <a href="/#" className="text-white px-4 py-2 rounded-lg hover:bg-[var(--blue-hover)] bg-[var(--blue)] transform transition-transform active:scale-90">
          Regístrate
        </a>
      </div>
    </nav>
    </>
  )
}

export default Navbar;