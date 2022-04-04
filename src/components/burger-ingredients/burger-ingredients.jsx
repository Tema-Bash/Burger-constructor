import React from 'react';
import { 
  Counter,
  Tab,
  CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-ingredients.module.css';
import PropTypes from 'prop-types';


function BurgerIngredients(props) {
  const [current, setCurrent] = React.useState('one')
  const datalist = props.data.data;
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
              return (           
                <li className={styles.item + " mt-6 ml-5"} key={el._id} onClick={() => props.setIngredientOpened(el._id)}>
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
              return (           
                <li className={styles.item + " mt-6 ml-5"} key={el._id} onClick={() => props.setIngredientOpened(el._id)}>
                  <Counter count={1} size="default" />
                  <img className='ml-4 mr-4' src={el.image} alt="" />
                  <div className={styles.priceContainer  + " mt-1 mb-1"}>
                    <p className="text text_type_digits-default mr-2">{el.price}</p>
                    <CurrencyIcon type="primary" />
                  </div>
                  <p className="text text_type_main-default">
                    {el.name}
                  </p>
                </li>
                )
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
              return (           
                <li className={styles.item + " mt-6 ml-5"} key={el._id} onClick={() => props.setIngredientOpened(el._id)}>
                  <Counter count={1} size="default" />
                  <img className='ml-4 mr-4' src={el.image} alt=""/>
                  <div className={styles.priceContainer + " mt-1 mb-1"}>
                    <p className="text text_type_digits-default mr-2">{el.price}</p>
                    <CurrencyIcon type="primary" />
                  </div>
                  <p className="text text_type_main-default">
                    {el.name}
                  </p>
                </li>
                )
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
  datalist: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['bun', 'main', 'sauce']),
    proteins: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    carbohydrates: PropTypes.number.isRequired,
    calories: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    image_mobile: PropTypes.string.isRequired,
    image_large: PropTypes.string.isRequired,
    __v: PropTypes.number,
  }),
  setIngredientOpened: PropTypes.func.isRequired,
}

export default BurgerIngredients;