import React from 'react'
import styles from './ingredient.module.css';
import { dataType } from '../../utils/types';
import PropTypes from 'prop-types';
import { 
  Counter,
  CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';

export default function Ingredient({el, setIngredientOpened}) {
  return (
    <li className={styles.item + " mt-6 ml-5"}  onClick={() => setIngredientOpened(el._id)}>
      <Counter count={1} size="default"/>
      <img className='ml-4 mr-4' src={el.image} alt={el.name}/>
      <div className={styles.priceContainer + " mt-1 mb-1"}>
        <p className="text text_type_digits-default mr-2">{el.price}</p>
        <CurrencyIcon type="primary"/>
      </div>
      <p className="text text_type_main-default">
        {el.name}
      </p>
    </li>
  )
}

Ingredient.propTypes = {
  el: dataType,
  setIngredientOpened: PropTypes.func.isRequired,
}