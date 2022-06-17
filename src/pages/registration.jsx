import { useState } from "react";
import styles from "./registration.module.css";
import { Link } from "react-router-dom";
import {
  PasswordInput,
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";

import { useDispatch } from "react-redux";
import { registerRequest } from "../services/actions/authorization.js";

export function RegistrationPage() {
  const dispatch = useDispatch();
  // Состояние, в котором содержится значения полей ввода
  const [form, setValue] = useState({ name: "", email: "", password: "" });

  // Обработчик изменения полей ввода обновляет состояние
  const handleChange = (e) => {
    setValue({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegisterClick = (e) => {
    e.preventDefault();
    dispatch(registerRequest(form.name, form.email, form.password));
  };

  return (
    <div className={styles.App}>
      <section className={styles.container}>
        <form className={styles.form}>
          <p className="text text_type_main-medium mb-6">Регистрация</p>
          <div className={styles.inputContainer + " mb-6"}>
            <Input
              type={"text"}
              placeholder={"Имя"}
              onChange={handleChange}
              //icon={'CurrencyIcon'}
              value={form.name}
              name={"name"}
              error={false}
              //ref={inputRef}
              //onIconClick={onIconClick}
              errorText={"Ошибка"}
              size={"default"}
            />
          </div>
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
          <Button onClick={handleRegisterClick} type="primary" size="medium">
            Зарегистрироваться
          </Button>
          <div className={styles.wrapper + " mt-20"}>
            <p className="text text_type_main-default text_color_inactive">
              Уже зарегистрированы?
            </p>
            <Link className={styles.Link} to="/login">
              <Button type="secondary" size="medium">
                Войти
              </Button>
            </Link>
          </div>
        </form>
      </section>
    </div>
  );
}
