import { useContext, useState } from "react";
import { Context } from "./../../context/context";
import { AiFillEye } from "react-icons/ai";
import { AiFillEyeInvisible } from "react-icons/ai";
import "./auth.sass";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { authSignUp } from "./../../features/userSlice";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordSwown, setPasswordShown] = useState(false);
  const [blur1, setBlur1] = useState(false);
  const [blur2, setBlur2] = useState(false);

  const dispatch = useDispatch();

  const error = useSelector((state) => state.user.error1);

  const handleEmail = (e) => {
    setEmail(e.target.value);
    setBlur1(false);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
    setBlur2(false);
  };

  const handleBlur = () => {
    if (!email) {
      setBlur1(true);
    }
  };

  const handleBlur2 = () => {
    if (!password) {
      setBlur2(true);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(authSignUp({ email, password })).then((data) => {
      if (!data.error) {
        setRegistr(false);
        setModalActive(true);
      }
    });
  };

  const { modalActive, setModalActive, setRegistr } = useContext(Context);

  const handleClick = () => {
    setRegistr(false);
    setModalActive(true);
  };

  return (
    <div
      className={modalActive ? "modal active" : "modal"}
      onClick={() => setModalActive(false)}
    >
      <div
        className={modalActive ? "modal__content active" : "modal__content"}
        onClick={(e) => e.stopPropagation()}
      >
        <h1>Регистрация</h1>
        <form onSubmit={(e) => handleSubmit(e)}>
          <input
            type="text"
            value={email}
            onBlur={handleBlur}
            onChange={handleEmail}
            placeholder="E-mail"
            style={
              blur1
                ? { border: "1px solid red" }
                : { border: "1px solid #d5d5d5" }
            }
          />
          <div className="password-eye">
            <input
              type={passwordSwown ? "text" : "password"}
              value={password}
              onBlur={handleBlur2}
              onChange={handlePassword}
              placeholder="Пароль"
              style={
                blur2
                  ? { border: "1px solid red" }
                  : { border: "1px solid #d5d5d5" }
              }
            />
            {passwordSwown ? (
              <AiFillEye
                className="eye"
                onClick={() => setPasswordShown(!passwordSwown)}
              />
            ) : (
              <AiFillEyeInvisible
                className="eye"
                onClick={() => setPasswordShown(!passwordSwown)}
              />
            )}
          </div>
          {error && <div className="err">{error}</div>}
          <button type="submit">Зарегистрироваться</button>
          <p style={{ fontSize: "14px", marginTop: "10px" }}>
            Уже есть аккаунт? <Link onClick={handleClick}>Войдите</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
