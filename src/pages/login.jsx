import { useState, useEffect } from "react";
import styles from "./login.module.css";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  PasswordInput,
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useSelector, useDispatch } from "react-redux";
import { authorization } from "../services/actions/authorization.js";

export function LoginPage() {
  const { user } = useSelector((store) => store.auth);
  const isAuth = Object.keys(user).length !== 0;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  // Состояние, в котором содержится значения полей ввода
  const [form, setValue] = useState({ email: "", password: "" });

  // Обработчик изменения полей ввода обновляет состояние
  const handleChange = (e) => {
    setValue({ ...form, [e.target.name]: e.target.value });
  };

  function onSubmit(e) {
    e.preventDefault();
    dispatch(authorization(form.email, form.password));
  }

  useEffect(() => {
    if (isAuth) {
      navigate(location.state?.from || "/");
    }
  }, [isAuth, navigate, location]);

  return (
    <div className={styles.App}>
      <section className={styles.container}>
        <form onSubmit={onSubmit} className={styles.form}>
          <p className="text text_type_main-medium mb-6">Вход</p>
          <div className={styles.inputContainer + " mb-6"}>
            <Input
              type={"text"}
              placeholder={"Email"}
              onChange={handleChange}
              icon={"EditIcon"}
              value={form.email}
              name={"email"}
              error={false}
              //ref={}
              //onIconClick={}
              errorText={"Ошибка"}
              size={"default"}
            />
          </div>
          <div className={styles.inputContainer + " mb-6"}>
            <PasswordInput
              onChange={handleChange}
              value={form.password}
              name={"password"}
              size={"default"}
            />
          </div>
          <Button onClick={onSubmit} type="primary" size="medium">
            Войти
          </Button>
          <div className={styles.wrapper + " mt-20"}>
            <p className="text text_type_main-default text_color_inactive">
              Вы — новый пользователь?
            </p>
            <Link className={styles.Link} to="/register">
              <Button type="secondary" size="medium">
                Зарегистрироваться
              </Button>
            </Link>
          </div>
          <div className={styles.wrapper + " mt-4"}>
            <p
              className={
                styles.paragraph +
                " text text_type_main-default text_color_inactive "
              }
            >
              Забыли пароль?
            </p>
            <Link className={styles.Link} to="/forgot-password">
              <Button type="secondary" size="medium">
                Восстановить пароль
              </Button>
            </Link>
          </div>
        </form>
      </section>
    </div>
  );
}
