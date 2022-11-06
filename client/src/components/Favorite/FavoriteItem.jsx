import favorite from "./favorite.module.sass";
import { useDispatch, useSelector } from "react-redux";
import { deleteProductFavorite, fetchFavorite } from "./../../features/favoriteSlice";
import { VscChromeClose } from "react-icons/vsc";
import Button from "@mui/material/Button";
import { addProduct } from "../../features/cartSlice";
import { useEffect } from "react";

const FavoriteItem = ({ name, id, price, left, img }) => {
  const dispatch = useDispatch();

  const basket = useSelector((state) => state.cart.cart.products);

  const cart = basket?.find((item) => {
    if (item.productId._id === id) {
      return item;
    }
    return false;
  });

  const removeItem = (id) => {
    dispatch(deleteProductFavorite(id));
  };

  const handleClick = (id) => {
    dispatch(addProduct(id));
  };

  return (
    <>  
      <div className={favorite.card} key={id}>
        <div className={favorite.image}>
          <VscChromeClose
            onClick={() => removeItem(id)}
            className={favorite.remove}
          />
          <img src={img} alt="" />
        </div>
        <div className={favorite.name}>
          <h4>{name}</h4>
        </div>
        <div className={favorite.price}>
          Цена : <span style={{ fontWeight: "600" }}> {price} ₽</span>
        </div>
        <div className={favorite.category}>
          В наличии : <span style={{ fontWeight: "600" }}>{left}</span>
        </div>
        <div className={favorite.btn}>
          {!cart ? (
            left === 0 ? (
              <Button
                disabled={left === 0}
                className={favorite.notProducts}
                variant="outlined"
              >
                Нет в наличии
              </Button>
            ) : (
              <Button onClick={() => handleClick(id)} variant="outlined">
                В корзину
              </Button>
            )
          ) : (
            <Button
              disabled={cart}
              className={favorite.added}
              variant="contained"
            >
              Добавлено
            </Button>
          )}
        </div>
      </div>
    </>
  );
};

export default FavoriteItem;
