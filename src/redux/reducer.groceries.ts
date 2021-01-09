import * as RD from "@devexperts/remote-data-ts";
import * as R from "fp-ts/lib/Record";
import * as O from "fp-ts/lib/Option";
import * as fns from "fp-ts/lib/function";
import { pipe } from "fp-ts/lib/pipeable";

import { Actions } from "./actions.groceries";
import {
  GET_GROCERIES_ERROR,
  GET_GROCERIES_REQUEST,
  GET_GROCERIES_SUCCESS,
  GET_GROCERY_ERROR,
  GET_GROCERY_REQUEST,
  GET_GROCERY_SUCCESS,
} from "./constants.groceries";
import { Groceries, GroceriesRD, Grocery } from "./types.appState";

export type GroceriesState = {
  entities: GroceriesRD;
};

export const groceriesReducer = (
  state: GroceriesState = {
    entities: RD.pending,
  },
  action: Actions
): GroceriesState | undefined => {
  switch (action.type) {
    /**
     * Groceries
     */
    case GET_GROCERIES_REQUEST:
      return {
        ...state,
        entities: RD.pending,
      };
    case GET_GROCERIES_SUCCESS: {
      const groceries: Groceries = action.payload.reduce(
        (acc: Groceries, curr: Grocery) => {
          return R.insertAt<string, RD.RemoteData<string, Grocery>>(
            curr.id.toString(),
            RD.success(curr)
          )(acc);
        },
        {}
      );

      return {
        ...state,
        entities: RD.success(groceries),
      };
    }
    case GET_GROCERIES_ERROR: {
      return {
        ...state,
        entities: RD.failure("Failed to fetch groceries"),
      };
    }

    /**
     * Grocery
     */

    case GET_GROCERY_REQUEST: {
      const id = action.payload;
      const prevEntities = RD.success({
        ...pipe(
          state.entities,
          RD.toOption,
          O.fold<Groceries, Groceries>(() => ({}), fns.identity)
        ),
      });

      return {
        ...state,
        entities: {
          ...prevEntities,
          [id]: RD.pending,
        },
      };
    }

    case GET_GROCERY_SUCCESS: {
      const id = action.payload.id;
      const prevEntities = RD.success({
        ...pipe(
          state.entities,
          RD.toOption,
          O.fold<Groceries, Groceries>(() => ({}), fns.identity)
        ),
      });

      return {
        ...state,
        entities: {
          ...prevEntities,
          [id]: RD.success(action.payload),
        },
      };
    }

    case GET_GROCERY_ERROR: {
      const id = action.payload;
      const prevEntities = RD.success({
        ...pipe(
          state.entities,
          RD.toOption,
          O.fold<Groceries, Groceries>(() => ({}), fns.identity)
        ),
      });

      return {
        ...state,
        entities: {
          ...prevEntities,
          [id]: RD.failure("There was an error fetching the grocery item"),
        },
      };
    }

    default:
      return state;
  }
};
