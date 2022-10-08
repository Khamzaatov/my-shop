import header from "./header.module.sass";
import { BsFillBagFill } from 'react-icons/bs'
import { FaUserAlt } from "react-icons/fa";
import { SiNike } from "react-icons/si";
import { ImExit } from "react-icons/im";
import { Context } from "./../../context/context";
import { useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import { BsHeartFill } from "react-icons/bs";
import { signOut } from "../../features/userSlice";
import { Link } from "react-router-dom";

const Header = () => {

  const dispatch = useDispatch();
  const { setModalActive } = useContext(Context);
  const token = useSelector((state) => state.user.token);
  const amount = useSelector(state => state.cart.cart.products?.length)

  const exit = () => {
    dispatch(signOut());
  };

  return (
    <div className={header.container}>
      <div className={header.logo}>
        <SiNike />
      </div>
      <div className={header.link}>
        <ul className={header.ul}>
          <li>
            <Link to="/">Главная</Link>
          </li>
          <li>
            <Link to="#">Новинки</Link>
          </li>
          <li>
            <Link to="/about">О нас</Link>
          </li>
          <li>
            <Link to="#">Контакты</Link>
          </li>
        </ul>
      </div>
      <div className={header.icon}>
        {token ? (
          <div className={header.heart}>
              <Link to='/favorites'>
                <BsHeartFill title="Избранные" />
              </Link>
            </div>
        ) : (
          <div className={header.heart}>
            <BsHeartFill
              onClick={() => setModalActive(true)}
              title="Избранные"
            />
          </div>
        )}
        {token ? (
          <div className={header.cart}>
             {amount > 0 && <div className={header.amount}>{amount}</div>} 
            <Link to="/cart">
              <BsFillBagFill
                className={header.cart_icon}
                title="Корзина"
              />
            </Link>
          </div>
        ) : (
          <div className={header.cart}>
            <BsFillBagFill
              className={header.cart_icon}
              onClick={() => setModalActive(true)}
              title="Корзина"
            />
          </div>
        )}
        <div className={header.user}>
          {!token ? (
            <FaUserAlt
              title="Вход"
              onClick={() => setModalActive(true)}
              style={{ fontSize: "24px" }}
            />
          ) : (
            <ImExit title="Выход" onClick={exit} className={header.exit} /> 
            )}
        </div>
      </div>
    </div>
  );
};

export default Header;
