import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "../services/hooks";
import styles from "./ingredient-page.module.css";
import { useParams, useNavigate } from "react-router-dom";
import { TIngredient } from "../services/types/data";

export const IngredientPage = () => {
  const navigate = useNavigate();
  const { ingredients } = useSelector((store) => store.ingredients);
  const [ingredient, setIngredient] = useState<TIngredient | null>(null);
  const params = useParams();

  useEffect(() => {
    if (ingredients.length > 0) {
      const ingredient = ingredients.find(
        (el: TIngredient) => el._id === params.id
      );
      if (ingredient) {
        setIngredient(ingredient);
      } else {
        navigate("/not-found");
      }
    }
  }, [ingredients, params, navigate]);

  if (!ingredient) {
    return null;
  }

  return (
    <div className={`${styles.ingredientDetails} pb-15 pt-30`}>
      <img
        className={styles.image}
        src={ingredient.image}
        alt={ingredient.name}
      />
      <p className="text text_type_main-medium pt-4 pb-8">{ingredient.name}</p>
      <ul className={styles.elementsList}>
        <li className={styles.elementDetail}>
          <p className="text text_type_main-default text_color_inactive">
            Калории,ккал
          </p>
          <p className="text text_type_digits-default text_color_inactive">
            {ingredient.calories}
          </p>
        </li>

        <li className={styles.elementDetail}>
          <p className="text text_type_main-default text_color_inactive">
            Белки, г
          </p>
          <p className="text text_type_digits-default text_color_inactive">
            {ingredient.proteins}
          </p>
        </li>

        <li className={styles.elementDetail}>
          <p className="text text_type_main-default text_color_inactive">
            Жиры, г
          </p>
          <p className="text text_type_digits-default text_color_inactive">
            {ingredient.fat}
          </p>
        </li>

        <li className={styles.elementDetail}>
          <p className="text text_type_main-default text_color_inactive">
            Углеводы, г
          </p>
          <p className="text text_type_digits-default text_color_inactive">
            {ingredient.carbohydrates}
          </p>
        </li>
      </ul>
    </div>
  );
};
