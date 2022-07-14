import React, { useEffect, useState } from "react";
import styles from "./order.module.css";
import { useSelector } from "../../services/hooks";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { dateToString, statusToString, totalSumm } from "../../utils/utils";
import { TIngredient, TOrder } from "../../services/types/data";

type TOrderProps = {
  order: TOrder | null;
  orderOpenHandler: () => void;
};

function Order({ order, orderOpenHandler }: TOrderProps) {
  const { ingredients } = useSelector((store) => store.ingredients);
  const [ingredientsInOrder, setIngredientsInOrder] = useState<
    Array<TIngredient>
  >([]);

  useEffect(() => {
    if (order && ingredients) {
      setIngredientsInOrder(
        order.ingredients
          .map((item) => {
            return ingredients.find((i: TIngredient) => i._id === item);
          })
          .reverse()
      );
    }
  }, [order]);

  if (!order || !ingredients) {
    return null;
  }

  return (
    <li className={`${styles.orderItem} p-6 mb-6`} onClick={orderOpenHandler}>
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
            ingredientsInOrder.reverse().map((el, index) => {
              if (index < 6) {
                return (
                  <React.Fragment key={index}>
                    <div
                      className={styles.image}
                      style={{
                        backgroundImage: `url(${el.image})`,
                        zIndex: index,
                        opacity:
                          ingredientsInOrder.length > 5
                            ? index > 0
                              ? 1
                              : 0.6
                            : 1,
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
