import BlockCart from "../Block/BlockCart";
import CartItem from "./CartItem";
import cart from "./cart.module.sass";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchCart } from "./../../features/cartSlice";
import { BsBagXFill } from 'react-icons/bs'
import Loader from "react-js-loader";

const Cart = () => {
  const dispatch = useDispatch();

  const loader = useSelector((state) => state.cart.loader);

  useEffect(() => {
    dispatch(fetchCart());
  });

  const basket = useSelector((state) => state.cart.cart.products);

  return (
    <div className={cart.container}>
      <BlockCart />
      {loader ? (
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
      )}
    </div>
  );
};

export default Cart;
