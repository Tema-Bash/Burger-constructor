import { URL } from "../../utils/consts";
import { checkResponse } from "../../utils/utils";
import { AppDispatch, AppThunk } from "../types";
import { TIngredient } from "../../services/types/data";

export const INGREDIENTS_REQUEST: "INGREDIENTS_REQUEST" = "INGREDIENTS_REQUEST";
export const INGREDIENTS_SUCCESS: "INGREDIENTS_SUCCESS" = "INGREDIENTS_SUCCESS";
export const INGREDIENTS_FAILED: "INGREDIENTS_FAILED" = "INGREDIENTS_FAILED";
export const SELECT_INGREDIENT: "SELECT_INGREDIENT" = "SELECT_INGREDIENT";

export interface IIngredientsRequestAction {
  readonly type: typeof INGREDIENTS_REQUEST;
}

export interface IIngredientsSuccessAction {
  readonly type: typeof INGREDIENTS_SUCCESS;
  readonly ingredients: Array<TIngredient>;
}

export interface IIngredientsFailedAction {
  readonly type: typeof INGREDIENTS_FAILED;
}
export interface IIngredientsSelectedAction {
  readonly type: typeof SELECT_INGREDIENT;
  readonly ingredient: TIngredient;
}

export type TIngredientsActions =
  | IIngredientsRequestAction
  | IIngredientsSuccessAction
  | IIngredientsFailedAction
  | IIngredientsSelectedAction;

export const IngredientsRequest = (): IIngredientsRequestAction => ({
  type: INGREDIENTS_REQUEST,
});

export const IngredientsSuccess = (
  ingredients: Array<TIngredient>
): IIngredientsSuccessAction => ({
  type: INGREDIENTS_SUCCESS,
  ingredients,
});

export const IngredientsFailed = (): IIngredientsFailedAction => ({
  type: INGREDIENTS_FAILED,
});

export const getIngredients: AppThunk = () => {
  return (dispatch: AppDispatch) => {
    dispatch(IngredientsRequest());

    fetch(`${URL}/ingredients`)
      .then(checkResponse)
      .then((res) => {
        if (res && res.success) {
          dispatch(IngredientsSuccess(res.data));
        } else {
          dispatch(IngredientsFailed());
        }
      })
      .catch(() => dispatch(IngredientsFailed()));
  };
};
