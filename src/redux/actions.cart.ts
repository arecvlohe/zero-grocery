import { ADD_GROCERY_ITEM, REMOVE_GROCERY_ITEM } from "./constants.cart";
import { Grocery } from "../types/types.app";

export type AddGroceryItem = {
  type: typeof ADD_GROCERY_ITEM;
  payload: Grocery;
};

export const addGroceryItem = (payload: Grocery): AddGroceryItem => ({
  type: ADD_GROCERY_ITEM,
  payload,
});

export type RemoveGroceryItem = {
  type: typeof REMOVE_GROCERY_ITEM;
  payload: string;
};

export const removeGroceryItem = (payload: string): RemoveGroceryItem => ({
  type: REMOVE_GROCERY_ITEM,
  payload,
});
