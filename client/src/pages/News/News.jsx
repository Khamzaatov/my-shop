import news from "./news.module.sass";
import Category from "./../../components/Category/Category";
import Product from "../../components/Product/Product";

const News = () => {
  return (
    <div className={news.container}>
      <div className={news.category}>
        <Category />
      </div>
      <div className={news.product}>
        <Product />
      </div>
    </div>
  );
};

export default News;
