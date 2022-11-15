import React, { useContext } from "react";
import style from "./product.module.sass";
import Carousel from "react-bootstrap/Carousel";
import Zoom from 'react-img-zoom'
import Loader from "react-js-loader";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchProducts } from "./../../features/productSlice";
import { useDispatch } from "react-redux";
import { BsHeart } from "react-icons/bs";
import { IoCart, IoChevronBackSharp } from "react-icons/io5";
import { AiFillCheckCircle } from "react-icons/ai";
import { Context } from "./../../context/context";
import { fetchCart, addProduct } from "../../features/cartSlice";
import { useSound } from "use-sound";
import sound from "../../assets/sound/song.mp3";

const ProductPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const [play] = useSound(sound);

  const token = useSelector((state) => state.user.token);
  const cart = useSelector((state) => state.cart.cart.products);
  const loader = useSelector((state) => state.cart.loader);
  const products = useSelector((state) => state.product.products);
  const product = products.find((item) => item._id === id);

  useEffect(() => {
    dispatch(fetchCart());
  });

  useEffect(() => {
    dispatch(fetchProducts("Все"));
  }, [dispatch]);

  const handleClick = (id) => {
    dispatch(addProduct(id));
  };

  const inCart = cart?.find(item => item.productId._id === product?._id)

  const { setModalActive } = useContext(Context);

  return (
    <div className={style.container}>
      <div className={style.image}>
        <div className={style.back} onClick={() => navigate(-1)}>
          <IoChevronBackSharp className={style.icon} />
          <span>Назад</span>
        </div>
        <Carousel className={style.carousel}>
          {product?.photos.map((item) => {
            return (
              <Carousel.Item className={style.img_item}>
                <div className={style.zoom}>
                  <Zoom
                    img={item}
                    zoomScale={2.5}
                    width={650}
                    height={560}
                  />
                </div>
              </Carousel.Item>
            );
          })}
        </Carousel>
      </div>
      <div className={style.info}>
        <h1>{product?.name}</h1>
        <h3>
          Стоимость :{" "}
          <span style={{ fontWeight: "bold" }}>{product?.price},00 ₽</span>
        </h3>
        <h3>
          В наличии :{" "}
          <span style={{ fontWeight: "bold" }}>{product?.left}</span>
        </h3>
        <div className={style.btn}>
          <div className={style.block1}>
            {token ? (
              product?.left === 0 ? (
                <button
                  style={{ opacity: "0.7" }}
                  disabled={product?.left === 0}
                  className={style.one}
                >
                  Нет в наличии <IoCart style={{ fontSize: "22px" }} />
                </button>
              ) : (
                <button
                  className={style.one}
                  disabled={inCart}
                  onClick={() => {
                    handleClick(product._id);
                    play();
                  }}
                >
                  {loader ? (
                    <div className={style.loader}>
                      <Loader type="spinner-cub" bgColor={"#fff"} size={25} />
                    </div>
                  ) : !inCart ? (
                    <span>
                      Добавить в корзину <IoCart style={{ fontSize: "22px" }} />
                    </span>
                  ) : (
                    <span>
                      Уже в корзине{" "}
                      <AiFillCheckCircle style={{ fontSize: "22px" }} />
                    </span>
                  )}
                </button>
              )
            ) : (
              <button
                onClick={() => setModalActive(true)}
                className={style.one}
              >
                Добавить в корзину <IoCart style={{ fontSize: "22px" }} />
              </button>
            )}
          </div>
          <div className={style.block2}>
            {token ? (
              <button>
                Добавить в избранные <BsHeart />
              </button>
            ) : (
              <button onClick={() => setModalActive(true)}>
                Добавить в избранные <BsHeart />
              </button>
            )}
          </div>
          <div className={style.data}>
            <h3>О ТОВАРЕ</h3>
            <div className={style.line}></div>
            <div className={style.lorem}>
              Практичные классические ботинки для уверенных в себе мужчин. Вы
              оцените высокое качество натуральной кожи и добротный пошив этой
              модели. Такие ботинки лучше всего подойдут к повседневному
              деловому костюму, но можно сочетать их и с брюками и свитером,
              курткой, пальто любой длины. Удобные и практичные ботинки на
              каждый день отлично дополнят гардероб в городском стиле.
              Качественный пошив, натуральная кожа, мягкий задник, не натирающий
              пятку, подарят комфорт в каждом шаге. Эту модель можно сочетать с
              классическими брюками и жакетом, курточкой или коротким пальто.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
