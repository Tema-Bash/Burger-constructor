import {
  ConstructorElement,
  Button,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { saveOrder } from "../../services/actions/order";
import styles from "./burger-constructor.module.css";
import { useDispatch, useSelector } from "../../services/hooks";
import { useDrop } from "react-dnd";
import { ADD_INGREDIENT } from "../../services/actions/burger";
import BurgerConstructorIngredient from "../burger-constructor-ingredient/burger-constructor-ingredient";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";
import { getCookie, totalSumm } from "../../utils/utils";

import { TIngredient } from "../../services/types/data";

function BurgerConstructor() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { ingredients } = useSelector((store) => store.ingredients);
  const { burgerStructure } = useSelector((store) => store.burger);
  const { user } = useSelector((store) => store.auth);

  // сохраняем бургер на сервер
  const handleOrderClick = () => {
    if (!user) {
      navigate("/login");
    } else {
      dispatch(
        saveOrder(
          burgerStructure.map((element: TIngredient): string => {
            return element._id;
          }),
          getCookie("accessToken")
        )
      );
    }
  };

  const addIngredient = (id: string) => {
    const ingredient = ingredients.find((el: TIngredient) => el._id === id);
    dispatch({
      type: ADD_INGREDIENT,
      ingredient: { ...ingredient, uuid: uuidv4() },
    });
  };

  const [{ opacity }, target] = useDrop({
    accept: "ingredient",
    drop(el: { id: string }) {
      addIngredient(el.id);
    },
    collect: (monitor) => ({
      opacity: monitor.isOver() ? 0.5 : 1,
    }),
  });

  return (
    <section
      ref={target}
      style={{ maxWidth: 570, opacity }}
      className={`${styles.section} + ml-10 mt-25`}
    >
      <div>
        <div className="ml-6 mr-6 mb-4">
          {burgerStructure.length == 0 || burgerStructure[0]?.type !== "bun" ? (
            <p className={`${styles.bunText} + text text_type_main-default`}>
              Пожалуйста, перенесите сюда булку для создания заказа
            </p>
          ) : (
            <ConstructorElement
              type="top"
              isLocked={true}
              text={burgerStructure[0].name + " (верх)"}
              price={burgerStructure[0].price}
              thumbnail={burgerStructure[0].image}
            />
          )}
        </div>

        <ul className={styles.list}>
          {burgerStructure.some((elem: TIngredient) => {
            return elem?.type !== "bun";
          }) ? (
            burgerStructure.map((el: TIngredient, i: number) => {
              if (el.type == "bun") {
                return null;
              } else {
                return (
                  <BurgerConstructorIngredient key={el.uuid} el={el} i={i} />
                );
              }
            })
          ) : (
            <p className="text text_type_main-default">
              Пожалуйста, перенесите ингредиенты для создания заказа
            </p>
          )}
        </ul>

        <div className="ml-6 mr-6 mb-4">
          {burgerStructure.length == 0 || burgerStructure[0]?.type !== "bun" ? (
            <p
              className={`${styles.bunText} + text text_type_main-default`}
            ></p>
          ) : (
            <ConstructorElement
              type="bottom"
              isLocked={true}
              text={burgerStructure[0].name + " (низ)"}
              price={burgerStructure[0].price}
              thumbnail={burgerStructure[0].image}
            />
          )}
        </div>
      </div>

      <div className={styles.buttonContainer + " mt-10"}>
        <p className="text text_type_main-large mr-2">
          {burgerStructure.length == 0
            ? 0
            : totalSumm(burgerStructure, "price")}
        </p>
        <div className="mr-10">
          <CurrencyIcon type="primary" />
        </div>
        {burgerStructure.length !== 0 ? (
          <Button type="primary" size="large" onClick={handleOrderClick}>
            Оформить заказ
          </Button>
        ) : (
          <div className={styles.disableButton}>Оформить заказ</div>
        )}
      </div>
    </section>
  );
}

export default BurgerConstructor;
