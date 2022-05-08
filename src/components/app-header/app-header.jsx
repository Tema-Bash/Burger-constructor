import { 
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './app-header.module.css'

function AppHeader() {
  return (
    <header className={styles.AppHeader + " mt-10"}>
      <nav className ={styles.navbar}>
        <ul className ={styles.menu}>
          <li className = {styles.constructor + " ml-5"}>
            <div className={styles.item + " p-5 mt-4 mb-4"}>
              <BurgerIcon type="primary"/>
              <p className="text text_type_main-small ml-2">
                Конструктор
              </p>
            </div>
          </li>
          <li className ={styles.lenta + " ml-2 p-5 mt-4 mb-4"}> 
            <div className={styles.item}>
              <ListIcon type="secondary" />
              <p className="text text_type_main-default text_color_inactive pl-2">
                Лента заказов
              </p>
            </div>
          </li>
          <li className ={styles.logo}>
              <Logo />
          </li>
          <li className ={styles.profile + " p-5 mt-4 mb-4"}>
            <div className={styles.item}>
              <ProfileIcon type="secondary" />
              <p className="text text_type_main-default text_color_inactive pl-2">
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