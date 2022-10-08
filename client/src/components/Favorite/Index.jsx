import favorite from "./favorite.module.sass";
import FavoriteItem from "./FavoriteItem";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchFavorite } from "./../../features/favoriteSlice";
import { useSelector } from "react-redux";
import { GiBrokenHeart } from "react-icons/gi";
import Loader from "react-js-loader";
import { fetchCart } from "../../features/cartSlice";

const Index = () => {
  const dispatch = useDispatch();

  const favorites = useSelector((state) => state.favorite.favorite.products);
  const loader = useSelector((state) => state.favorite.loader);

  useEffect(() => {
    dispatch(fetchFavorite());
  });

  useEffect(() => {
    dispatch(fetchCart())
  })

  return (
    <div className={favorite.container}>
      {favorites?.length > 0 ? (
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
      )}
    </div>
  );
};

export default Index;
