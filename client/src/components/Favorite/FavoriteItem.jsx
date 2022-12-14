import favorite from "./favorite.module.sass";
import IconButton from "@mui/material/IconButton";
import Loader from "react-js-loader";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import { deleteProductFavorite } from "./../../features/favoriteSlice";
import { VscChromeClose } from "react-icons/vsc";
import { addProduct } from "../../features/cartSlice";
import { useState } from "react";

const FavoriteItem = ({ name, id, price, left, img }) => {
  const dispatch = useDispatch();

  let loader = useSelector((state) => state.cart.loader);
  const basket = useSelector((state) => state.cart.cart.products);

  const [loading, setLoading] = useState(loader);

  const cart = basket?.find((item) => item.productId._id === id);

  const removeItem = (id) => {
    dispatch(deleteProductFavorite(id));
  };

  const handleClick = (id) => {
    setLoading(id);
    dispatch(addProduct(id));
  };

  return (
    <>
      <div className={favorite.card} key={id}>
        <div className={favorite.image}>
          <IconButton className={favorite.remove}>
            <VscChromeClose onClick={() => removeItem(id)} />
          </IconButton>
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
                {loading ? (
                  <div className={favorite.loading}>
                    <Loader
                      key={id}
                      type="spinner-cub"
                      bgColor={"red"}
                      size={30}
                    />
                  </div>
                ) : (
                  <span>В корзину</span>
                )}
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
