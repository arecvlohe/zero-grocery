import { createSelector } from "reselect";
import * as fns from "fp-ts/lib/function";

import { AppState } from "./types.appState";

const cartSlice = (state: AppState) => state.cart.entities;

export const cartSelector = createSelector(cartSlice, fns.identity);
