import Header from './components/Header/Header';
import './style.sass'
import { Context } from './context/context';
import { useState } from 'react';
import Main from './pages/Main/Main';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import About from './pages/About/About';
import CartPage from './pages/Cart/CartPage';
import SignIn from './components/Modal/SignIn';
import Favorite from './pages/Favorite/Favorite';
import News from './pages/News/News';



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
          <Header />
            <Routes>
              <Route path='/' element={<Main />}></Route>
              <Route path='/news' element={<News />}></Route>
              <Route path='/about' element={<About />}></Route>
              <Route path='/cart' element={<Navigate to='/' />}></Route>
              <Route path='/favorites' element={<Navigate to='/' />}></Route>
            </Routes>
            <SignIn />
        </Context.Provider>
    )
  }

  return (
     <Context.Provider value={value}>
        <Header />
          <Routes>
            <Route path='/' element={<Main />}></Route>
            <Route path='/news' element={<News />}></Route>
            <Route path='/about' element={<About />}></Route>
            <Route path='/cart' element={<CartPage />}></Route>
            <Route path='/favorites' element={<Favorite />}></Route>
          </Routes>
          <SignIn />
      </Context.Provider>
  );
}

export default App  ;
