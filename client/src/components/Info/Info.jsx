import { useDispatch } from "react-redux";
import { fetchProducts } from "../../features/productSlice";
import { Link } from "react-scroll";
import info from "./info.module.sass";
import BlockInfo from "../Block/BlockInfo";

const Info = () => {
  const dispatch = useDispatch();

  const getCategory = (category) => {
    dispatch(fetchProducts(category));
  };

  return (
    <div className={info.container}>
      <BlockInfo />
      <div className={info.images}>
        <div className={info.images__block1}>
          <img
            src="https://assets.gq.ru/photos/613af1dc99aecdd0dc66c3d2/master/w_1600%2Cc_limit/GettyImages-1235139698.jpg"
            alt=""
          />
          <Link to="product" offset={0} duration={500}>
            <div onClick={() => getCategory("Мужские")} className={info.text}>
              Мужчинам
            </div>
          </Link>
        </div>
        <div className={info.images__block2}>
          <img
            src="https://ohfashion.ru/wp-content/uploads/2019/08/Devushka-v-velosipednyih-shortah-rozovyiy-bleyzer-i-krossovki.jpg"
            alt=""
          />
          <Link to="product" offset={0} duration={500}>
            <div onClick={() => getCategory("Женские")} className={info.text}>
              Женщинам
            </div>
          </Link>
        </div>
        <div className={info.images__block3}>
          <img
            src="https://st2.depositphotos.com/2002575/8222/i/950/depositphotos_82222852-stock-photo-fashionable-child-in-leather-coat.jpg"
            alt=""
          />
          <Link to="product" offset={0} duration={500}>
            <div onClick={() => getCategory("Детские")} className={info.text}>
              Детям
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Info;
