import Order from "../components/order/order";
import styles from "../pages/feed.module.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "../services/hooks";
import { useLocation, useNavigate } from "react-router-dom";
import {
  wsConnectionClosed,
  wsConnectionStart,
} from "../services/actions/web-socket";

function FeedPage() {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const { wsRequested, wsConnected, orders, total, totalToday, wsSecure } =
    useSelector((store) => store.webSocket);

  const orderOpenHandler = (id: number) => {
    const pathname = `/feed/${id}`;
    navigate(pathname, { state: { background: { ...location, pathname } } });
  };

  useEffect(() => {
    if ((!wsConnected && !wsRequested) || wsSecure) {
      dispatch(wsConnectionStart("/all"));
    }
  }, [wsConnected, wsRequested, dispatch]);

  useEffect(() => {
    return () => {
      if (wsConnected) {
        dispatch(wsConnectionClosed());
      }
    };
  }, [wsConnected, dispatch]);

  const doneNums = orders.filter(
    (order, idx) => idx < 10 && order.status === "done"
  );
  const pendingNums = orders.filter(
    (order, idx) => idx < 10 && order.status === "pending"
  );

  if (!orders) {
    return null;
  }

  return (
    <section className={`${styles.feed}`}>
      <div className={`${styles.container} mr-15 mt-10`}>
        <h1 className={`${styles.header} text text_type_main-large pb-5`}>
          Лента заказов
        </h1>
        <ul className={styles.feedItems}>
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
      </div>

      <div className={`${styles.feedStats} mt-20`}>
        <div className={`${styles.numberLists}`}>
          <div className={`${styles.ready}`}>
            <p className="text text_type_main-medium pb-6">Готовы:</p>
            <ul className={`${styles.list}`}>
              {doneNums.map((order, index) => {
                return (
                  <li
                    key={index}
                    className="text_type_digits-default text_color_inactive mb-2"
                  >
                    {order.number}
                  </li>
                );
              })}
            </ul>
          </div>
          <div className={`${styles.inProgress} ml-9`}>
            <p className="text text_type_main-medium pb-6">В работе:</p>
            <ul className={`${styles.list}`}>
              {pendingNums.length == 0 ? (
                <p className={`text text_type_main-small`}>Заказов нет</p>
              ) : (
                pendingNums.map((order, index) => {
                  return (
                    <li
                      key={index}
                      className="text_type_digits-default text_color_inactive mb-2"
                    >
                      {order.number}
                    </li>
                  );
                })
              )}
            </ul>
          </div>
        </div>
        <div className={`${styles.totalAllTime} mt-15`}>
          <p className="text text_type_main-medium">Выполнено за все время:</p>
          <p className={`${styles.glow} text text_type_digits-large`}>
            {total ? total : 0}
          </p>
        </div>
        <div className={`${styles.totalToday} mt-15`}>
          <p className="text text_type_main-medium">Выполнено за сегодня:</p>
          <p className={`${styles.glow} text text_type_digits-large`}>
            {totalToday ? totalToday : 0}
          </p>
        </div>
      </div>
    </section>
  );
}

export default FeedPage;
