import { AddGroceryItem, RemoveGroceryItem } from "./actions.cart";
import { ADD_GROCERY_ITEM, REMOVE_GROCERY_ITEM } from "./constants.cart";
import * as R from "fp-ts/lib/Record";
import * as fns from "fp-ts/lib/function";
import * as O from "fp-ts/lib/Option";
import { pipe } from "fp-ts/lib/pipeable";

import { Cart } from "./types.appState";

type Actions = AddGroceryItem | RemoveGroceryItem;

export interface CartState {
  entities: Cart;
}

export const cartReducer = (
  state: CartState = { entities: {} },
  action: Actions
): CartState | undefined => {
  switch (action.type) {
    case ADD_GROCERY_ITEM: {
      const nextEntities: CartState["entities"] = pipe(
        state.entities,
        R.modifyAt(action.payload.id.toString(), (g) => ({
          data: g.data,
          count: fns.increment(g.count),
        })),
        O.alt(() =>
          O.some(
            R.insertAt(action.payload.id.toString(), {
              data: action.payload,
              count: 1,
            })(state.entities)
          )
        ),
        O.getOrElse(() => ({}))
      );
      return {
        ...state,
        entities: nextEntities,
      };
    }

    case REMOVE_GROCERY_ITEM: {
      const nextEntities = R.deleteAt(action.payload)(state.entities);

      return {
        ...state,
        entities: nextEntities,
      };
    }

    default:
      return state;
  }
};
