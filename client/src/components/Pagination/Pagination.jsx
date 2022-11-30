import { useContext } from "react";
import { useSelector } from "react-redux";
import { Context } from "../../context/context";
import { NavLink } from "react-router-dom";
import { Link } from "react-scroll";
import style from "./paginate.module.sass";

const Paginations = () => {
  const { countriesPerPage, paginate, nextPage, previous } =
    useContext(Context);

  const totalCountries = useSelector((state) => state.product.products.length);

  const pageNumbers = [];

  for (let i = 1; i < Math.ceil(totalCountries / countriesPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className={style.center}>
      <div className={style.pagination}>
        <Link to="block" offset={0} duration={500}>
          <NavLink className={style.link} onClick={previous}>
            &laquo;
          </NavLink>
        </Link>
        {pageNumbers.map((number) => (
          <Link to="block" offset={100} duration={500}>
            <NavLink
              className={style.link}
              onClick={() => paginate(number)}
              key={number}
            >
              {number}
            </NavLink>
          </Link>
        ))}
        <Link to="block" offset={0} duration={500}>
          <NavLink className={style.link} onClick={nextPage}>
            &raquo;
          </NavLink>
        </Link>
      </div>
    </div>
  );
};

export default Paginations;
