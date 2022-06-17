import { NavLink, useLocation } from "react-router-dom";
import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./app-header.module.css";

function AppHeader() {
  const { pathname } = useLocation();

  return (
    <header className={styles.AppHeader + " mt-10"}>
      <nav className={styles.navbar}>
        <ul className={styles.menu}>
          <li className={styles.constructor + " ml-5"}>
            <NavLink
              to={{ pathname: "/" }}
              className={styles.item + " p-5 mt-4 mb-4"}
            >
              <BurgerIcon type={pathname == "/" ? "primary" : "secondary"} />
              <p
                className={`text text_type_main-small ${
                  pathname == "/" ? styles.linkActive : "text_color_inactive"
                } ml-2`}
              >
                Конструктор
              </p>
            </NavLink>
          </li>
          <li className={styles.lenta + " ml-2 p-5 mt-4 mb-4"}>
            <NavLink to={{ pathname: "/login" }} className={styles.item}>
              <ListIcon type={pathname == "/login" ? "primary" : "secondary"} />
              <p
                className={`text text_type_main-default ${
                  pathname == "/login"
                    ? styles.linkActive
                    : "text_color_inactive"
                } pl-2`}
              >
                Лента заказов
              </p>
            </NavLink>
          </li>
          <li className={styles.logo}>
            <Logo />
          </li>
          <li className={styles.profile + " p-5 mt-4 mb-4"}>
            <NavLink to={{ pathname: "/profile" }} className={styles.item}>
              <ProfileIcon
                type={pathname == "/profile" ? "primary" : "secondary"}
              />
              <p
                className={`text text_type_main-default ${
                  pathname == "/profile"
                    ? styles.linkActive
                    : "text_color_inactive"
                } pl-2`}
              >
                Личный кабинет
              </p>
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default AppHeader;
