import styles from "./order-history.module.css";
import Order from "../order/order";
import { useLocation, useNavigate } from "react-router-dom";

import { TOrder } from "../../services/types/data";

type TOrderHistoryProps = {
  orders: Array<TOrder>;
};

function OrderHistory({ orders }: TOrderHistoryProps) {
  const location = useLocation();
  const navigate = useNavigate();

  const orderOpenHandler = (id: number) => {
    const pathname = `/profile/orders/${id}`;
    navigate(pathname, { state: { background: { ...location, pathname } } });
  };

  return (
    <section className={`${styles.orders} mt-10`}>
      <ul className={styles.orderList}>
        {orders.map((order, index) => {
          return (
            <Order
              order={order}
              key={index}
              orderOpenHandler={() => orderOpenHandler(order.number)}
            />
          );
        })}
      </ul>
    </section>
  );
}

export default OrderHistory;
