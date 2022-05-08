import { 
  CLEAR_ORDER_NUMBER,
  ORDER_REQUEST, 
  ORDER_SUCCESS,
  ORDER_FAILED 
} from '../actions/order';

const initialState = {
  orderNumber: undefined,
  orderRequested: false,
  orderFailed: false,
};

export const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case ORDER_REQUEST:
      return {
        ...state,
        orderRequested: true,
        orderFailed: false,
      };

    case ORDER_SUCCESS:
      return {
        ...state,
        orderNumber: action.orderNumber,
        orderRequested: false,
        orderFailed: false,
      };

    case ORDER_FAILED:
      return {
        ...state,
        orderFailed: true,
      };

    case CLEAR_ORDER_NUMBER:
      return {
        ...state,
        orderNumber: null,
      };

    default:
      return state;
  }
};
