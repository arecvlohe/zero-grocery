import * as A from "fp-ts/lib/Array";
import { pipe } from "fp-ts/lib/pipeable";

import { Cart, CartArr, CartItem } from "./types/types.app";

export const totalPrice = (cart: CartArr): string => {
  return pipe(
    cart,
    A.reduce(0, (acc, curr) => curr.count * JSON.parse(curr.data.price) + acc),
    (total) => total.toFixed(2)
  );
};

export const totalItems = (cart: Cart): number => {
  return pipe(
    cart,
    Object.values,
    A.reduce<CartItem, number>(0, (acc, curr) => curr.count + acc)
  );
};
