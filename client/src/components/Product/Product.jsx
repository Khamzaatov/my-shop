import Products from "./Products";
import product from "./products.module.sass";
import { useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchProducts } from "./../../features/productSlice";
import { Context } from './../../context/context';
import Paginations from './../Pagination/Pagination';

const Product = () => {
  const { min, max, search, currentPage, countriesPerPage } = useContext(Context)

  const dispatch = useDispatch();
  const products = useSelector((state) => !min && !max ? state.product.products.map(item => item) : state.product.products.filter((el) => el.price >= min && el.price <= max));
  const basket = useSelector(state => state.cart.cart.products)

  useEffect(() => {
    dispatch(fetchProducts('Все'));
  }, [dispatch]);

  const filteredSneakears = products.filter((item) => {
    return item.name.toLowerCase().includes(search.toLowerCase())
  })

  const lastCountryIndex = currentPage * countriesPerPage
  const firstCountryIndex = lastCountryIndex - countriesPerPage
  const currentCountry = filteredSneakears.slice(firstCountryIndex, lastCountryIndex)
  
  return (
    <>
      <div className={product.container}>
        {((search || (min && max)) && currentCountry < 1) ? <h1>По вашему запросу ничего не найдено!</h1> : (search) ? <h1>Поиск по запросу: "{search}"</h1> : null}
        <div className={product.product} id='product'>
          {currentCountry.map((product) => {
            return (
              <Products
                key={product._id}
                id={product._id}
                name={product.name}
                price={product.price}
                left={product.left}
                category={product.category}
                img={product.img}
                basket={basket}
              />
            );
          })}
        </div>
      </div>
      {!(currentCountry < 1) && <Paginations />}
    </>
  );
};

export default Product;
