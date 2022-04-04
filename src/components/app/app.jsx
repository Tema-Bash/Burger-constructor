import {React, useState,useEffect } from 'react';
import styles from './app.module.css';

import AppHeader from '../app-header/app-header'
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details'
import IngredientDetails from '../ingredient-details/ingredient-details'

function App() {
  const [url, setUrl] = useState('https://norma.nomoreparties.space/api/ingredients');
  const [data, setData] = useState({});

  const [orderNumber, setOrderNumber] = useState(456548) //номер заказа


  function getResponseData (res) {
    return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
  };

  useEffect(() => {
    fetch(`${url}`).then(res => getResponseData(res)).then((res) => setData(res))
  }, []);

  const [isOrderDetailsOpened, setIsOrderDetailsOpened] = useState(false); 
  const [ingredientDetailsOpened, setIngredientDetailsOpened] = useState(false);
  const [ingredientIdOpened, setIngredientIdOpened] = useState(null);

  //откарываем модальное заказа и задаём id "кликнутого" элемента
  const setIngredientOpened = (id) => {
    setIngredientDetailsOpened(true)
    setIngredientIdOpened(id)
  }
  //открываем модальное заказа
  const openTotalModal = () => {
    setIsOrderDetailsOpened(true);
  }

  // Закрытие всех модалок
  const closeAllModals = () => {
    setIsOrderDetailsOpened(false);
    setIngredientDetailsOpened(false);
  };

  // Обработка нажатия Esc
  const handleEscKeydown = (e) => {
    e.key === "Escape" && closeAllModals();
  };

  return (
    <div className={styles.App}>
      {isOrderDetailsOpened &&
        <Modal
          title=""
          onOverlayClick={closeAllModals}
          onEscKeydown={handleEscKeydown}
        >
          <OrderDetails  orderNumber={orderNumber}/>
        </Modal>
      }
      {ingredientDetailsOpened && 
      <Modal
        title="Детали ингредиента"
        onOverlayClick={closeAllModals}
        onEscKeydown={handleEscKeydown}
      >
        <IngredientDetails IngredientOpened={data.data.find( el => el._id == ingredientIdOpened )}/>
      </Modal>
      }

      <AppHeader />
      <section className={styles.container}>
        <BurgerIngredients data={data} setIngredientOpened={setIngredientOpened}/>
        <BurgerConstructor data={data} openModal={openTotalModal}/>
      </section>
    </div>
  );
}

export default App;