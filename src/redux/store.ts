import { combineReducers } from "redux";
import { combineEpics } from "redux-observable";

import { groceriesReducer } from "./reducer.groceries";
import { groceriesEpic } from "./epics.groceries";
import { cartReducer } from "./reducer.cart";

export const rootEpic = combineEpics(groceriesEpic);

export const rootReducer = combineReducers({
  groceries: groceriesReducer,
  cart: cartReducer,
});
