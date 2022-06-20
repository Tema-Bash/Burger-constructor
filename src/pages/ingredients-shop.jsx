import { useEffect } from "react";
import styles from "./ingredients-shop.module.css";
import BurgerIngredients from "../components/burger-ingredients/burger-ingredients";
import BurgerConstructor from "../components/burger-constructor/burger-constructor";
import Modal from "../components/modal/modal";
import OrderDetails from "../components/order-details/order-details";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useDispatch, useSelector } from "react-redux";
import {
  SELECT_INGREDIENT,
  getIngredients,
} from "../services/actions/ingredients";
import { CLEAR_ORDER_NUMBER } from "../services/actions/order";

export function IngredientsShop() {
  const dispatch = useDispatch();

  const { orderNumber } = useSelector((store) => store.order);
  //заправшиваем список ингредиентов
  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  const closeAllModals = () => {
    dispatch({ type: CLEAR_ORDER_NUMBER });
    dispatch({ type: SELECT_INGREDIENT });
  };

  return (
    <div className={styles.App}>
      {orderNumber && (
        <Modal title="" onClose={closeAllModals}>
          <OrderDetails orderNumber={orderNumber} />
        </Modal>
      )}

      <section className={styles.container}>
        <DndProvider backend={HTML5Backend}>
          <BurgerIngredients />
          <BurgerConstructor />
        </DndProvider>
      </section>
    </div>
  );
}
