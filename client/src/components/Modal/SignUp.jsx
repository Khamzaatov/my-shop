import { useContext, useState } from "react";
import { Context } from "./../../context/context";
import { AiFillEye } from "react-icons/ai";
import { AiFillEyeInvisible } from "react-icons/ai";
import "./auth.sass";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import MaskedInput from 'react-text-mask'
import { authSignUp } from "./../../features/userSlice";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("")
  const [username, setUsername] = useState("")
  const [phone, setPhone] = useState("")
  const [gender, setGender] = useState("")
  const [passwordSwown, setPasswordShown] = useState(false);
  const [passwordSwown2, setPasswordShown2] = useState(false);
  const [submit,  setSubmit] = useState(false)

  const dispatch = useDispatch();
  const error = useSelector((state) => state.user.error1);

  const handleSubmit = (e) => {
    e.preventDefault();
    if ((password === password2) && (username, phone)) {
      dispatch(authSignUp({ email, password, username, phone, gender })).then((data) => {
        if (!data.error) {
          setRegistr(false);
          setModalActive(true);
        }
      });
    }
    setSubmit(true)
  };

  const { modalActive, setModalActive, setRegistr } = useContext(Context);

  const handleClick = () => {
    setRegistr(false);
  };

  return (
    <div
      className={modalActive ? "modal active" : "modal"}
      onClick={() => setModalActive(false)}
    >
      <div
        style={{ height: "81vh" }}
        className={modalActive ? "modal__content active" : "modal__content"}
        onClick={(e) => e.stopPropagation()}
      >
        <h1>Регистрация</h1>
        <form onSubmit={(e) => handleSubmit(e)}>
          <p>
            <input type="text" placeholder=" " required value={username} onChange={(e) => setUsername(e.target.value)} />
            <label>Имя пользователя</label>
          </p>
          <p>
            <input
              type="text"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder=" "
            />
            <label className="label-email">E-mail</label>
          </p>
          <select value={gender} onChange={(e) => setGender(e.target.value)} >
            <option hidden>Пол (не обязательно)</option>
            <option value='Мужской'>Мужской</option>
            <option value='Женский'>Женский</option>
          </select>
          <div className="password-eye">
            <p>
              <input
                type={passwordSwown ? "text" : "password"}
                value={password}
                required
                onChange={(e) => setPassword(e.target.value)}
                placeholder=" "
              />
              <label className="label-password">Пароль</label>
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
            </p>
          </div>
          <div className="password-eye">
            <p>
              <input
                type={passwordSwown2 ? "text" : "password"}
                placeholder=" "
                required
                value={password2}
                onChange={(e) => setPassword2(e.target.value)}
                stlye={{position : 'relative'}}
              />
              <label>Повторите пароль</label>
              {(submit && password !== password2) && <div className="error">Пароли не совпадают!</div>}
              {passwordSwown2 ? (
                <AiFillEye
                  className="eye"
                  onClick={() => setPasswordShown2(!passwordSwown2)}
                />
              ) : (
                <AiFillEyeInvisible
                  className="eye"
                  onClick={() => setPasswordShown2(!passwordSwown2)}
                />
              )}
            </p>
          </div>
          <p>
          <MaskedInput
            mask={['+', /\d/, ' ', '(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/]}
            placeholder=" "
            guide={false}
            value={phone}
            id="my-input-id"
            onChange={(e) => setPhone(e.target.value)}
          />
            <label>Номер телефона</label>
          </p>
          {error && (
            <div className="err" style={{ top: "427px" }}>
              {error}
            </div>
          )}
          <button type="submit">Зарегистрироваться</button>
          <p className="link">
            Уже есть аккаунт? <Link onClick={handleClick}>Войдите</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
