import { BrowserRouter, Routes, Route } from 'react-router'
import './index.css'
import Home from './Home'
import Navbar from './components/Navbar'
import AboutUs from './AboutUs'
import Explore from './Explore'
import Categories from './Categories'
import Login from './Login'
import Category from './components/Category'
import Signup from './Signup'
import PasswordReset from './PasswordReset'
import Resource from './Resource'

function App() {

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route index path='/' element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path='/explorar' element={<Explore />} />
        <Route path='/categorias' element={<Categories />} />
        <Route path='/sobre-nosotros' element={<AboutUs />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/password-reset' element={<PasswordReset />} />
        <Route path='/categoria/:handle' element={<Category />} />
        <Route path='/resource' element={<Resource />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App