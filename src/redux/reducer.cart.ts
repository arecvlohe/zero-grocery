import { AddGroceryItem, RemoveGroceryItem } from "./actions.cart";
import { ADD_GROCERY_ITEM, REMOVE_GROCERY_ITEM } from "./constants.cart";

import { Cart } from "../types/types.app";
import {
  addGroceryItemToEntities,
  removeGroceryItemFromEntities,
} from "./helpers.cart";

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
      const nextEntities = addGroceryItemToEntities(state.entities, action);

      return {
        ...state,
        entities: nextEntities,
      };
    }

    case REMOVE_GROCERY_ITEM: {
      const nextEntities = removeGroceryItemFromEntities(
        state.entities,
        action
      );

      return {
        ...state,
        entities: nextEntities,
      };
    }

    default:
      return state;
  }
};
