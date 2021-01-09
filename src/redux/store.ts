import { combineReducers } from "redux";
import { combineEpics } from "redux-observable";

import { groceriesReducer } from "./reducer.groceries";
import { groceriesEpic } from "./epics.groceries";

export const rootEpic = combineEpics(groceriesEpic);

export const rootReducer = combineReducers({
  groceriesReducer,
});
