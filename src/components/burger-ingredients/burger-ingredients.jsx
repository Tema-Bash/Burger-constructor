import React,{useContext} from 'react';
import { 
  Tab,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-ingredients.module.css';
import PropTypes from 'prop-types';
import { dataType } from '../../utils/types';
import Ingredient from '../ingredient/ingredient';
import BurgerIngredientsContext from "../../context/burger-ingredients-context";

function BurgerIngredients(props) {
  const [current, setCurrent] = React.useState('one')
  const datalist = useContext(BurgerIngredientsContext).data;
  return (
    <main className={styles.main}>
      
      <p className="text text_type_main-large mt-10">
        Соберите бургер
      </p>

      <div className={styles.tab + ' mt-5'}>
        <Tab value="one" active={current === 'one'} onClick={setCurrent}>
          Булки
        </Tab>
        <Tab value="two" active={current === 'two'} onClick={setCurrent}>
          Соусы
        </Tab>
        <Tab value="three" active={current === 'three'} onClick={setCurrent}>
          Начинки
        </Tab>
      </div>

      <div className={styles.lists}>
        <p className="text text_type_main-large mb-6 mt-10">
          Булки
        </p>
        <ul className={styles.list}>
          {datalist && datalist.map( el =>{
            if (el.type == "bun"){
              return (<Ingredient el={el} key={el._id} setIngredientOpened={props.setIngredientOpened}/>)
            }else {
              return null
            }
          })}
        </ul>

        <p className="text text_type_main-large mb-6 mt-10">
          Соусы
        </p>
        <ul className={styles.list}>
          {datalist && datalist.map( el =>{
            if (el.type == "sauce"){
              return (<Ingredient el={el} key={el._id} setIngredientOpened={props.setIngredientOpened}/>)
            }else {
              return null
            }
          })}
        </ul>

        <p className="text text_type_main-large mb-6 mt-10">
          Начинки
        </p>
        <ul className={styles.list}>
          {datalist && datalist.map( el =>{
            if (el.type == "main"){
              return (<Ingredient el={el} key={el._id} setIngredientOpened={props.setIngredientOpened}/>)
            }else {
              return null
            }
          })}
        </ul>
      </div>
    </main>
  );
}

BurgerIngredients.propTypes = {
  datalist: dataType,
  setIngredientOpened: PropTypes.func.isRequired,
}

export default BurgerIngredients;