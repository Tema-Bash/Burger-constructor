import styles from "./order-page.module.css";
import OrderInformation from "../components/order-information/order-information";

export default function OrderPage({ secure }) {
  return (
    <section className={`${styles.order} mt-30`}>
      <OrderInformation secure={secure} />
    </section>
  );
}
