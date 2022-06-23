import styles from "./order-history.module.css";
import Order from "../order/order";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

function OrderHistory({ orders }) {
  const location = useLocation();
  const navigate = useNavigate();

  const orderOpenHandler = (id) => {
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
