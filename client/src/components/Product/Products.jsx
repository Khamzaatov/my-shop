import product from "./products.module.sass";
import { useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Context } from "./../../context/context";
import { addProduct, fetchCart } from "../../features/cartSlice";
import Button from '@mui/material/Button';
import { addProductFavorite } from "../../features/favoriteSlice";
import { BsFillBookmarkFill } from 'react-icons/bs'
import { fetchFavorite, deleteProductFavorite } from './../../features/favoriteSlice';


const Products = ({ name, price, img, left, id }) => {
  const dispatch = useDispatch()
  const { setModalActive } = useContext(Context);

  const token = useSelector((state) => state.user.token);
  const basket = useSelector(state => state.cart.cart.products)
  const favorite = useSelector(state => state.favorite.favorite.products) 
  
  useEffect(() => {
    dispatch(fetchCart())
  }, [dispatch])

  useEffect(() => {
    dispatch(fetchFavorite())
  }, [dispatch])
  
  const cart = basket?.find((item) => {
    if (item.productId._id === id) {
      return true
    }
    return false
  })

  const favor = favorite?.find((item) => {
    if (item._id === id) {
      return true
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
              <Button variant="outlined" className={product.inBasket} disabled={left === 0} onClick={() => handleClick(id)}>
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