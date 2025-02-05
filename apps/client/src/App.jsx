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
import User from './user'
import ResourceTable from './components/resource-table'
import UserIndex from './components/UserIndex'
import CategoryTable from './components/category-table'
import CollectionTable from './components/collection-table'

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
          <Route path='/auth/:user_id/categories' element={<CategoryTable/>} />
          <Route path='/auth/:user_id/resources' element={<ResourceTable/>} />
          <Route path='/auth/:user_id/collections' element={<CollectionTable/>} />
        </Route>
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/password-reset' element={<PasswordReset />} />
        <Route path='/categoria/:handle' element={<Category />} />
        <Route path='/recurso/:handle' element={<Resource />} />
        <Route path="*" element={<Home />} /> 
        <Route path='/registro' element={<></>} />
        <Route path='/category' element={<Category />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App