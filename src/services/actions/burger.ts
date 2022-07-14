import { TIngredient } from "../types/data";

export const ADD_INGREDIENT = "ADD_INGREDIENT";
export const REMOVE_INGREDIENT = "REMOVE_INGREDIENT";
export const SORT_INGREDIENTS = "SORT_INGREDIENTS";
export const CLEAR_BURGER = "CLEAR_BURGER";

export interface IAddIngredientAction {
  readonly type: typeof ADD_INGREDIENT;
  readonly ingredient: TIngredient;
}

export interface IRemoveIngredientAction {
  readonly type: typeof REMOVE_INGREDIENT;
  readonly ingredient: TIngredient;
}

export interface IClearBurgerAction {
  readonly type: typeof CLEAR_BURGER;
}

export interface ISortIngredientsAction {
  readonly type: typeof SORT_INGREDIENTS;
  readonly idFrom: number;
  readonly idTo: number;
}

export type TBurgerActions =
  | IAddIngredientAction
  | IRemoveIngredientAction
  | IClearBurgerAction
  | ISortIngredientsAction;

export const addIngredient = (
  ingredient: TIngredient
): IAddIngredientAction => ({
  type: ADD_INGREDIENT,
  ingredient,
});

export const removeIngredient = (
  ingredient: TIngredient
): IRemoveIngredientAction => ({
  type: REMOVE_INGREDIENT,
  ingredient,
});

export const clearBurger = (): IClearBurgerAction => ({
  type: CLEAR_BURGER,
});

export const sortIngredients = (
  idFrom: number,
  idTo: number
): ISortIngredientsAction => ({
  type: SORT_INGREDIENTS,
  idFrom,
  idTo,
});
