import { BrowserRouter, Routes, Route } from 'react-router'
import './index.css'
import Home from './components/Home'
import Card from './components/Card'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route index path='/' element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path='/card' element={<Card />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
