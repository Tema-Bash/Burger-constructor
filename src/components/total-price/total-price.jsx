import React, { useContext } from 'react';
import styles from './total-price.module.css';

import {TotalPriceContext} from '../../utils/data.js'//общие данные
import {ContextData} from '../../utils/data.js'//общие данные потом заменить на корзину

export const TotalPrice = ({ extraClass }) => {
  const totalPrice  = useContext(TotalPriceContext);
  const datalist = useContext(ContextData).data;
  return (
    <div >
      <p >Итого:    
        {datalist && datalist.reduce( (total, current) => {
            return total + Number(current.price)
          },0)
        }
      </p>
      <p >
        {`${totalPrice}`}
      </p>
    </div>
  );
};