import {useRef} from "react";
import {useDispatch} from "react-redux";
import {useDrag, useDrop} from "react-dnd";
import PropTypes from 'prop-types';
import {  REMOVE_INGREDIENT, SORT_INGREDIENTS } from '../../services/actions/burger';
import { 
  ConstructorElement,
  DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from '../burger-constructor-ingredient/burger-constructor-ingredient.module.css';
import {dataType} from '../../utils/types'

function BurgerConstructorIngredient({el, i}) {
  const dispatch = useDispatch()
  const ref = useRef()

  const sortIngredients = (dragId, dropId) => {
    dispatch({ type: SORT_INGREDIENTS, idFrom: dragId, idTo: dropId });
  };

  const removeIngredient = (ingredient) => {
    dispatch({ type: REMOVE_INGREDIENT, ingredient });
  };

  const [{ opacity }, dragRef] = useDrag({
    type: "drag-ingredient",
    item: {i},
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0.2 : 1,
    }),
  })

  const [{isHover}, dropRef] = useDrop({
    accept: "drag-ingredient",
    collect: monitor => ({
      isHover: monitor.isOver()
    }),
    drop(dragIngredient) {
      if (dragIngredient.i === i) {
        return
      }
      sortIngredients(dragIngredient.i, i)
    }
  })

  dragRef(dropRef(ref))

  return (
    <li style={{ opacity }} ref={ref} className={styles.item + " mb-4"} key={el._id}>
      <DragIcon type="primary" />
      <ConstructorElement
        isLocked={false}
        text={el.name}
        price={el.price}
        thumbnail={el.image}
        handleClose={()=>removeIngredient(el)}
      />
    </li>
  )
}

BurgerConstructorIngredient.prototypes = {
  el: dataType.isRequired,
  i: PropTypes.number.isRequired,
}

export default BurgerConstructorIngredient