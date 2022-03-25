import React from 'react';
import { 
  Counter,
  Tab,
  CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-ingredients.module.css'

import bun1 from '../../images/bun-01.png'
import bun2 from '../../images/bun-02.png'


function BurgerIngredients() {
  const [current, setCurrent] = React.useState('one')

  return (
    <main className={styles.main}>
      <div style={{ display: 'flex' }}>
        <Tab value="one" active={current === 'Булки'} onClick={setCurrent}>
          One
        </Tab>
        <Tab value="two" active={current === 'Соусы'} onClick={setCurrent}>
          Two
        </Tab>
        <Tab value="three" active={current === 'Начинки'} onClick={setCurrent}>
          Three
        </Tab>
      </div>

      <div className={styles.lists}>
        <h2>Булки</h2>
        <ul className={styles.list}>
          <li className={styles.item}>
            <Counter count={1} size="default" />
            <img src={bun1} alt="" />
            <div className={styles.priceContainer}>
              <p className="text text_type_digits-default">20</p>
              <CurrencyIcon type="primary" />
            </div>
            <p className="text text_type_main-default">
              Краторная булка N-200i
            </p>
          </li>
          <li className={styles.item}>
            <Counter count={2} size="default" />
            <img src={bun2} alt="" />
            <div className={styles.priceContainer}>
              <p className="text text_type_digits-default">20</p>
              <CurrencyIcon type="primary" />
            </div>
            <p className="text text_type_main-default">
              Флюоресцентная булка R2-D3
            </p>
          </li>
        </ul>

        <h2>Соусы</h2>
        <ul className='list'>
        
        </ul>
      </div>
    </main>
  );
}

export default BurgerIngredients;