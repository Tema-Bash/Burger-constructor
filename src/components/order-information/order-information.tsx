import styles from "./order-information.module.css";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "../../services/hooks";
import { useParams } from "react-router-dom";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { wsConnectionStart } from "../../services/actions/web-socket";
import {
  dateToString,
  statusToString,
  totalSumm,
  counter,
} from "../../utils/utils";
import { getCookie } from "../../utils/utils";

import { TIngredient, TOrder } from "../../services/types/data";

type TOrderInformationProps = {
  secure: boolean;
};

export default function OrderInformation({ secure }: TOrderInformationProps) {
  const dispatch = useDispatch();
  const params = useParams();
  const { wsRequested, wsConnected, orders } = useSelector(
    (store) => store.webSocket
  );

  useEffect(() => {
    if (!wsConnected && !wsRequested) {
      if (secure) {
        dispatch(wsConnectionStart("", getCookie("accessToken")));
      } else {
        dispatch(wsConnectionStart("/all"));
      }
    }
  }, [wsConnected, wsRequested, dispatch]);

  const { ingredients } = useSelector((store) => store.ingredients);
  const [choosenOrder, setOrder] = useState<TOrder | null>(null);
  const [ingredientsInOrder, setIngredientsInOrder] = useState<
    Array<TIngredient>
  >([]);
  const [uniqIngredientsOrder, setuniqIngredientsOrder] =
    useState<ReadonlyArray<TIngredient>>();

  useEffect(() => {
    if (ingredientsInOrder.length !== 0) {
      setuniqIngredientsOrder(counter("_id", ingredientsInOrder));
    }
  }, [ingredientsInOrder]);

  useEffect(() => {
    if (orders.length > 0 && ingredientsInOrder.length === 0) {
      setOrder(orders.find((el: TOrder) => el.number === Number(params.id)));
      if (choosenOrder) {
        setIngredientsInOrder(
          choosenOrder.ingredients &&
            choosenOrder?.ingredients
              .map((id, index) => {
                return ingredients.find((item: TIngredient) => item._id == id);
              })
              .sort((a, b) => {
                return a.type === "bun" ? -1 : a._id - b._id;
              })
        );
      }
    }
  }, [orders, choosenOrder, params, ingredientsInOrder]);

  //useEffect(() => () => dispatch(wsConnectionClosed()), [dispatch]);
  if (!choosenOrder) {
    return null;
  }

  return (
    <section className={`${styles.order} pb-10 pr-10 pl-10`}>
      <p className={`${styles.id} text_type_digits-default`}>
        #{choosenOrder && choosenOrder.number}
      </p>
      <p className="text text_type_main-medium mt-10">
        {choosenOrder && choosenOrder.name}
      </p>
      <p className="text text_type_main-small mt-3">
        {statusToString(choosenOrder && choosenOrder.status)}
      </p>
      <p className="text text_type_main-medium mt-15 mb-6">Состав:</p>
      <ul className={`${styles.listOfIngredients}`}>
        {uniqIngredientsOrder &&
          uniqIngredientsOrder.map((el, index) => {
            return (
              <li className={`${styles.ingredient} mb-4`} key={index}>
                <div className={`${styles.container}`}>
                  <div
                    className={`${styles.image} mr-4`}
                    style={{
                      backgroundImage: `url(${el.image})`,
                    }}
                  ></div>
                  <p className="text text_type_main-small">{el.name}</p>
                </div>
                <div
                  className={`${styles.price} mr-6 ml-4 text_type_digits-default`}
                >
                  {counter("_id", ingredientsInOrder, el._id)}
                  {` X `}
                  {el.price}
                  <CurrencyIcon type="primary" />
                </div>
              </li>
            );
          })}
      </ul>
      <div className={`${styles.footer} mt-10`}>
        <p
          className={`${styles.date} text text_type_main-default text_color_inactive`}
        >
          {dateToString(choosenOrder && choosenOrder.createdAt)}
        </p>
        <div className={`${styles.totalPrice} text_type_digits-default`}>
          {totalSumm(ingredientsInOrder && ingredientsInOrder, "price")}
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </section>
  );
}
