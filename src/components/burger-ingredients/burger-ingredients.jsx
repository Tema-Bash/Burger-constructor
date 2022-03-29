import React from 'react';
import { 
  Counter,
  Tab,
  CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-ingredients.module.css'

import data from '../../utils/data'


function BurgerIngredients() {
  const [current, setCurrent] = React.useState('one')

  return (
    <main className={styles.main}>
      
      <p className="text text_type_main-large mt-10">
        Соберите бургер
      </p>

      <div className='mt-5' style={{ display: 'flex' }}>
        <Tab value="one" active={current === 'one'} onClick={setCurrent}>
          Булки
        </Tab>
        <Tab value="two" active={current === 'two'} onClick={setCurrent}>
          Соусы
        </Tab>
        <Tab value="three" active={current === 'three'} onClick={setCurrent}>
          Начинки
        </Tab>
      </div>

      <div className={styles.lists}>
        <p className="text text_type_main-large mb-6 mt-10">
          Булки
        </p>
        <ul className={styles.list}>
          {data.map( el =>{
            if (el.type == "bun"){
              return (           
                <li className={styles.item + " mt-6 ml-5"} key={el._id}>
                  <Counter count={1} size="default" />
                  <img className='ml-4 mr-4' src={el.image} alt="" />
                  <div className={styles.priceContainer + " mt-1 mb-1"}>
                    <p className="text text_type_digits-default mr-2">{el.price}</p>
                    <CurrencyIcon type="primary" />
                  </div>
                  <p className="text text_type_main-default">
                    {el.name}
                  </p>
                </li>
                )
            }else {
              return null
            }
          })}
        </ul>

        <p className="text text_type_main-large mb-6 mt-10">
          Соусы
        </p>
        <ul className={styles.list}>
          {data.map( el =>{
            if (el.type == "sauce"){
              return (           
                <li className={styles.item + " mt-6 ml-5"} key={el._id}>
                  <Counter count={1} size="default" />
                  <img className='ml-4 mr-4' src={el.image} alt="" />
                  <div className={styles.priceContainer  + " mt-1 mb-1"}>
                    <p className="text text_type_digits-default mr-2">{el.price}</p>
                    <CurrencyIcon type="primary" />
                  </div>
                  <p className="text text_type_main-default">
                    {el.name}
                  </p>
                </li>
                )
            }else {
              return null
            }
          })}
        </ul>

        <p className="text text_type_main-large mb-6 mt-10">
          Начинки
        </p>
        <ul className={styles.list}>
          {data.map( el =>{
            if (el.type == "main"){
              return (           
                <li className={styles.item + " mt-6 ml-5"} key={el._id}>
                  <Counter count={1} size="default" />
                  <img className='ml-4 mr-4' src={el.image} alt="" />
                  <div className={styles.priceContainer + " mt-1 mb-1"}>
                    <p className="text text_type_digits-default mr-2">{el.price}</p>
                    <CurrencyIcon type="primary" />
                  </div>
                  <p className="text text_type_main-default">
                    {el.name}
                  </p>
                </li>
                )
            }else {
              return null
            }
          })}
        </ul>
      </div>
    </main>
  );
}

export default BurgerIngredients;