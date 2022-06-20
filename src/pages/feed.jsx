import React from "react";
import Order from "../components/order/order";
import styles from "../pages/feed.module.css";

function FeedPage() {
  return (
    <section className={`${styles.feed}`}>
      <div className={`${styles.container} mr-15 mt-10`}>
        <h1 className={`${styles.header} text text_type_main-large pb-5`}>
          Лента заказов
        </h1>

        <ul className={styles.feedItems}>
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
      </div>

      <div className={`${styles.feedStats} mt-20`}>
        <div className={`${styles.numberLists}`}>
          <div className={`${styles.ready}`}>
            <p className="text text_type_main-medium pb-6">Готовы:</p>
            <ul className={`${styles.list}`}>
              <li className="text_type_digits-default text_color_inactive mb-2">
                034533
              </li>
              <li className="text_type_digits-default text_color_inactive mb-2">
                034533
              </li>
              <li className="text_type_digits-default text_color_inactive mb-2">
                034533
              </li>
              <li className="text_type_digits-default text_color_inactive mb-2">
                034533
              </li>
              <li className="text_type_digits-default text_color_inactive mb-2">
                034533
              </li>
              <li className="text_type_digits-default text_color_inactive mb-2">
                034533
              </li>
            </ul>
          </div>
          <div className={`${styles.inProgress} ml-9`}>
            <p className="text text_type_main-medium pb-6">В работе:</p>
            <ul className={`${styles.list}`}>
              <li className="text_type_digits-default text_type_digits-default mb-2">
                034533
              </li>
              <li className="text_type_digits-default text_type_digits-default mb-2">
                034533
              </li>
              <li className="text_type_digits-default text_type_digits-default mb-2">
                034533
              </li>
              <li className="text_type_digits-default text_type_digits-default mb-2">
                034533
              </li>
              <li className="text_type_digits-default text_type_digits-default mb-2">
                034533
              </li>
            </ul>
          </div>
        </div>
        <div className={`${styles.totalAllTime} mt-15`}>
          <p className="text text_type_main-medium">Выполнено за все время:</p>
          <p className={`${styles.glow} text text_type_digits-large`}>123133</p>
        </div>
        <div className={`${styles.totalToday} mt-15`}>
          <p className="text text_type_main-medium">Выполнено за сегодня:</p>
          <p className={`${styles.glow} text text_type_digits-large`}>321</p>
        </div>
      </div>
    </section>
  );
}

export default FeedPage;
