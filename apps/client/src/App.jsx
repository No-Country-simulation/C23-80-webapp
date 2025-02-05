import { BrowserRouter, Routes, Route } from 'react-router'
import './index.css'
import Home from './Home'
import Navbar from './components/Navbar'
import AboutUs from './AboutUs'
import Explore from './Explore'
import Categories from './Categories'
import Login from './Login'
import Category from './components/Category'
import User from './user'
import UserTable from './components/user-table'
import UserIndex from './components/UserIndex'

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
        <Route path='/auth/:user_id' element={<User/>} >
          <Route index element={<UserIndex/>} />
          <Route path='/auth/:user_id/users' element={<></>} />
          <Route path='/auth/:user_id/categories' element={<></>} />
          <Route path='/auth/:user_id/resources' element={<UserTable/>} />
          <Route path='/auth/:user_id/collections' element={<></>} />
        </Route>
        <Route path='/login' element={<Login />} />
        <Route path='/registro' element={<></>} />
        <Route path='/category' element={<Category />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App