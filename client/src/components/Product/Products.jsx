import product from "./products.module.sass";
import Button from "@mui/material/Button";
import Loader from "react-js-loader";
import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Context } from "./../../context/context";
import { addProduct, fetchCart } from "../../features/cartSlice";
import { addProductFavorite, fetchFavorite } from "../../features/favoriteSlice";
import { BsFillBookmarkFill } from "react-icons/bs";
import { deleteProductFavorite } from "./../../features/favoriteSlice";
import { Link } from "react-router-dom";

const Products = ({ name, price, img, left, id, basket }) => {
  const dispatch = useDispatch();
  const { setModalActive } = useContext(Context);

  let loader = useSelector((state) => state.cart.loader);
  const token = useSelector((state) => state.user.token);
  const favorite = useSelector((state) => state.favorite.favorite.products);

  const cart = basket?.find((item) => item.productId._id === id);
  const favor = favorite?.find((item) => item._id === id);

  const [loading, setLoading] = useState(loader);

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchFavorite());
  }, [dispatch]);

  const handleClick = (id) => {
    setLoading(id);
    dispatch(addProduct(id));
  };

  const toogleHeart = (id) => {
    dispatch(addProductFavorite(id));
  };

  const deleteHeart = (id) => {
    dispatch(deleteProductFavorite(id));
  };

  return (
    <div className={product.card} key={id}>
      <Link to={`/details/${id}`}>
        <div className={product.image}>
          <img src={img} alt="" />
        </div>
      </Link>
      <div className={product.name}>
        <h4>{name}</h4>
        {token ? (
          !favor ? (
            <BsFillBookmarkFill
              onClick={() => toogleHeart(id)}
              className={product.heart}
            />
          ) : (
            <BsFillBookmarkFill
              onClick={() => deleteHeart(id)}
              className={product.heartActive}
            />
          )
        ) : (
          <BsFillBookmarkFill
            onClick={() => setModalActive(true)}
            className={product.heart}
          />
        )}
      </div>
      <div className={product.price}>
        Цена : <span style={{ fontWeight: "600" }}>{price} ₽</span>
      </div>
      <div className={product.category}>
        В наличии : <span style={{ fontWeight: "600" }}>{left}</span>
      </div>
      <div className={product.btn}>
        {token ? (
          !cart ? (
            left === 0 ? (
              <Button
                variant="contained"
                disabled={left === 0}
                style={{ backgroundColor: "#95ebeb", color: "#fff" }}
              >
                Нет в наличии
              </Button>
            ) : (
              <Button
                variant="outlined"
                className={product.inBasket}
                onClick={() => handleClick(id)}
              >
                {loading ? (
                  <Loader
                    key={id}
                    type="spinner-cub"
                    bgColor={"#fff"}
                    size={30}
                  />
                ) : (
                  <span>В корзину</span>
                )}
              </Button>
            )
          ) : (
            <Button
              variant="contained"
              disabled={cart}
              style={{ backgroundColor: "blue", color: "#fff" }}
            >
              Добавлено
            </Button>
          )
        ) : (
          <Button
            variant="outlined"
            className={product.inBasket}
            onClick={() => setModalActive(true)}
          >
            В корзину
          </Button>
        )}
      </div>
    </div>
  );
};

export default Products;
