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

  const dispatch = useDispatch();

  const error = useSelector((state) => state.user.error2);

  const tooglePassword = () => {
    setPasswordShown(!passwordSwown);
  };

  const handleSetEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleSetPassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(authSignIn({ email, password }))
  };

  const { modalActive, setModalActive, registr, setRegistr } =
    useContext(Context);

  const handleClick = () => {
    setRegistr(true);
  };

  const handleError = () => {
    if (!error) {
        setModalActive(false)
    } 
  }

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
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                value={email}
                onChange={handleSetEmail}
                placeholder="E-mail"
              />
              <div className="password-eye">
                <input
                  type={passwordSwown ? "text" : "password"}
                  value={password}
                  onChange={handleSetPassword}
                  placeholder="Пароль"
                />
                {passwordSwown ? (
                  <AiFillEye className="eye" onClick={tooglePassword} />
                ) : (
                  <AiFillEyeInvisible
                    className="eye"
                    onClick={tooglePassword}
                  />
                )}
              </div>
              {error && <div className='err'>Неверный логин или пароль!</div>}
              <button onClick={handleError}>Войти</button>
              <p style={{ fontSize: "14px", marginTop: "10px" }}>
                Ещё нет аккаунта?{" "}
                <Link onClick={handleClick}>Зарегистрируйтесь</Link>
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
