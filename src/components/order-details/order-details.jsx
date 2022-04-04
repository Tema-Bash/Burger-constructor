import {React, useState,useEffect } from 'react';
import styles from './order-details.module.css';
import doneImage from '../../images/done.png';

export default function OrderDetails({orderNumber}) {
  return (
    <div className={styles.orderDetails}>
      <p className="text text_type_digits-large pt-10">{orderNumber}</p>
      <p className="text text_type_main-small mt-8">
        Идентификатор заказа
      </p>
      <img className={styles.doneImage + ' mt-15'} src={doneImage} alt="done" />
      <p className="text text_type_main-small mt-15">
        Ваш заказ начали готовить
      </p>
      <p className="text text_type_main-default text_color_inactive mt-2 mb-30">
        Дождитесь готовности на орбитальной станции
      </p>
    </div>
  )
}
