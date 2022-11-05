import './style.sass'
import { Context } from './context/context';
import { useState } from 'react';
import Main from './pages/Main/Main';
import { Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import About from './pages/About/About';
import CartPage from './pages/Cart/CartPage';
import SignIn from './components/Modal/SignIn';
import Favorite from './pages/Favorite/Favorite';
import News from './pages/News/News';
import Contact from './pages/Contact/Contact';
import NotFound from './pages/NotFound/NotFound';
import Loyout from './Loyout/Loyout';


function App() {
  const token = useSelector(state => state.user.token)

  const [modalActive, setModalActive] = useState()
  const [registr, setRegistr] = useState()
  const [min, setMin] = useState("")
  const [max, setMax] = useState("")
  const [search, setSearch] = useState("")

  const value = { modalActive, registr, min, max, search, setModalActive, setRegistr, setMin, setMax, setSearch }

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
              </Route>
            <Route path='*' element={<NotFound />}></Route>
          </Routes>
          <SignIn />
      </Context.Provider>
  );
}

export default App  ;
