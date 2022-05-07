import styles from './ingredient-details.module.css'
import { dataType } from '../../utils/types';
import { useSelector } from 'react-redux';
export default function IngredientDetails() {
  const { selectedIngredient } = useSelector((store) => store.ingredients);
  return (
    <div className={styles.container}>
      <img className={styles.image} src={selectedIngredient.image} alt={selectedIngredient.name} />
      <p className="text text_type_main-medium mt-4 mb-8">{selectedIngredient.name}</p>
      <ul className={styles.list}>
        <li className={styles.item + ' mr-5'}>
          <p className="text text_type_main-default text_color_inactive">Калории,ккал</p>
          <p className="text text_type_digits-default text_color_inactive">{selectedIngredient.calories}</p>
        </li>
        <li className={styles.item + ' mr-5'}>
          <p className="text text_type_main-default text_color_inactive">Белки, г</p>
          <p className="text text_type_digits-default text_color_inactive">{selectedIngredient.proteins}</p>
        </li>
        <li className={styles.item + ' mr-5'}>
          <p className="text text_type_main-default text_color_inactive">Жиры, г</p>
          <p className="text text_type_digits-default text_color_inactive">{selectedIngredient.fat}</p>
        </li>
        <li className={styles.item + ' mb-8'}>
          <p className="text text_type_main-default text_color_inactive">Углеводы, г</p>
          <p className="text text_type_digits-default text_color_inactive">{selectedIngredient.carbohydrates}</p>
        </li>
      </ul>
    </div>
  )
}

IngredientDetails.propTypes = {
  selectedIngredient: dataType,
}