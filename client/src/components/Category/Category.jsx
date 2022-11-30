import cat from "./category.module.sass";
import { RiCloseLine } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { fetchProducts } from "./../../features/productSlice";
import { useContext, useRef } from "react";
import { Context } from "./../../context/context";

const Category = () => {
  const inputRef = useRef();
  const { min, max, setMin, setMax, search, setSearch } = useContext(Context);

  const dispatch = useDispatch();

  const getCategory = (category) => {
    dispatch(fetchProducts(category));
  };

  const handleClear = () => {
    setSearch("");
    inputRef.current.focus();
  };

  return (
    <div className={cat.container}>
      <div className={cat.filter}>
        <div className={cat.row}>
          <div className={cat.search}>
            <div className={cat.title}>Поиск</div>
            <div className={cat.search__close}>
              <input
                ref={inputRef}
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Я ищу..."
              />
              {search && (
                <RiCloseLine
                  onClick={handleClear}
                  className={cat.close__icon}
                />
              )}
            </div>
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
                onChange={(e) => setMin(e.target.value)}
                type="number"
                placeholder="От"
              />
              <input
                className={cat.second}
                value={max}
                onChange={(e) => setMax(e.target.value)}
                type="number"
                placeholder="До"
              />
            </div>
          </div>
        </div>
      </div>
      <div className={cat.line}></div>
    </div>
  );
};

export default Category;
