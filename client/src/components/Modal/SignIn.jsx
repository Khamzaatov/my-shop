import { useContext, useState } from "react";
import { Context } from "./../../context/context";
import { AiFillEye } from "react-icons/ai";
import { AiFillEyeInvisible } from "react-icons/ai";
import "./auth.sass";
import { Link } from "react-router-dom";
import { authSignIn } from "../../features/userSlice";
import { useDispatch } from "react-redux";
import SignUp from "./SignUp";
import { useSelector } from "react-redux";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordSwown, setPasswordShown] = useState(false);
  const [blur1, setBlur1] = useState(false);
  const [blur2, setBlur2] = useState(false);

  const dispatch = useDispatch();

  const error = useSelector((state) => state.user.error2);

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
    dispatch(authSignIn({ email, password })).then((data) => {
      if (!data.error) {
        setModalActive(false);
      }
    });
    setModalActive(true);
  };

  const { modalActive, setModalActive, registr, setRegistr } =
    useContext(Context);

  return (
    <>
      {!registr ? (
        <div
          className={modalActive ? "modal active" : "modal"}
          onClick={() => setModalActive(false)}
        >
          <div
            className={modalActive ? "modal__content active" : "modal__content"}
            onClick={(e) => e.stopPropagation()}
          >
            <h1>Авторизация</h1>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                value={email}
                onChange={handleEmail}
                onBlur={handleBlur}
                style={
                  blur1
                    ? { border: "1px solid red" }
                    : { border: "1px solid #d5d5d5" }
                }
                placeholder="E-mail"
              />
              <div className="password-eye">
                <input
                  type={passwordSwown ? "text" : "password"}
                  value={password}
                  onBlur={handleBlur2}
                  onChange={handlePassword}
                  style={
                    blur2
                      ? { border: "1px solid red" }
                      : { border: "1px solid #d5d5d5" }
                  }
                  placeholder="Пароль"
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
              {error && <div className="err">Неверный логин или пароль!</div>}
              <button>Войти</button>
              <p style={{ fontSize: "14px", marginTop: "10px" }}>
                Ещё нет аккаунта?{" "}
                <Link onClick={() => setRegistr(true)}>Зарегистрируйтесь</Link>
              </p>
            </form>
          </div>
        </div>
      ) : (
        <SignUp />
      )}
    </>
  );
};

export default SignIn;
