import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Context } from './context/context';
import { useState } from 'react';
import Main from './pages/Main/Main';
import About from './pages/About/About';
import CartPage from './pages/Cart/CartPage';
import SignIn from './components/Modal/SignIn';
import Favorite from './pages/Favorite/Favorite';
import News from './pages/News/News';
import Contact from './pages/Contact/Contact';
import NotFound from './pages/NotFound/NotFound';
import Loyout from './Loyout/Loyout';
import ProductPage from './pages/Product/ProductPage';
import Profile from './pages/Profile/Profile';
import './style.sass'


function App() {
  const token = useSelector(state => state.user.token)

  const [modalActive, setModalActive] = useState()
  const [registr, setRegistr] = useState()
  const [min, setMin] = useState("")
  const [max, setMax] = useState("")
  const [search, setSearch] = useState("")
  const [block, setBlock] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [countriesPerPage] = useState(9)

  const paginate = (pageNumber) => setCurrentPage(pageNumber)
  const previous = () => {
    if(currentPage !== 1) {
      setCurrentPage(prev => prev - 1)
    }
  }
  const nextPage = () => {
    if (currentPage !== 4) {
      setCurrentPage(prev => prev + 1)
    }
  }
  
  const value = { modalActive, registr, min, max, search, block, currentPage, countriesPerPage, setCurrentPage, nextPage, previous, setModalActive, setRegistr, setMin, setMax, setSearch, setBlock, paginate }

  if (!token) {
    return (
        <Context.Provider value={value}>
            <Routes>
              <Route path='/' element={<Loyout />}>
                <Route path='/' element={<Main />}></Route>
                <Route path='/news' element={<News />}></Route>
                <Route path='/about' element={<About />}></Route>
                <Route path='/cart' element={<CartPage />}></Route>
                <Route path='/favorites' element={<Favorite />}></Route>
                <Route path='/contacts' element={<Contact />}></Route>
                <Route path='/details/:id' element={<ProductPage/>}></Route>
                <Route path='/profile' element={<Navigate to='/' />}></Route>
              </Route>
                <Route path='*' element={<NotFound />}></Route>
            </Routes>
            <SignIn />
        </Context.Provider>
    )
  }

  return (
     <Context.Provider value={value}>
          <Routes>
              <Route path='/' element={<Loyout />}>
                <Route path='/' element={<Main />}></Route>
                <Route path='/news' element={<News />}></Route>
                <Route path='/about' element={<About />}></Route>
                <Route path='/cart' element={<CartPage />}></Route>
                <Route path='/favorites' element={<Favorite />}></Route>
                <Route path='/contacts' element={<Contact />}></Route>
                <Route path='/details/:id' element={<ProductPage/>}></Route>
                <Route path='/profile' element={<Profile />}></Route>
              </Route>
            <Route path='*' element={<NotFound />}></Route>
          </Routes>
          <SignIn />
      </Context.Provider>
  );
}

export default App  ;
