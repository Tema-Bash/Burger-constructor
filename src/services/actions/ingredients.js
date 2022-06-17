import { URL } from "../../utils/consts";
import { checkResponse } from "../../utils/utils";

export const INGREDIENTS_REQUEST = "INGREDIENTS_REQUEST";
export const INGREDIENTS_SUCCESS = "INGREDIENTS_SUCCESS";
export const INGREDIENTS_FAILED = "INGREDIENTS_FAILED";
export const SELECT_INGREDIENT = "SELECT_INGREDIENT";

export const getIngredients = () => {
  return (dispatch) => {
    dispatch({
      type: INGREDIENTS_REQUEST,
    });

    fetch(`${URL}/ingredients`)
      .then(checkResponse)
      .then((res) => {
        if (res && res.success) {
          dispatch({
            type: INGREDIENTS_SUCCESS,
            ingredients: res.data,
          });
        } else {
          dispatch({
            type: INGREDIENTS_FAILED,
          });
        }
      })
      .catch(() =>
        dispatch({
          type: INGREDIENTS_FAILED,
        })
      );
  };
};
