import favorite from "./favorite.module.sass";
import FavoriteItem from "./FavoriteItem";
import { useContext, useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchFavorite } from "./../../features/favoriteSlice";
import { useSelector } from "react-redux";
import { GiBrokenHeart } from "react-icons/gi";
import { AiFillInfoCircle } from 'react-icons/ai'
import Loader from "react-js-loader";
import { fetchCart } from "../../features/cartSlice";
import { Context } from "../../context/context";

const Index = () => {
  const dispatch = useDispatch();

  const { setModalActive } = useContext(Context)

  const favorites = useSelector((state) => state.favorite.favorite.products);
  const loader = useSelector((state) => state.favorite.loader);
  const token = useSelector((state) => state.user.token);

  useEffect(() => {
    dispatch(fetchFavorite());
  })

  useEffect(() => {
    dispatch(fetchCart())
  })

  return (
    <div className={favorite.container}>
      { token ?
      favorites?.length > 0 ? (
        loader ? (
          <div className={favorite.loader}>
            <Loader type="spinner-cub" bgColor={"#000"} size={90} />
          </div>
        ) : (
          favorites?.map((item) => {
            return (
              <FavoriteItem
                key={item._id}
                id={item._id}
                img={item.img}
                name={item.name}
                price={item.price}
                left={item.left}
              />
            );
          })
        )
      ) : (
        <div className={favorite.notInFavorite}>
          Пока нет избранных <GiBrokenHeart />
        </div>
      )
    :
    <div className={favorite.info}>
          <span onClick={() => setModalActive(true)} className={favorite.login}>Войдите </span> или
          <span onClick={() => setModalActive(true)} className={favorite.registr}> зарегистрируйтесь </span>
          чтобы пользоваться избранными <AiFillInfoCircle style={{ fontSize: "47px" }} />
        </div>
    }
    </div>
  );
};

export default Index;
