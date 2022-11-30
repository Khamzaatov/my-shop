import BlockCart from "../Block/BlockCart";
import CartItem from "./CartItem";
import cart from "./cart.module.sass";
import { useSelector, useDispatch } from "react-redux";
import { useContext, useEffect } from "react";
import { fetchCart } from "./../../features/cartSlice";
import { BsBagXFill } from "react-icons/bs";
import { AiFillInfoCircle } from "react-icons/ai";
import Loader from "react-js-loader";
import { Context } from "../../context/context";
import { Link } from "react-router-dom";

const Cart = () => {
  const dispatch = useDispatch();

  const loader = useSelector((state) => state.cart.loader);
  const token = useSelector((state) => state.user.token);
  const basket = useSelector((state) => state.cart.cart.products);
  const products = useSelector((state) => state.cart.cart.products?.length);
  const price = useSelector((state) =>
    state.cart.cart.products?.map((item) => item.productId.price)
  );
  const amount = useSelector((state) =>
    state.cart.cart.products?.map((item) => item.amount)
  );
  const arr = price?.map((item, index) => item * amount[index]);
  const totalPrice = arr?.reduce((acc, cur) => acc + cur, 0);

  const { setModalActive } = useContext(Context);

  useEffect(() => {
    dispatch(fetchCart());
  });

  return (
    <div className={cart.container}>
      <div className={cart.cart}>
        <BlockCart />
        {token ? (
          loader ? (
            <div className={cart.loader}>
              <Loader type="spinner-cub" bgColor={"#000"} size={100} />
            </div>
          ) : basket?.length > 0 ? (
            basket?.map((el) => {
              return (
                <CartItem
                  key={el.productId._id}
                  id={el.productId._id}
                  name={el.productId.name}
                  price={el.productId.price}
                  img={el.productId.img}
                  amount={el.amount}
                />
              );
            })
          ) : (
            <div className={cart.notInBasket}>
              Ваша корзина пуста <BsBagXFill />
            </div>
          )
        ) : (
          <div className={cart.info}>
            <span onClick={() => setModalActive(true)} className={cart.login}>
              Войдите{" "}
            </span>{" "}
            или
            <span onClick={() => setModalActive(true)} className={cart.registr}>
              {" "}
              зарегистрируйтесь{" "}
            </span>
            чтобы пользоваться корзиной{" "}
            <AiFillInfoCircle style={{ fontSize: "47px" }} />
          </div>
        )}
      </div>
      <div className={cart.decor}>
        <div className={cart.btn}>
          <Link to="/formalization">
            <button>Перейти к оформлению</button>
          </Link>
          <p>
            Доступные способы и время доставки можно выбрать при оформлении
            заказа
          </p>
        </div>
        <div className={cart.about}>
          <h5>Ваша корзина</h5>
          <div className={cart.list}>
            <li>Товары ({products})</li>
            <div className={cart.list__price}>
              <li>Общая стоимость</li>{" "}
              <li className={cart.li}>{totalPrice} ₽</li>{" "}
            </div>
            <div className={cart.list__discount}>
              <li>Скидка (10% от суммы 15000 ₽)</li>{" "}
              <li className={cart.li}>
                {totalPrice >= 15000
                  ? totalPrice - totalPrice / 10
                  : totalPrice}{" "}
                ₽
              </li>
            </div>
            <div className={cart.red}>
              <li> {totalPrice >= 15000 && -(totalPrice / 10) + "₽"}</li>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
