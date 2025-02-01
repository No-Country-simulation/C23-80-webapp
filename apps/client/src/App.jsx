import { BrowserRouter, Routes, Route } from 'react-router'
import './index.css'
import Home from './Home'
import Navbar from './components/Navbar'
import AboutUs from './AboutUs'
import Explore from './Explore'
import Categories from './Categories'

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
      </Routes>
    </BrowserRouter>
  )
}

export default App