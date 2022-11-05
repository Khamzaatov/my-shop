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

const Cart = () => {
  const dispatch = useDispatch();

  const loader = useSelector((state) => state.cart.loader);
  const token = useSelector((state) => state.user.token);

  const { setModalActive } = useContext(Context);

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  const basket = useSelector((state) => state.cart.cart.products);

  return (
    <div className={cart.container}>
      <BlockCart />

      {token ? (
        loader ? (
          <div className={cart.loader}>
            <Loader type="spinner-cub" bgColor={"#000"} size={90} />
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
            Ваша корзина пустая! <BsBagXFill />
          </div>
        )
      ) : (
        <div className={cart.info}>
          <span onClick={() => setModalActive(true)} className={cart.login}>Войдите </span> или
          <span onClick={() => setModalActive(true)} className={cart.registr}> зарегистрируйтесь </span>
          чтобы пользоваться корзиной <AiFillInfoCircle style={{ fontSize: "47px" }} />
        </div>
      )}
    </div>
  );
};

export default Cart;
