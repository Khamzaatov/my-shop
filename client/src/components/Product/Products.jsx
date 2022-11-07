import product from "./products.module.sass";
import { useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Context } from "./../../context/context";
import { addProduct, fetchCart } from "../../features/cartSlice";
import Button from '@mui/material/Button';
import { addProductFavorite } from "../../features/favoriteSlice";
import { BsFillBookmarkFill } from 'react-icons/bs'
import { FiMoreVertical } from 'react-icons/fi'
import IconButton from "@mui/material/IconButton";
import { fetchFavorite, deleteProductFavorite } from './../../features/favoriteSlice';
import { Link } from "react-router-dom";


const Products = ({ name, price, img, left, id, basket }) => {
  const dispatch = useDispatch()
  const { setModalActive } = useContext(Context);

  const token = useSelector((state) => state.user.token);
  const favorite = useSelector(state => state.favorite.favorite.products) 
  
  useEffect(() => {
    dispatch(fetchCart())
  }, [dispatch])

  useEffect(() => {
    dispatch(fetchFavorite())
  }, [dispatch])
  
  const cart = basket?.find((item) => {
    if (item.productId._id === id) {
      return item
    }
    return false
  })

  const favor = favorite?.find((item) => {
    if (item._id === id) {
      return item
    }
    return false
  })
    
  const handleClick = (id) => {
    dispatch(addProduct(id))
  };

  const toogleHeart = (id) => {
    dispatch(addProductFavorite(id))
  };

  const deleteHeart = (id) => {
    dispatch(deleteProductFavorite(id))
  }
  
  return (
    <div className={product.card}>
      <div className={product.image}>
        <Link to={`/details/${id}`}>
          <IconButton title="Подробнее" className={product.details}>
            <FiMoreVertical />
          </IconButton>
        </Link> 
        <img src={img} alt="" />
      </div>
      <div className={product.name}>
        <h4>{name}</h4>
        {token ? (
          !favor ? (
            <BsFillBookmarkFill onClick={() => toogleHeart(id)} className={product.heart} />
          ) : (
            <BsFillBookmarkFill
              onClick={() => deleteHeart(id)}
              className={product.heartActive}
            />
          )
        ) : null}
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
              <Button variant="contained"
                disabled={left === 0}
                style={{ backgroundColor: "#95ebeb", color : '#fff' }}
              >
                Нет в наличии
              </Button>
            ) : (
              <Button variant="outlined" className={product.inBasket} onClick={() => handleClick(id)}>
                В корзину
              </Button>
            )
          ) : (
            <Button variant="contained" disabled={cart} style={{ backgroundColor: "blue", color: "#fff" }}>
              Добавлено
            </Button>
          )
        ) : (
          <Button variant="outlined" className={product.inBasket} onClick={() => setModalActive(true)}>
            В корзину
          </Button>
        )}
      </div>
    </div>
  );
};

export default Products;
