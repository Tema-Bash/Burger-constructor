import styles from "./ingredient.module.css";
import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch, useSelector } from "../../services/hooks";
import { SELECT_INGREDIENT } from "../../services/actions/ingredients";
import { useDrag } from "react-dnd";
import { useLocation, useNavigate } from "react-router-dom";
import { TIngredient } from "../../services/types/data";

interface TIngredientProps {
  el: TIngredient;
}

export default function Ingredient({ el }: TIngredientProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { ingredients } = useSelector((store) => store.ingredients);
  const { burgerStructure } = useSelector((store) => store.burger);

  let count = burgerStructure.filter(
    (item: TIngredient) => item._id == el._id
  ).length;

  const onIngredientSelected = (id: string) => {
    const pathname = `/ingredients/${id}`;
    navigate(pathname, {
      state: { background: { ...location, pathname } },
    });
    dispatch({
      type: SELECT_INGREDIENT,
      ingredient: ingredients.find((el: TIngredient) => el._id === id),
    });
  };

  const [{ opacity }, ref] = useDrag({
    type: "ingredient",
    item: { id: el._id },
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0.7 : 1,
    }),
  });

  return (
    <li
      className={styles.item + " mt-6 ml-5"}
      style={{ opacity }}
      draggable
      ref={ref}
      onClick={() => onIngredientSelected(el._id)}
    >
      {count > 0 && <Counter count={count} size="default" />}
      <img className="ml-4 mr-4" src={el.image} alt={el.name} />
      <div className={styles.priceContainer + " mt-1 mb-1"}>
        <p className="text text_type_digits-default mr-2">{el.price}</p>
        <CurrencyIcon type="primary" />
      </div>
      <p className="text text_type_main-default">{el.name}</p>
    </li>
  );
}
