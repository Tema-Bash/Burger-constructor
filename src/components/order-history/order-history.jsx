import React from "react";
import styles from "./order-history.module.css";
import Order from "../order/order";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  wsConnectionClosed,
  wsConnectionStart,
} from "../../services/actions/web-socket";
import { getIngredients } from "../../services/actions/ingredients";

function OrderHistory() {
  const dispatch = useDispatch();
  const { wsRequested, wsConnected, orders } = useSelector(
    (store) => store.webSocket
  );

  //заправшиваем список ингредиентов
  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  useEffect(() => {
    if (!wsConnected && !wsRequested) {
      dispatch(wsConnectionStart("/all"));
    }
  }, [wsConnected, wsRequested, dispatch]);

  useEffect(() => () => dispatch(wsConnectionClosed()), [dispatch]);

  return (
    <section className={`${styles.orders} mt-10`}>
      <ul className={styles.orderList}>
        {orders.map((order, index) => {
          return <Order order={order} key={index} />;
        })}
      </ul>
    </section>
  );
}

export default OrderHistory;
