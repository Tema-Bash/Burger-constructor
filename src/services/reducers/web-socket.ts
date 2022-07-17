import {
  WS_CONNECTION_START,
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_GET_MESSAGE,
  TWebSocketActions,
} from "../actions/web-socket";
import { TOrder } from "../types/data";

type TWebSocketState = {
  wsConnected: boolean;
  wsRequested: boolean;
  wsSecure: boolean;
  orders: Array<TOrder>;
  total?: number;
  totalToday?: number;
};

const initialState: TWebSocketState = {
  wsConnected: false,
  wsRequested: false,
  wsSecure: false,
  orders: [],
};

export const wsReducer = (state = initialState, action: TWebSocketActions) => {
  switch (action.type) {
    case WS_CONNECTION_START:
      return {
        ...state,
        wsRequested: true,
        wsConnected: false,
        wsSecure: action.payload?.token ? true : false,
      };

    case WS_CONNECTION_SUCCESS:
      return {
        ...state,
        wsRequested: false,
        wsConnected: true,
      };

    case WS_CONNECTION_ERROR:
      return {
        ...state,
        wsRequested: false,
        wsConnected: false,
      };

    case WS_CONNECTION_CLOSED:
      return {
        ...initialState,
        wsConnected: false,
      };

    case WS_GET_MESSAGE:
      return {
        ...state,
        orders: action.payload.orders,
        total: action.payload.total,
        totalToday: action.payload.totalToday,
      };

    default:
      return state;
  }
};
