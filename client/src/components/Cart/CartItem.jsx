import cart from "./cart.module.sass";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { AiFillPlusCircle } from "react-icons/ai";
import { AiFillMinusCircle } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { decProductCart, deleteProduct, fetchCart, incProductCart } from "./../../features/cartSlice";
import { useEffect } from "react";
import { fetchProducts } from './../../features/productSlice';

const CartItem = ({ name, img, price, amount, id }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCart())
  }, [dispatch])

  useEffect(() => {
    dispatch(fetchProducts('Все'))
  }, [dispatch])

  const removeItem = (id) => {
    dispatch(deleteProduct(id));
  };

  const incItem = (id) => {
    dispatch(incProductCart(id));
  };

  const decItem = (id) => {
    dispatch(decProductCart(id));
  };

  return (
    <>
      <div className={cart.product} key={id}>
        <div className={cart.image}>
          <img src={img} alt="" />
        </div>
        <div className={cart.name}>{name}</div>
        <div className={cart.price}>{price}</div>
        <div className={cart.amount}>
          <AiFillPlusCircle onClick={() => incItem(id)} className={cart.plus} />{" "}
          {amount}
          {amount > 1 ? (
            <AiFillMinusCircle
              onClick={() => decItem(id)}
              className={cart.minus}
            />
          ) : (
            <AiFillMinusCircle
              style={{ cursor: "default" }}
              className={cart.minus}
            />
          )}
        </div>
        <div className={cart.total}>{amount * price}</div>
        <div className={cart.remove}>
          <IconButton onClick={() => removeItem(id)} className={cart.remove__icon} aria-label="delete">
            <DeleteIcon />
          </IconButton>
        </div>
      </div>
    </>
  );
};

export default CartItem;
