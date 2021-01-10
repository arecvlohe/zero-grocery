import * as RD from "@devexperts/remote-data-ts";
import { definitions } from "./types.supabase";

import { GroceriesState } from "../redux/reducer.groceries";
import { CartState } from "../redux/reducer.cart";

export interface AppState {
  groceries: GroceriesState;
  cart: CartState;
}

export type Grocery = definitions["groceries"];
export type Groceries = Record<string, GroceryRD>;
export type GroceryRD = RD.RemoteData<string, Grocery>;
export type GroceriesRD = RD.RemoteData<string, Groceries>;
export interface CartItem {
  data: Grocery;
  count: number;
}
export type Cart = Record<string, CartItem>;
export type CartArr = Array<CartItem>;
