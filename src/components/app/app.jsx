import {React, useState, useEffect, useContext, createContext } from 'react';
import styles from './app.module.css';
import {URL} from '../../utils/consts'
import {checkResponse} from '../../utils/utils'

import AppHeader from '../app-header/app-header'
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import IngredientDetails from '../ingredient-details/ingredient-details';

import BurgerIngredientsContext from "../../context/burger-ingredients-context";

function App() {
  const [url, setUrl] = useState(`${URL}/ingredients`);
  const [data, setData] = useState({});

  const [orderNumber, setOrderNumber] = useState(123456) //номер заказа


  useEffect(() => {
    fetch(`${url}`)
    .then(checkResponse)
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
        <BurgerIngredientsContext.Provider value={data}>
          <BurgerIngredients setIngredientOpened={setIngredientOpened}/>
          <BurgerConstructor setOrderNumber={setOrderNumber} openModal={openTotalModal}/>
        </BurgerIngredientsContext.Provider>
      </section>
    </div>
  );
}

export default App;