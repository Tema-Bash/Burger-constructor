import {
  ADD_INGREDIENT,
  REMOVE_INGREDIENT,
  SORT_INGREDIENTS,
  CLEAR_BURGER,
} from "../actions/burger";
import { initialBurger } from "../../utils/consts";

const initialState = {
  burgerStructure: initialBurger,
};

export const burgerReducer = (state = initialState, action) => {
  let burgerStructure = [...state.burgerStructure];
  const { ingredient } = action;

  switch (action.type) {
    case CLEAR_BURGER:
      burgerStructure = initialBurger;
      return {
        ...state,
        burgerStructure,
      };

    case ADD_INGREDIENT:
      if (ingredient.type === "bun") {
        //чтобы добавление булки не перезаписывало добавленный первым игредиент:
        if (
          burgerStructure.some((elem) => {
            return elem?.type == "bun";
          })
        ) {
          //есть ли булка в собранном бургере?
          burgerStructure[0] = ingredient;
        } else burgerStructure.unshift(ingredient);
      } else {
        burgerStructure.push(ingredient);
      }
      return {
        ...state,
        burgerStructure,
      };

    case REMOVE_INGREDIENT:
      burgerStructure = burgerStructure.filter(
        (item) => item.uuid !== ingredient.uuid
      );
      return {
        ...state,
        burgerStructure,
      };

    case SORT_INGREDIENTS:
      const { idFrom, idTo } = action;
      const sorted = burgerStructure.splice(idFrom, 1)[0];
      burgerStructure = [
        ...burgerStructure.slice(0, idTo),
        sorted,
        ...burgerStructure.slice(idTo),
      ];
      return {
        ...state,
        burgerStructure,
      };

    default:
      return state;
  }
};
