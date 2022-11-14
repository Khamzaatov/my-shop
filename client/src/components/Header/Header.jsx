import header from "./header.module.sass";
import { IoCart } from "react-icons/io5";
import { FaUserAlt } from "react-icons/fa";
import { SiNike } from "react-icons/si";
import { Context } from "./../../context/context";
import { useContext, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { BsHeartFill } from "react-icons/bs";
import { signOut } from "../../features/userSlice";
import { NavLink } from "react-router-dom";
import { Link } from "react-scroll";
import avatar from '../../assets/images/logo.png'
import { fetchCart } from './../../features/cartSlice';
import '../../style.sass'

const Header = () => {
  const [position, setPosition] = useState(window.pageYOffset)
  const [visible, setVisible] = useState(true)

  const dispatch = useDispatch();
  const { setModalActive, block, setBlock } = useContext(Context);
  const token = useSelector((state) => state.user.token);
  const amount = useSelector((state) => state.cart.cart.products?.length);

  useEffect(() => {
    dispatch(fetchCart())
  }, [dispatch])
  
  const cls = visible ? "visible" : "hidden";

  useEffect(()=> {
    const handleScroll = () => {
       let moving = window.pageYOffset
       
       setVisible(position > moving);
       setPosition(moving)
       setBlock(false)
    };
    window.addEventListener("scroll", handleScroll);
    return(() => {
       window.removeEventListener("scroll", handleScroll);
    })
})

  const exit = () => {
    dispatch(signOut());
  };

  return (
    <header className={cls}>
      <div className={header.logo}>
        <SiNike />
      </div>
      <div className={header.link}>
        <ul className={header.ul}>
          <li>
            <Link
              to="carusel"
              spy={true}
              smooth={true}
              offset={-80}
              duration={500}
            >
              <NavLink to="/">Главная</NavLink>
            </Link>
          </li>
          <li>
            <NavLink to="/news">Новинки</NavLink>
          </li>
          <li>
            <Link
              to="about"
              spy={true}
              smooth={true}
              offset={-80}
              duration={500}
            >
              <NavLink to="/about">О нас</NavLink>
            </Link>
          </li>
          <li>
            <NavLink to="/contacts">Контакты</NavLink>
          </li>
        </ul>
      </div>
      <div className={header.icon}>
        {token ? (
          <div className={header.heart}>
            <NavLink to="/favorites">
              <BsHeartFill title="Избранные" />
            </NavLink>
          </div>
        ) : (
          <div className={header.heart}>
            <NavLink to="/favorites">
              <BsHeartFill title="Избранные" />
            </NavLink>
          </div>
        )}
        {token ? (
          <div className={header.cart}>
            {amount <= 9 && amount > 0 ? (
              <div className={header.amount}>{amount}</div>
            ) : amount > 9 ? (
              <div className={header.amount}>9+</div>
            ) : null}
            <NavLink to="/cart">
              <IoCart className={header.cart_icon} title="Корзина" />
            </NavLink>
          </div>
        ) : (
          <div className={header.cart}>
            <NavLink to="/cart">
              <IoCart
                className={header.cart_icon}
                title="Корзина"
              />
            </NavLink>
          </div>
        )}
        <div className={header.user} onClick={() => setBlock(!block)}>
          {!token ? (
            <FaUserAlt
              title="Вход"
              onClick={() => setModalActive(true)}
              className={header.user__icon}
            />
          ) : (
            <div className={header.user__avatar}>
                <img src={avatar} alt="" />
            </div>
          )}
          {(token && block) && <div className={header.user__block}>
            <NavLink to='/profile'><li>Профиль</li></NavLink>
            <li onClick={exit}>Выход</li>
          </div>}
        </div>
      </div>
    </header>
  );
};

export default Header;
