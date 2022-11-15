import { Link } from "react-router-dom";
import style from "./notfound.module.sass";

const NotFound = () => {
  return (
    <div className={style.container}>
      <h1>Ошибка 404</h1>
      <div className={style.text}>
        <p>
          Упс... Такой страницы не существует :(
        </p>
      </div>
      <Link to="/">
        <button>Перейти на главную</button>
      </Link>
    </div>
  );
};

export default NotFound;
