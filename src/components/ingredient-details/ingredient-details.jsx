import styles from './ingredient-details.module.css'
import React from 'react';

export default function IngredientDetails({IngredientOpened}) {
  return (
    <div className={styles.container}>
      <img className={styles.image} src={IngredientOpened.image} alt={IngredientOpened.name} />
      <p className="text text_type_main-medium mt-4 mb-8">{IngredientOpened.name}</p>
      <ul className={styles.list}>
        <li className={styles.item + ' mr-5'}>
          <p className="text text_type_main-default text_color_inactive">Калории,ккал</p>
          <p className="text text_type_digits-default text_color_inactive">{IngredientOpened.calories}</p>
        </li>
        <li className={styles.item + ' mr-5'}>
          <p className="text text_type_main-default text_color_inactive">Белки, г</p>
          <p className="text text_type_digits-default text_color_inactive">{IngredientOpened.proteins}</p>
        </li>
        <li className={styles.item + ' mr-5'}>
          <p className="text text_type_main-default text_color_inactive">Жиры, г</p>
          <p className="text text_type_digits-default text_color_inactive">{IngredientOpened.fat}</p>
        </li>
        <li className={styles.item + ' mb-8'}>
          <p className="text text_type_main-default text_color_inactive">Углеводы, г</p>
          <p className="text text_type_digits-default text_color_inactive">{IngredientOpened.carbohydrates}</p>
        </li>
      </ul>
    </div>
  )
}
