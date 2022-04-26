import React,{useContext, useReducer} from 'react';
import { 
  ConstructorElement,
  Button,
  DragIcon,
  CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './burger-constructor.module.css';

import PropTypes from 'prop-types';
import { dataType } from '../../utils/types';

import BurgerIngredientsContext from "../../context/burger-ingredients-context";


import bun1 from '../../images/bun-01.png';
import bun2 from '../../images/bun-02.png';

function BurgerConstructor({setOrderNumber, openModal}) {
  const datalist = useContext(BurgerIngredientsContext).data;

  const handleOrderClick = () => {
    const ingredients = datalist.map((element)=>{return element._id});
    const orderURL = 'https://norma.nomoreparties.space/api/orders';

    const saveOrder = (ingredients) => {
      return fetch(`${orderURL}`,{
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
          ingredients: ingredients,
        }),
      })
      .then((res) => {
        if (res.ok) {
          openModal()
          return res.json();
        }
        return Promise.reject(`Ошибка ${res.status}`);
      })
      .then(res => setOrderNumber(res.order.number))
      .catch((res) => alert(`Ошибка обращения к серверу: ${res}`));
    }
    saveOrder(ingredients) // сохраняем ингредиенты на сервер
  }

  return (
    <div className='ml-10 mt-25'>
      <div >
          <div className='ml-6 mr-6 mb-4'>
            <ConstructorElement
              type="top"
              isLocked={true}
              text="Краторная булка N-200i (верх)"
              price={200}
              thumbnail={bun1}
            />
          </div>
          <ul className={styles.list}>
            {datalist && datalist.map( el =>{
              if (el.type == "bun"){
                return null
              }else {
                return (           
                <li className={styles.item + " mb-4"} key={el._id}>
                  <DragIcon type="primary" />
                  <ConstructorElement
                    text={el.name}
                    price={el.price}
                    thumbnail={el.image}
                  />
                </li>)
              }
            })}
          </ul>
          <div className='ml-6 mr-6 mt-4'>
            <ConstructorElement
              type="bottom"
              isLocked={true}
              text="Краторная булка N-200i (низ)"
              price={200}
              thumbnail={bun1}
            />
          </div>
      </div>
      <div className={styles.buttonContainer +' mt-10'}>
        <p className="text text_type_main-large mr-2">
          {datalist && datalist.reduce( (total, current) => {
            return total + Number(current.price)
          },0)}
        </p>

        <div className='mr-10'>
          <CurrencyIcon type="primary" />
        </div>
        <Button type="primary" size="large" onClick={handleOrderClick}>
          Оформить заказ
        </Button>
      </div>
    </div>
  );
}

BurgerConstructor.propTypes = {
  datalist: dataType,
  openModal: PropTypes.func.isRequired,
}

export default BurgerConstructor;


