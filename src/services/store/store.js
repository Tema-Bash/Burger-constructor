import thunk from "redux-thunk";
import { applyMiddleware, compose, createStore } from "redux";
import { rootReducer } from "../reducers/index";
import { socketMiddleware } from "../web-socket-middleware/web-socket-middleware";
import { wsURL, wsActions } from "../../utils/consts";

const composeEnhancers =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const enhancer = composeEnhancers(
  applyMiddleware(thunk, socketMiddleware(wsURL, wsActions))
);
const store = createStore(rootReducer, enhancer);

export default store;
