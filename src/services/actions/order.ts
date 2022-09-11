import { sendOrder } from "../api";
import { AppThunk } from "../types";
import { TIngredient } from "../../services/types/data";
import { clearBurger } from "./burger";

export const ORDER_REQUEST: "ORDER_REQUEST" = "ORDER_REQUEST";
export const ORDER_SUCCESS: "ORDER_SUCCESS" = "ORDER_SUCCESS";
export const ORDER_FAILED: "ORDER_FAILED" = "ORDER_FAILED";
export const CLEAR_ORDER_NUMBER: "CLEAR_ORDER_NUMBER" = "CLEAR_ORDER_NUMBER";

export interface IOrderRequestAction {
  readonly type: typeof ORDER_REQUEST;
}

export interface IOrderSuccessAction {
  readonly type: typeof ORDER_SUCCESS;
  readonly orderNumber: number;
}

export interface IOrderFailedAction {
  readonly type: typeof ORDER_FAILED;
}

export interface IClearOrderNumberAction {
  readonly type: typeof CLEAR_ORDER_NUMBER;
}

export type TOrderActions =
  | IOrderRequestAction
  | IOrderSuccessAction
  | IOrderFailedAction
  | IClearOrderNumberAction;

export const OrderRequest = (): IOrderRequestAction => ({
  type: ORDER_REQUEST,
});

export const OrderSuccess = (orderNumber: number): IOrderSuccessAction => ({
  type: ORDER_SUCCESS,
  orderNumber,
});

export const OrderFailed = (): IOrderFailedAction => ({
  type: ORDER_FAILED,
});

export const clearOrderNumber = (): IClearOrderNumberAction => ({
  type: CLEAR_ORDER_NUMBER,
});

export const saveOrder: AppThunk = (
  ingredients: Array<TIngredient>,
  accessTokenValue: string
) => {
  return (dispatch) => {
    dispatch(OrderRequest());

    sendOrder(ingredients, accessTokenValue)
      .then((res) => {
        if (res && res.success) {
          dispatch(OrderSuccess(res.order.number));
          //очищаем бургер
          dispatch(clearBurger());
        } else {
          dispatch(OrderFailed());
        }
      })
      .catch(() => dispatch(OrderFailed()));
  };
};
