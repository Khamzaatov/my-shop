import cat from "./category.module.sass";
import { useDispatch } from "react-redux";
import { fetchProducts } from "./../../features/productSlice";
import { useContext } from "react";
import { Context } from "./../../context/context";

const Category = () => {
  const { min, max, setMin, setMax, search, setSearch } = useContext(Context);

  const dispatch = useDispatch();

  const getCategory = (category) => {
    dispatch(fetchProducts(category));
  };

  const handleChangeMin = (e) => {
    setMin(e.target.value);
  };

  const handleChangeMax = (e) => {
    setMax(e.target.value);
  };

  const handleChangeSearch = (e) => {
    setSearch(e.target.value)
    console.log(e.target.value)
  }

  return (
    <div className={cat.container}>
      <div className={cat.row}>
        <div className={cat.search}>
          <div className={cat.title}>Поиск</div>
          <input type="text" value={search} onChange={handleChangeSearch} placeholder="Я ищу..." />
        </div>
        <div className={cat.category}>
          <div className={cat.title}>Категории</div>
          <div className={cat.list}>
            <button onClick={() => getCategory("Все")}>Все</button>
            <button onClick={() => getCategory("Мужские")}>Мужские</button>
            <button onClick={() => getCategory("Женские")}>Женские</button>
            <button onClick={() => getCategory("Детские")}>Детские</button>
          </div>
        </div>
        <div className={cat.price}>
          <div className={cat.title}>Цена, ₽</div>
          <div className={cat.inp}>
            <input
              className={cat.one}
              value={min}
              onChange={handleChangeMin}
              type="text"
              placeholder="От"
            />
            <input
              className={cat.second}
              value={max}
              onChange={handleChangeMax}
              type="text"
              placeholder="До"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Category;
