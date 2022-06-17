import React, { useState, useCallback, useEffect } from "react";
import styles from "./profile.module.css";
import { NavLink, useLocation } from "react-router-dom";
import {
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch, useSelector } from "react-redux";
import { getCookie } from "../utils/utils";
import { Navigate, useNavigate } from "react-router-dom";
import {
  exitRequest,
  profileRequest,
  updateRequest,
} from "../services/actions/authorization.js";

export function ProfilePage() {
  const { pathname } = useLocation();
  const { user } = useSelector((store) => store.auth);
  // Состояние, в котором содержится значения полей ввода
  const [form, setValue] = useState({
    name: user?.name,
    login: user?.email,
    password: "",
  });
  const dispatch = useDispatch();

  //Правило для отображения кнопок "сохранить" и "отмена"
  let rule = !(form.login == user.email) || !(form.name == user.name);

  // Обработчик изменения полей ввода обновляет состояние
  const handleChange = (e) => {
    setValue({ ...form, [e.target.name]: e.target.value });
  };

  let getProfile = useEffect(() => {
    dispatch(profileRequest(getCookie("accessToken")));
    setValue({ ...form, name: user.name, login: user.email });
  }, []);

  let saveProfile = useCallback((e) => {
    e.preventDefault();
    dispatch(
      updateRequest(
        getCookie("accessToken"),
        form.login,
        form.name,
        form.password
      )
    );
  }, []);

  const navigate = useNavigate();
  let logOut = useCallback(async () => {
    await dispatch(exitRequest(localStorage.getItem("refreshToken")));
    navigate("/login");
  });

  return (
    <div className={styles.App}>
      <section className={styles.container}>
        <ul className={styles.navList}>
          <li className={styles.listItem}>
            <NavLink
              //activeClassName={styles.linkActive}
              to={{ pathname: "/profile" }}
              className={styles.item}
            >
              <p
                className={`text text_type_main-medium ${
                  pathname == "/profile"
                    ? styles.linkActive
                    : "text_color_inactive"
                }`}
              >
                Профиль
              </p>
            </NavLink>
          </li>
          <li className={styles.listItem}>
            <NavLink
              //activeClassName={styles.linkActive}
              to={{ pathname: "/order-list" }}
              className={styles.item}
            >
              <p
                className={`text text_type_main-medium ${
                  pathname == "/order-list"
                    ? styles.linkActive
                    : "text_color_inactive"
                }`}
              >
                История заказов
              </p>
            </NavLink>
          </li>
          <li className={styles.listItem} onClick={() => logOut()}>
            <NavLink
              //activeClassName={styles.linkActive}
              to={{ pathname: "/login" }}
              className={styles.item}
            >
              <p className="text text_type_main-medium text_color_inactive">
                Выход
              </p>
            </NavLink>
          </li>
          <li className="mt-20">
            <p className="text text_type_main-default text_color_inactive">
              В этом разделе вы можете изменить свои персональные данные
            </p>
          </li>
        </ul>

        <form /*className={styles.form}*/>
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
              placeholder={"Логин"}
              onChange={handleChange}
              //icon={'CurrencyIcon'}
              value={form.login}
              name={"login"}
              error={false}
              //ref={inputRef}
              //onIconClick={onIconClick}
              errorText={"Ошибка"}
              size={"default"}
            />
          </div>
          <div className={styles.inputContainer + " mb-6"}>
            <Input
              type={"password"}
              placeholder={"Пароль"}
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
          {rule && (
            <div className={styles.buttons}>
              <Button onClick={getProfile} type="secoundary" size="medium">
                Отмена
              </Button>
              <Button onClick={saveProfile} type="primary" size="medium">
                Сохранить
              </Button>
            </div>
          )}
        </form>
      </section>
    </div>
  );
}
