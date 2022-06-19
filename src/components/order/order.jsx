import React, { useEffect, useState } from "react";
import styles from "./order.module.css";
import { useSelector } from "react-redux";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { dateToString, statusToString, totalSumm } from "../../utils/utils";

function Order({ order }) {
  const { ingredients } = useSelector((store) => store.ingredients);
  const [images, setImages] = useState([]);
  const [ingredientsInOrder, setIngredientsInOrder] = useState([]);

  useEffect(() => {
    if (order && ingredients) {
      setIngredientsInOrder(
        order.ingredients.map((item, index) => {
          return ingredients.find((i) => i._id === item);
        })
      );
    }
  }, [order]);

  if (!order || !ingredients) {
    return null;
  }

  return (
    <li className={`${styles.orderItem} p-6 mb-6`}>
      <div className={styles.header}>
        <p className={`${styles.id} text_type_digits-default`}>
          #{order.number}
        </p>
        <p
          className={`${styles.date} text text_type_main-default text_color_inactive`}
        >
          {dateToString(order.createdAt)}
        </p>
      </div>
      <div className={`${styles.orderName} mt-6 mb-2`}>
        <p className="text text_type_main-medium">{order.name}</p>
      </div>
      <div className={styles.status}>
        <p className="text text_type_main-small">
          {statusToString(order.status)}
        </p>
      </div>
      <div className={`${styles.ingredients} mt-6 mb-6`}>
        <ul className={styles.list}>
          {ingredientsInOrder &&
            ingredientsInOrder.map((el, index) => {
              if (index < 6) {
                return (
                  <React.Fragment key={index}>
                    <div
                      className={styles.image}
                      style={{
                        backgroundImage: `url(${el.image})`,
                        zIndex: ingredientsInOrder.length - index,
                        opacity: index < 5 ? 1 : 0.6,
                      }}
                    ></div>
                    {index === 5 && (
                      <span
                        className={`${styles.counter} text text_type_digits-default`}
                      >
                        +{ingredientsInOrder.length - 5}
                      </span>
                    )}
                  </React.Fragment>
                );
              } else {
                return null;
              }
            })}
        </ul>
        <div className={`${styles.price} text_type_digits-default`}>
          {totalSumm(ingredientsInOrder, "price")}
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </li>
  );
}

export default Order;
