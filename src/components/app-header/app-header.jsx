import React from 'react';
import { 
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './app-header.module.css'

function AppHeader() {
  return (
    <header className={styles.AppHeader}>
      <nav className ={styles.navbar}>
        <ul className ={styles.menu}>
          <li className = "m-5">
            <div className={styles.item}>
              <BurgerIcon type="primary"/>
              <p className="text text_type_main-small p-2">
                Конструктор
              </p>
            </div>
          </li>
          <li className ="m-5"> 
            <div className={styles.item}>
              <ListIcon type="secondary" />
              <p className="text text_type_main-default text_color_inactive p-2">
                Лента заказов
              </p>
            </div>
          </li>
          <li>
            <div className ={styles.logo}>
              <Logo />
            </div>
          </li>
          <li>
            <div className={styles.item}>
              <ProfileIcon type="secondary" />
              <p className="text text_type_main-default text_color_inactive p-2">
                Личный кабинет
              </p>
            </div>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default AppHeader;