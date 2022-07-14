import {
  WS_CONNECTION_START,
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_ERROR,
  WS_SEND_MESSAGE,
  WS_GET_MESSAGE,
} from "../services/actions/web-socket";

export const wsActions = {
  wsInit: WS_CONNECTION_START,
  onOpen: WS_CONNECTION_SUCCESS,
  onClose: WS_CONNECTION_CLOSED,
  onError: WS_CONNECTION_ERROR,
  wsSendMessage: WS_SEND_MESSAGE,
  onMessage: WS_GET_MESSAGE,
};

export const URL = "https://norma.nomoreparties.space/api";
export const initialBurger = [];
export const tokenlifeTime = 20 * 60;
export const wsURL = "wss://norma.nomoreparties.space/orders";
