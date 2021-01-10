import { createSelector } from "reselect";
import { createCachedSelector } from "re-reselect";
import * as RD from "@devexperts/remote-data-ts";
import * as fns from "fp-ts/lib/function";
import { pipe } from "fp-ts/lib/pipeable";
import { lookup } from "fp-ts/lib/Record";

import { AppState } from "../types/types.app";

const groceriesSlice = (state: AppState) => state.groceries.entities;
const grocerySlice = (state: AppState, id: string) => {
  return pipe(
    state.groceries.entities,
    RD.chain((d) => {
      return RD.fromOption(lookup(id, d), () => "Grocery items does not exist");
    })
  );
};

export const groceriesSelector = createSelector(groceriesSlice, fns.identity);
export const grocerySelector = createCachedSelector(
  grocerySlice,
  fns.identity
)((_state, id) => id);
