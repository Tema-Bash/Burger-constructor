import React, { useEffect } from "react";
import { useRef, MutableRefObject } from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-ingredients.module.css";
import Ingredient from "../ingredient/ingredient";
import { useDispatch, useSelector } from "../../services/hooks";
import { useParams } from "react-router-dom";
import { SELECT_INGREDIENT } from "../../services/actions/ingredients";
import { TIngredient } from "../../services/types/data";

function BurgerIngredients() {
  const dispatch = useDispatch();
  const params = useParams();
  const { ingredients } = useSelector((store) => store.ingredients);
  const [current, setCurrent] = React.useState("buns");

  //Выделяем в табе ближайшую группу ингредиентов
  const bunRef = useRef<HTMLDivElement | null>(null);
  const sauceRef = useRef<HTMLDivElement | null>(null);
  const mainRef = useRef<HTMLDivElement | null>(null);

  const tabChanger = () => {
    const tabElementPos = (
      type: "buns" | "mains" | "sauces",
      ref: MutableRefObject<HTMLDivElement | null>
    ) => {
      if (!ref.current) {
        return { type, y: 0 };
      }
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

  function scrollTo(target: string) {
    if (target === `buns` && bunRef.current) {
      bunRef.current.scrollIntoView({ behavior: "smooth" });
    } else if (target == `sauces` && sauceRef.current) {
      sauceRef.current.scrollIntoView({ behavior: "smooth" });
    } else if (target == `mains` && mainRef.current) {
      mainRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }

  useEffect(() => {
    dispatch({
      type: SELECT_INGREDIENT,
      ingredient: ingredients.find((el: TIngredient) => el._id === params.id),
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
            scrollTo(e);
          }}
        >
          Булки
        </Tab>
        <Tab
          value="sauces"
          active={current === "sauces"}
          onClick={(e) => {
            scrollTo(e);
          }}
        >
          Соусы
        </Tab>
        <Tab
          value="mains"
          active={current === "mains"}
          onClick={(e) => {
            scrollTo(e);
          }}
        >
          Начинки
        </Tab>
      </div>

      <div className={styles.lists} onScroll={tabChanger}>
        <p className="text text_type_main-large mb-6 mt-10">Булки</p>
        <div ref={bunRef}>
          <ul className={styles.list}>
            {ingredients &&
              ingredients.map((el: TIngredient) => {
                if (el.type == "bun") {
                  return <Ingredient el={el} key={el._id} />;
                } else {
                  return null;
                }
              })}
          </ul>
        </div>

        <p className="text text_type_main-large mb-6 mt-10">Соусы</p>
        <div ref={sauceRef}>
          <ul className={styles.list}>
            {ingredients &&
              ingredients.map((el: TIngredient) => {
                if (el.type == "sauce") {
                  return <Ingredient el={el} key={el._id} />;
                } else {
                  return null;
                }
              })}
          </ul>
        </div>

        <p className="text text_type_main-large mb-6 mt-10">Начинки</p>
        <div ref={mainRef}>
          <ul className={styles.list}>
            {ingredients &&
              ingredients.map((el: TIngredient) => {
                if (el.type == "main") {
                  return <Ingredient el={el} key={el._id} />;
                } else {
                  return null;
                }
              })}
          </ul>
        </div>
      </div>
    </main>
  );
}

export default BurgerIngredients;
