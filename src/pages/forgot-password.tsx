import { useState, useCallback, SyntheticEvent } from "react";
import styles from "./registration.module.css";
import { Link } from "react-router-dom";
import {
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { forgotPass } from "../services/api";
import { useNavigate } from "react-router-dom";

interface IForgotPasswordPage {
  setVisitForgotPass: React.Dispatch<React.SetStateAction<boolean>>;
}

export function ForgotPasswordPage({
  setVisitForgotPass,
}: IForgotPasswordPage) {
  // Состояние, в котором содержится значения полей ввода
  const [form, setValue] = useState({ name: "", email: "", password: "" });
  // Обработчик изменения полей ввода обновляет состояние
  const handleChange = (e: SyntheticEvent) => {
    let target = e.target as HTMLInputElement;
    setValue({ ...form, [target.name]: target.value });
  };
  const navigate = useNavigate();
  let resetHandler = useCallback(
    (e) => {
      e.preventDefault();
      setVisitForgotPass(true);

      forgotPass(form.email)
        .then((res) => {
          if (res && res.success) {
            navigate("/reset-password");
          }
        })
        .catch((res) => {
          alert(res);
        });
    },
    [form]
  );

  return (
    <div className={styles.App}>
      <section className={styles.container}>
        <form onSubmit={resetHandler} className={styles.form} id="form-forgot">
          <p className="text text_type_main-medium mb-6">
            Восстановление пароля
          </p>
          <div className={styles.inputContainer + " mb-6"}>
            <Input
              type={"email"}
              placeholder={"Укажите email"}
              onChange={handleChange}
              //icon={'CurrencyIcon'}
              value={form.email}
              name={"email"}
              error={false}
              //ref={inputRef}
              //onIconClick={onIconClick}
              errorText={"Ошибка"}
              size={"default"}
            />
          </div>
          <Button type="primary" size="medium">
            Восстановить
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
