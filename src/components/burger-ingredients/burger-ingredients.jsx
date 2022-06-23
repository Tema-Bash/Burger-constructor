import React, { useEffect } from "react";
import { useRef } from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-ingredients.module.css";
import Ingredient from "../ingredient/ingredient";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { SELECT_INGREDIENT } from "../../services/actions/ingredients";
import { useDispatch } from "react-redux";

function BurgerIngredients() {
  const dispatch = useDispatch();
  const params = useParams();
  const { ingredients } = useSelector((store) => store.ingredients);
  const [current, setCurrent] = React.useState("buns");

  //Выделяем в табе ближайшую группу ингредиентов
  const bunRef = useRef();
  const sauceRef = useRef();
  const mainRef = useRef();

  const tabChanger = () => {
    const tabElementPos = (type, ref) => {
      return {
        type,
        y: Math.abs(ref.current.getBoundingClientRect().y - 400),
      };
    };
    const tabObj = [];
    tabObj.push(tabElementPos("buns", bunRef));
    tabObj.push(tabElementPos("sauces", sauceRef));
    tabObj.push(tabElementPos("mains", mainRef));

    const topType = tabObj.reduce((p, c) => {
      return c.y < p.y ? c : p;
    });
    if (topType.type !== current) {
      setCurrent(topType.type);
    }
  };

  function moveTO(target) {
    if (target == `buns`) {
      bunRef.current.scrollIntoView({ behavior: "smooth" });
    } else if (target == `sauces`) {
      sauceRef.current.scrollIntoView({ behavior: "smooth" });
    } else {
      mainRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }

  useEffect(() => {
    dispatch({
      type: SELECT_INGREDIENT,
      ingredient: ingredients.find((el) => el._id === params.id),
    });
  }, [ingredients, dispatch]);

  return (
    <main className={styles.main}>
      <p className="text text_type_main-large mt-10">Соберите бургер</p>

      <div className={styles.tab + " mt-5"}>
        <Tab
          value="buns"
          active={current === "buns"}
          onClick={(e) => {
            moveTO(e);
          }}
        >
          Булки
        </Tab>
        <Tab
          value="sauces"
          active={current === "sauces"}
          onClick={(e) => {
            moveTO(e);
          }}
        >
          Соусы
        </Tab>
        <Tab
          value="mains"
          active={current === "mains"}
          onClick={(e) => {
            moveTO(e);
          }}
        >
          Начинки
        </Tab>
      </div>

      <div className={styles.lists} onScroll={tabChanger}>
        <p className="text text_type_main-large mb-6 mt-10">Булки</p>
        <ul className={styles.list} ref={bunRef}>
          {ingredients &&
            ingredients.map((el) => {
              if (el.type == "bun") {
                return <Ingredient el={el} key={el._id} />;
              } else {
                return null;
              }
            })}
        </ul>

        <p className="text text_type_main-large mb-6 mt-10">Соусы</p>
        <ul className={styles.list} ref={sauceRef}>
          {ingredients &&
            ingredients.map((el) => {
              if (el.type == "sauce") {
                return <Ingredient el={el} key={el._id} />;
              } else {
                return null;
              }
            })}
        </ul>

        <p className="text text_type_main-large mb-6 mt-10">Начинки</p>
        <ul className={styles.list} ref={mainRef}>
          {ingredients &&
            ingredients.map((el) => {
              if (el.type == "main") {
                return <Ingredient el={el} key={el._id} />;
              } else {
                return null;
              }
            })}
        </ul>
      </div>
    </main>
  );
}

export default BurgerIngredients;
