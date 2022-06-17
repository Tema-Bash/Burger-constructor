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
import ProfileForm from "../components/change-profile-form/change-profile-form";
import OrderHistory from "../components/order-history/order-history";

export function ProfilePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const location = useLocation();

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
              to={{ pathname: "/profile/orders" }}
              className={styles.item}
            >
              <p
                className={`text text_type_main-medium ${
                  pathname == "/profile/orders"
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

        {location.pathname === "/profile" && <ProfileForm />}
        {location.pathname.includes("/orders") && <OrderHistory />}
      </section>
    </div>
  );
}
