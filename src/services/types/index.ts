import { Action, ActionCreator, Dispatch } from "redux";
import { ThunkAction } from "redux-thunk";
import { TBurgerActions } from "../actions/burger";
import { TIngredientsActions } from "../actions/ingredients";
import { TOrderActions } from "../actions/order";
import { TAuthUserActions } from "../actions/authorization";
import { TWebSocketActions } from "../actions/web-socket";
import { store } from "../store/store";

export type RootState = ReturnType<typeof store.getState>;

export type TApplicationActions =
  | TBurgerActions
  | TIngredientsActions
  | TOrderActions
  | TAuthUserActions
  | TWebSocketActions;

export type AppThunk<TReturn = void> = ActionCreator<
  ThunkAction<TReturn, Action, RootState, TApplicationActions>
>;

export type AppDispatch = Dispatch<TApplicationActions>;
