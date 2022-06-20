import { useCallback } from "react";
import styles from "./profile.module.css";
import { NavLink, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { exitRequest } from "../services/actions/authorization.js";
import ProfileForm from "../components/change-profile-form/change-profile-form";
import OrderHistory from "../components/order-history/order-history";
import {
  wsConnectionClosed,
  wsConnectionStart,
} from "../services/actions/web-socket";
import { getCookie } from "../utils/utils";
export function ProfilePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const location = useLocation();

  const { wsRequested, wsConnected, orders } = useSelector(
    (store) => store.webSocket
  );

  let logOut = useCallback(async () => {
    await dispatch(exitRequest(localStorage.getItem("refreshToken")));
    navigate("/login");
  });

  const onOrderChoose = (id) => {
    const pathname = `/profile/orders/${id}`;
    navigate(pathname, { state: { background: { ...location, pathname } } });
  };

  useEffect(() => {
    if (!wsConnected && !wsRequested) {
      dispatch(wsConnectionStart("", getCookie("accessToken")));
    }
  }, [wsConnected, wsRequested, dispatch]);

  useEffect(() => () => dispatch(wsConnectionClosed()), [dispatch]);

  return (
    <section className={styles.container}>
      <ul className={`${styles.menu}`}>
        <li className={styles.listItem}>
          <NavLink to={{ pathname: "/profile" }} className={styles.item}>
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
          <NavLink to={{ pathname: "/profile/orders" }} className={styles.item}>
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
          <NavLink to={{ pathname: "/login" }} className={styles.item}>
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
  );
}
