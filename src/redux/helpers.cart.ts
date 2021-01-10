import * as O from "fp-ts/lib/Option";
import * as R from "fp-ts/lib/Record";
import * as fns from "fp-ts/lib/function";
import { pipe } from "fp-ts/lib/pipeable";

import { CartState } from "./reducer.cart";
import { AddGroceryItem, RemoveGroceryItem } from "./actions.cart";

export const addGroceryItemToEntities = (
  entities: CartState["entities"],
  action: AddGroceryItem
): CartState["entities"] => {
  return pipe(
    entities,
    R.modifyAt(action.payload.id.toString(), (g) => ({
      data: g.data,
      count: fns.increment(g.count),
    })),
    O.alt(() =>
      O.some(
        R.insertAt(action.payload.id.toString(), {
          data: action.payload,
          count: 1,
        })(entities)
      )
    ),
    O.getOrElse(() => ({}))
  );
};

export const removeGroceryItemFromEntities = (
  entities: CartState["entities"],
  action: RemoveGroceryItem
): CartState["entities"] => {
  return R.deleteAt(action.payload)(entities);
};
