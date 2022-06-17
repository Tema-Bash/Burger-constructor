import { combineReducers } from "redux";
import { burgerReducer } from "./burger";
import { ingredientsReducer } from "./ingredients";
import { orderReducer } from "./order";
import { authReducer } from "./authorization";

export const rootReducer = combineReducers({
  burger: burgerReducer,
  ingredients: ingredientsReducer,
  order: orderReducer,
  auth: authReducer,
});
