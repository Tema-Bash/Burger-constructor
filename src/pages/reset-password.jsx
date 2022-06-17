import { useState, useCallback } from "react";
import styles from "./registration.module.css";
import { Link } from "react-router-dom";
import {
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";

import { Navigate } from "react-router-dom";
import { resetPass } from "../services/api";

export function ResetPasswordPage({ visitForgotPass }) {
  // Состояние, в котором содержится значения полей ввода
  const [form, setValue] = useState({ token: "", password: "" });

  // Обработчик изменения полей ввода обновляет состояние
  const handleChange = (e) => {
    setValue({ ...form, [e.target.name]: e.target.value });
  };

  let savePassword = useCallback(
    (e) => {
      e.preventDefault();

      resetPass(form.token, form.password)
        .then((res) => {
          if (res && res.success) {
            return <Navigate to="/login" replace={true} />;
          }
        })
        .catch((res) => {
          alert(res);
        });
    },
    [form]
  );

  if (!visitForgotPass) {
    return <Navigate to="/forgot-password" replace={true} />;
  }

  return (
    <div className={styles.App}>
      <section className={styles.container}>
        <form className={styles.form}>
          <p className="text text_type_main-medium mb-6">
            Восстановление пароля
          </p>
          <div className={styles.inputContainer + " mb-6"}>
            <Input
              type={"password"}
              placeholder={"Введите новый пароль"}
              onChange={handleChange}
              //icon={'CurrencyIcon'}
              value={form.password}
              name={"password"}
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
              placeholder={"Введите код из письма"}
              onChange={handleChange}
              //icon={'CurrencyIcon'}
              value={form.token}
              name={"token"}
              error={false}
              //ref={inputRef}
              //onIconClick={onIconClick}
              errorText={"Ошибка"}
              size={"default"}
            />
          </div>
          <Button onClick={savePassword} type="primary" size="medium">
            Сохранить
          </Button>
          <div className={styles.wrapper + " mt-20"}>
            <p className="text text_type_main-default text_color_inactive">
              Вспомнили пароль?
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
