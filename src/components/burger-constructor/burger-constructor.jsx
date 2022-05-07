import { 
  ConstructorElement,
  Button,
  CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { saveOrder } from '../../services/actions/order.js';
import styles from './burger-constructor.module.css';
import { dataType } from '../../utils/types';
import { useDispatch, useSelector } from 'react-redux';
import { useDrop } from 'react-dnd';
import { ADD_INGREDIENT} from '../../services/actions/burger';
import BurgerConstructorIngredient from '../burger-constructor-ingredient/burger-constructor-ingredient'

function BurgerConstructor() {
  const dispatch = useDispatch();
  
  const { ingredients } = useSelector((store) => store.ingredients);
  const { burgerStructure} = useSelector((store) => store.burger);

  // сохраняем бургер на сервер
  const handleOrderClick = () => {
    dispatch(saveOrder(burgerStructure.map((element)=>{return element._id})));
  }

  let index = 1;
  const indexIncrement = () => {
    return index++;
  };

  const addIngredient = (id) => {
    const ingredient = ingredients.find((el) => el._id === id);
    dispatch({
      type: ADD_INGREDIENT,
      ingredient: { ...ingredient, Id: indexIncrement() } });
  };


  const [{ opacity }, target] = useDrop({
    accept: 'ingredient',
    drop(el) {
      addIngredient(el.id);
    },
    collect: (monitor) => ({
      opacity: monitor.isOver() ? 0.5 : 1,
    }),
  });

  return (
    <section  ref={target} style={{maxWidth: 570, opacity}} className={`section ml-10 mt-25`}>
        <div>
          <div className='ml-6 mr-6 mb-4'>
            <ConstructorElement
              type="top"
              isLocked={true}
              text={burgerStructure[0].name}
              price={burgerStructure[0].price}
              thumbnail={burgerStructure[0].image}
            />
          </div>

          <ul className={styles.list}>
            {burgerStructure && 
            burgerStructure
              .filter((el, i, arr) => arr.findIndex(res => res._id == el._id) == i)
              .map( (el, i)=>{
                if (el.type == "bun"){
                  return null
                }else {
                  return ( 
                    <BurgerConstructorIngredient key={indexIncrement()} el={el} i={i} />
                  )
                }
              })
            }
          </ul>

          <div className='ml-6 mr-6 mt-4'>
            <ConstructorElement
              type="bottom"
              isLocked={true}
              text={burgerStructure[0].name}
              price={burgerStructure[0].price}
              thumbnail={burgerStructure[0].image}
            />
          </div>
        </div>
      
      
        <div className={styles.buttonContainer +' mt-10'}>
          <p className="text text_type_main-large mr-2">
            {burgerStructure && burgerStructure.reduce( (total, current) => {
              return total + Number(current.price)
            },burgerStructure[0].price)
            }
          </p>
          <div className='mr-10'>
            <CurrencyIcon type="primary" />
          </div>
          <Button type="primary" size="large" onClick={handleOrderClick}>
            Оформить заказ
          </Button>
        </div>
      
    </section>
  );
}

BurgerConstructor.propTypes = {
  burgerStructure: dataType,
}

export default BurgerConstructor;


