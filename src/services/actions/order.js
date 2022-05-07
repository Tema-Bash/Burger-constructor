import {URL} from '../../utils/consts'
import {checkResponse} from '../../utils/utils'

export const ORDER_REQUEST = 'ORDER_REQUEST';
export const ORDER_SUCCESS = 'ORDER_SUCCESS';
export const ORDER_FAILED = 'ORDER_FAILED';
export const CLEAR_ORDER_NUMBER = 'CLEAR_ORDER_NUMBER';



export const saveOrder = (ingredients) => {
  return (dispatch) => {
    dispatch({
      type: ORDER_REQUEST,
    });

    fetch(`${URL}/orders`,{
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        ingredients: ingredients,
      }),
    })
    .then(checkResponse)
    .then((res) => {
      if (res && res.success) {
        dispatch({
          type: ORDER_SUCCESS,
          orderNumber: res.order.number,
        });
      } else {
        dispatch({
          type: ORDER_FAILED,
        });
      }
    })
    .catch(() => dispatch({ type: ORDER_FAILED }));
  };
};
