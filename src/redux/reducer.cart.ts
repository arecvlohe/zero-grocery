import { AddGroceryItem, RemoveGroceryItem } from "./actions.cart";
import { ADD_GROCERY_ITEM, REMOVE_GROCERY_ITEM } from "./constants.cart";
import * as R from "fp-ts/lib/Record";

import { Cart } from "./types.appState";

type Actions = AddGroceryItem | RemoveGroceryItem;

export type CartState = {
  entities: Cart;
};

export const cartReducer = (
  state: CartState = { entities: {} },
  action: Actions
): CartState | undefined => {
  switch (action.type) {
    case ADD_GROCERY_ITEM: {
      const nextEntities = R.insertAt(
        action.payload.id.toString(),
        action.payload
      )(state.entities);
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
