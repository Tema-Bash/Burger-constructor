import React from "react";
import styles from "./order.module.css";
import { useSelector } from "react-redux";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

function Order() {
  const { ingredients } = useSelector((store) => store.ingredients);

  return (
    <li className={`${styles.orderItem} p-6 mb-6`}>
      <div className={styles.header}>
        <p className={`${styles.id} text_type_digits-default`}>#034535</p>
        <p
          className={`${styles.date} text text_type_main-default text_color_inactive`}
        >
          Сегодня, 16:20 i-GMT+3
        </p>
      </div>
      <div className={`${styles.orderName} mt-6 mb-2`}>
        <p className="text text_type_main-medium">
          Death Star Starship Main бургер
        </p>
      </div>
      <div className={styles.status}>
        <p className="text text_type_main-small">Готовится</p>
      </div>
      <div className={`${styles.ingredients} mt-6 mb-6`}>
        <ul className={styles.list}>
          {ingredients &&
            ingredients.map((el, index) => {
              console.log(el.image);
              if (index < 6) {
                return (
                  <React.Fragment key={index}>
                    <div
                      className={styles.image}
                      style={{
                        backgroundImage: `url(${el.image})`,
                        zIndex: ingredients.length - index,
                        opacity: index < 5 ? 1 : 0.6,
                      }}
                    ></div>
                    {index === 5 && (
                      <span
                        className={`${styles.counter} text text_type_digits-default`}
                      >
                        +{ingredients.length - 5}
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
          {/* create func total summ for constructor and order list */}
          {55} <CurrencyIcon type="primary" />
        </div>
      </div>
    </li>
  );
}

export default Order;
