import { 
  ADD_INGREDIENT,
  REMOVE_INGREDIENT,
  SORT_INGREDIENTS
  } from '../actions/burger';
import {initialBurger} from '../../utils/consts';

//Начальный предложенный бургер
const initialState = {
  burgerStructure: initialBurger,
};

export const burgerReducer = (state = initialState, action) => {
  let burgerStructure = [...state.burgerStructure];
  const { ingredient } = action;

  switch (action.type) {
    case ADD_INGREDIENT:
      if (ingredient.type === 'bun') {
        burgerStructure[0] = ingredient;
      } else {
        burgerStructure.push(ingredient);
      }
      return {
        ...state,
        burgerStructure,
      };

    case REMOVE_INGREDIENT:
      burgerStructure = burgerStructure.filter((item) => item.Id !== ingredient.Id);
      return {
        ...state,
        burgerStructure,
      };

    case SORT_INGREDIENTS:
      const { idFrom, idTo } = action;
      const sorted = burgerStructure.splice(idFrom, 1)[0]
      burgerStructure = [...burgerStructure.slice(0, idTo), sorted, ...burgerStructure.slice(idTo)];
      return {
        ...state,
        burgerStructure,
      };
    
    default:
      return state;
  }
};


