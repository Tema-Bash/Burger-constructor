import React from 'react';
import { 
  ConstructorElement,
  Button,
  DragIcon,
  CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-constructor.module.css';
import PropTypes from 'prop-types';
import { dataType } from '../../utils/types';

import bun1 from '../../images/bun-01.png';
import bun2 from '../../images/bun-02.png';

function BurgerConstructor(props) {
  const datalist = props.data.data;
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
        <Button type="primary" size="large" onClick={props.openModal}>
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


