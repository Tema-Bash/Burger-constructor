import {
  INGREDIENTS_REQUEST,
  INGREDIENTS_SUCCESS,
  INGREDIENTS_FAILED,
  SELECT_INGREDIENT,
} from "../actions/ingredients";
import { TIngredient } from "../../services/types/data";
import { TIngredientsActions } from "../actions/ingredients";

interface TinitialState {
  ingredients: Array<TIngredient>;
  ingredientsRequested: boolean;
  ingredientsFailed: boolean;
  selectedIngredient: TIngredient | undefined;
}

const initialState: TinitialState = {
  ingredients: [],
  ingredientsRequested: false,
  ingredientsFailed: false,
  selectedIngredient: undefined,
};

export const ingredientsReducer = (
  state = initialState,
  action: TIngredientsActions
) => {
  switch (action.type) {
    case INGREDIENTS_REQUEST:
      return {
        ...state,
        ingredientsRequested: true,
        ingredientsFailed: false,
      };

    case INGREDIENTS_SUCCESS:
      return {
        ...state,
        ingredients: action.ingredients,
        ingredientsRequested: false,
        ingredientsFailed: false,
      };

    case INGREDIENTS_FAILED:
      return {
        ...initialState,
        ingredientsFailed: true,
      };

    case SELECT_INGREDIENT:
      return {
        ...state,
        selectedIngredient: action.ingredient,
      };

    default:
      return state;
  }
};
