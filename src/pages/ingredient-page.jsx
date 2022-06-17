import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styles from "./ingredient-page.module.css";
import {
  Link,
  useRouteMatch,
  useParams,
  Redirect,
  useNavigate,
} from "react-router-dom";
import { getIngredients } from "../services/actions/ingredients";

export const IngredientPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { ingredients } = useSelector((store) => store.ingredients);
  const [ingredient, setIngredient] = useState(1);
  const params = useParams();

  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);
  // 60d3b41abdacab0026a733cd
  useEffect(() => {
    if (ingredients.length > 0) {
      const ingredient = ingredients.find((el) => el._id === params.id);
      if (ingredient) {
        setIngredient(ingredient);
      } else {
        navigate("/not-found");
      }
    }
  }, [ingredients, params]);

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
