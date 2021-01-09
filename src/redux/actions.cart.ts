import { definitions } from "../types/supabase";
import { ADD_GROCERY_ITEM, REMOVE_GROCERY_ITEM } from "./constants.cart";

export type AddGroceryItem = {
  type: typeof ADD_GROCERY_ITEM;
  payload: definitions["groceries"];
};

export const addGroceryItem = (
  payload: definitions["groceries"]
): AddGroceryItem => ({
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
