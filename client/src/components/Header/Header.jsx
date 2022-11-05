import header from "./header.module.sass";
import { BsFillBagFill } from "react-icons/bs";
import { FaUserAlt } from "react-icons/fa";
import { SiNike } from "react-icons/si";
import { ImExit } from "react-icons/im";
import { Context } from "./../../context/context";
import { useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import { BsHeartFill } from "react-icons/bs";
import { signOut } from "../../features/userSlice";
import { NavLink } from "react-router-dom";
import { Link } from "react-scroll";

const Header = () => {
  const dispatch = useDispatch();
  const { setModalActive } = useContext(Context);
  const token = useSelector((state) => state.user.token);
  const amount = useSelector((state) => state.cart.cart.products?.length);

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
              <BsFillBagFill className={header.cart_icon} title="Корзина" />
            </NavLink>
          </div>
        ) : (
          <div className={header.cart}>
            <NavLink to="/cart">
              <BsFillBagFill
                className={header.cart_icon}
                title="Корзина"
              />
            </NavLink>
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
