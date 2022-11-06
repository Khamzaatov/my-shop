import React, { useContext } from "react";
import style from "./product.module.sass";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchProducts } from "./../../features/productSlice";
import { useDispatch } from "react-redux";
import { BsHeart } from "react-icons/bs";
import { IoCart, IoChevronBackSharp } from "react-icons/io5";
import { Context } from "./../../context/context";
import { fetchCart } from "../../features/cartSlice";

const ProductPage = () => {
  const { setModalActive } = useContext(Context);

  const dispatch = useDispatch();
  const navigate = useNavigate()
  const { id } = useParams();

  useEffect(() => {
    dispatch(fetchProducts("Все"));
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  const token = useSelector((state) => state.user.token);
  const products = useSelector((state) => state.product.products);
  const product = products.find((item) => item._id === id);

  return (
    <div className={style.container}>
      <div className={style.image}>
        <div className={style.back} onClick={() => navigate(-1)}>
          <IoChevronBackSharp className={style.icon}/>
          <span>Назад</span>
        </div>
        <img src={product?.img} alt="" />
      </div>
      <div className={style.info}>
        <h1>{product?.name}</h1>
        <h3>
          Стоимость :{" "}
          <span style={{ fontWeight: "bold" }}>{product?.price},00 ₽</span>
        </h3>
        <h3>
          В наличии :{" "}
          <span style={{ fontWeight: "bold" }}>{product?.left} штук</span>
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
                  Добавить в корзину <IoCart style={{ fontSize: "22px" }} />
                </button>
              ) : (
                <button className={style.one}>
                  Добавить в корзину <IoCart style={{ fontSize: "22px" }} />
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
