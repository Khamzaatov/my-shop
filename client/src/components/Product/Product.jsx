import React, { useContext } from "react";
import Products from "./Products";
import product from "./products.module.sass";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchProducts } from "./../../features/productSlice";
import { Context } from './../../context/context';

const Product = () => {
  const { min, max, search } = useContext(Context)

  const dispatch = useDispatch();
  const products = useSelector((state) => !min && !max ? state.product.products.map(item => item) : state.product.products.filter((el) => el.price >= min && el.price <= max));

  useEffect(() => {
    dispatch(fetchProducts('Все'));
  });

  const filteredSneakears = products.filter((el) => {
     return el.name.toLowerCase().includes(search.toLowerCase())
  })

  return (
    <div className={product.container}>
      <div className={product.product}>
        {filteredSneakears?.map((product) => {
          return (
            <Products
              id={product._id}
              name={product.name}
              price={product.price}
              left={product.left}
              category={product.category}
              img={product.img}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Product;
