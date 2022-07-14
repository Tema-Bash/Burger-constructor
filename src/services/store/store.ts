import thunk from "redux-thunk";
import { applyMiddleware, compose, createStore } from "redux";
import { rootReducer } from "../reducers/index";
import { socketMiddleware } from "../web-socket-middleware/web-socket-middleware";
import { wsURL, wsActions } from "../../utils/consts";

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

export const composeEnhancers =
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancer = composeEnhancers(
  applyMiddleware(thunk, socketMiddleware(wsURL, wsActions))
);
export const store: any = createStore(rootReducer, enhancer);

export default store;
