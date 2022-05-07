import { combineReducers } from 'redux';
import { burgerReducer } from './burger';
import { ingredientsReducer } from './ingredients';
import { orderReducer } from './order';

export const rootReducer = combineReducers({
  burger: burgerReducer,
  ingredients: ingredientsReducer,
  order: orderReducer,
});