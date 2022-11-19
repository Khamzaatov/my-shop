import { useContext } from "react";
import { useSelector } from "react-redux";
import { Context } from "../../context/context";
import { Link } from "react-router-dom";
import style from "./paginate.module.sass";

const Paginations = () => {

  const { countriesPerPage, paginate, nextPage, previous } = useContext(Context);

  const totalCountries = useSelector((state) => state.product.products.length);

  const pageNumbers = [];

  for (let i = 1; i < Math.ceil(totalCountries / countriesPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className={style.center}>
      <div className={style.pagination}>
        <Link onClick={previous}>
          &laquo;
        </Link>
        {pageNumbers.map((number) => (
          <Link onClick={() => paginate(number)} key={number}>
            {number}
          </Link>
        ))}
        <Link onClick={nextPage}>
          &raquo;
        </Link>
      </div>
    </div>
  );
};

export default Paginations;
