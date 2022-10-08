import cart from "./cart.module.sass";
import { MdClose } from "react-icons/md";
import { AiFillPlusCircle } from "react-icons/ai";
import { AiFillMinusCircle } from "react-icons/ai";
import { useDispatch } from "react-redux";
import {
  decProductCart,
  deleteProduct,
  incProductCart,
} from "./../../features/cartSlice";

const CartItem = ({ name, img, price, amount, id }) => {
  const dispatch = useDispatch();

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
      <div className={cart.product}>
        <div className={cart.image}>
          <img src={img} alt="" />
        </div>
        <div className={cart.name}>{name}</div>
        <div className={cart.price}>{price}</div>
        <div className={cart.amount}>
          <AiFillPlusCircle onClick={() => incItem(id)} className={cart.plus} /> {amount}
          {amount > 1 ? <AiFillMinusCircle onClick={() => decItem(id)} className={cart.minus} /> : <AiFillMinusCircle style={{cursor : 'default'}} className={cart.minus} />}
        </div>
        <div className={cart.total}>{amount * price}</div>
        <div className={cart.remove}>
          <MdClose onClick={() => removeItem(id)} />
        </div>
      </div>
    </>
  );
};

export default CartItem;
