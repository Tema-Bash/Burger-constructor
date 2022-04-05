import {React, useState,useEffect } from 'react';
import styles from './app.module.css';

import AppHeader from '../app-header/app-header'
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import IngredientDetails from '../ingredient-details/ingredient-details';


function App() {
  const [url, setUrl] = useState('https://norma.nomoreparties.space/api/ingredients');
  const [data, setData] = useState({});

  const [orderNumber, setOrderNumber] = useState(123456) //номер заказа

  useEffect(() => {
    fetch(`${url}`)
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка ${res.status}`);
    })
    .then(setData)
    .catch((res) => alert(`Ошибка обращения к серверу: ${res}`));
  }, []);

  const [isOrderDetailsOpened, setIsOrderDetailsOpened] = useState(false); 
  const [ingredientDetailsOpened, setIngredientDetailsOpened] = useState(false);
  const [ingredientIdOpened, setIngredientIdOpened] = useState(12);

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

  return (
    <div className={styles.App}>
      {isOrderDetailsOpened &&
        <Modal
          title=""
          onClose={closeAllModals}
        >
          <OrderDetails  orderNumber={orderNumber}/>
        </Modal>
      }
      {ingredientDetailsOpened && 
      <Modal
        title="Детали ингредиента"
        onClose={closeAllModals}
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