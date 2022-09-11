import { useRef } from "react";
import { useDispatch } from "../../services/hooks";
import { useDrag, useDrop } from "react-dnd";
import {
  REMOVE_INGREDIENT,
  SORT_INGREDIENTS,
} from "../../services/actions/burger";
import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "../burger-constructor-ingredient/burger-constructor-ingredient.module.css";

import { TIngredient } from "../../services/types/data";

type TburgerIngredientProps = {
  el: TIngredient;
  i: number;
};

function BurgerConstructorIngredient({ el, i }: TburgerIngredientProps) {
  const dispatch = useDispatch();
  const ref = useRef<HTMLLIElement | null>(null);

  const sortIngredients = (dragId: number, dropId: number): void => {
    dispatch({ type: SORT_INGREDIENTS, idFrom: dragId, idTo: dropId });
  };

  const removeIngredient = (ingredient: TIngredient): void => {
    dispatch({ type: REMOVE_INGREDIENT, ingredient });
  };

  const [{ opacity }, dragRef] = useDrag({
    type: "drag-ingredient",
    item: { i },
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0.2 : 1,
    }),
  });

  const [, dropRef] = useDrop({
    accept: "drag-ingredient",
    collect: (monitor) => ({
      isHover: monitor.isOver(),
    }),
    drop: (dragIngredient: { i: number }) => {
      if (dragIngredient.i === i) {
        return;
      }
      sortIngredients(dragIngredient.i, i);
    },
  });

  dragRef(dropRef(ref));

  return (
    <li
      style={{ opacity }}
      ref={ref}
      className={styles.item + " mb-4"}
      key={el._id}
    >
      <DragIcon type="primary" />
      <ConstructorElement
        isLocked={false}
        text={el.name}
        price={el.price}
        thumbnail={el.image}
        handleClose={() => removeIngredient(el)}
      />
    </li>
  );
}

export default BurgerConstructorIngredient;
