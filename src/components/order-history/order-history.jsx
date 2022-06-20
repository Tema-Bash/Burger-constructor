import styles from "./order-history.module.css";
import Order from "../order/order";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import {
  wsConnectionClosed,
  wsConnectionStart,
} from "../../services/actions/web-socket";
import { getIngredients } from "../../services/actions/ingredients";
import { getCookie } from "../../utils/utils";

function OrderHistory() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { wsRequested, wsConnected, orders } = useSelector(
    (store) => store.webSocket
  );

  const orderOpenHandler = (id) => {
    const pathname = `/profile/orders/${id}`;
    navigate(pathname, { state: { background: { ...location, pathname } } });
  };
  //заправшиваем список ингредиентов
  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  useEffect(() => {
    if (!wsConnected && !wsRequested) {
      dispatch(wsConnectionStart("", getCookie("accessToken")));
    }
  }, [wsConnected, wsRequested, dispatch]);

  useEffect(() => () => dispatch(wsConnectionClosed()), [dispatch]);

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
