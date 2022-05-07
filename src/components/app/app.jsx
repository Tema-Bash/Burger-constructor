import {useEffect} from 'react';
import styles from './app.module.css';
import AppHeader from '../app-header/app-header'
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import IngredientDetails from '../ingredient-details/ingredient-details';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useDispatch, useSelector } from 'react-redux';
import { SELECT_INGREDIENT, getIngredients } from '../../services/actions/ingredients';
import { CLEAR_ORDER_NUMBER } from '../../services/actions/order';

function App() {
  const dispatch = useDispatch();
  //получаем все ингредиенты в стор
  const { ingredients, selectedIngredient } = useSelector(
    (store) => store.ingredients
  );
  const { orderNumber} = useSelector((store) => store.order);
  //заправшиваем список ингредиентов
  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  const closeAllModals = () => {
    dispatch({ type: CLEAR_ORDER_NUMBER });
    dispatch({ type: SELECT_INGREDIENT });
  };
  
  return (
    <div className={styles.App}>
      {orderNumber &&
        <Modal
          title=""
          onClose={closeAllModals}
        >
          <OrderDetails  orderNumber={orderNumber}/>
        </Modal>
      }
      {selectedIngredient && 
        <Modal
          title = "Детали ингредиента"
          onClose = {closeAllModals}
        >
          <IngredientDetails/>
        </Modal>
      }
      <AppHeader />
      <section className = {styles.container}>
        <DndProvider backend={HTML5Backend}>
          <BurgerIngredients/>
          <BurgerConstructor/>
        </DndProvider>
      </section>
    </div>
  );
}

export default App;