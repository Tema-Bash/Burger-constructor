import {React, useState,useEffect } from 'react';
import styles from './app.module.css';
import AppHeader from '../app-header/app-header'
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';

import ModalOverlay from '../modal-overlay/modal-overlay'
import Modal from '../modal/modal';

import OrderDetails from '../order-details/order-details'

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

  const openModal = () => {
    setIsOrderDetailsOpened(true)
    
  }

  // Закрытие всех модалок
  const closeAllModals = () => {
    setIsOrderDetailsOpened(false);
    // тут же закрываем и другие модалки
  };

  // Обработка нажатия Esc
  const handleEscKeydown = (e) => {
    e.key === "Escape" && closeAllModals();
  };

  return (
    <div className={styles.App}>
      {isOrderDetailsOpened &&
        <Modal
          title="Детали заказа"
          onOverlayClick={closeAllModals}
          onEscKeydown={handleEscKeydown}
        >
          <OrderDetails  orderNumber={orderNumber}/>
        </Modal>
     }
      <AppHeader />
      <section className={styles.container}>
        <BurgerIngredients data={data} />
        <BurgerConstructor data={data} openModal={openModal}/>
      </section>
    </div>
  );
}

export default App;