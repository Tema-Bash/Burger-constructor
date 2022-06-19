import React from "react";
import styles from "./order-history.module.css";
import Order from "../order/order";
function OrderHistory() {
  return (
    <section className={`${styles.orders} mt-10`}>
      <ul className={styles.orderList}>
        <Order />
        <Order />
        <Order />
        <Order />
        <Order />
        <Order />
        <Order />
        <Order />
        <Order />
        <Order />
      </ul>
    </section>
  );
}

export default OrderHistory;
