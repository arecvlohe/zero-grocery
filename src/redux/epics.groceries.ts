import { mergeMap } from "rxjs/operators";
import { from, Observable } from "rxjs";
import { ofType, ActionsObservable } from "redux-observable";

import * as actions from "./actions.groceries";
import * as constants from "./constants.groceries";
import { groceriesApi } from "../api/groceries";

export const groceriesEpic = (
  action$: ActionsObservable<actions.GetGroceriesRequest>
): Observable<actions.GetGroceriesError | actions.GetGroceriesSuccess> =>
  action$.pipe(
    ofType(constants.GET_GROCERIES_REQUEST),
    mergeMap((_action: actions.GetGroceriesRequest) =>
      from(
        groceriesApi
          .getGroceries()
          .then((d) => {
            const { data, error } = d;
            if (error) {
              return actions.getGroceriesError();
            }

            if (data === null) {
              return actions.getGroceriesSuccess([]);
            }

            return actions.getGroceriesSuccess(data);
          })
          .catch((_e) => {
            return actions.getGroceriesError();
          })
      )
    )
  );

export const groceryEpic = (
  action$: ActionsObservable<actions.GetGroceryRequest>
): Observable<actions.GetGroceryError | actions.GetGrocerySuccess> =>
  action$.pipe(
    ofType(constants.GET_GROCERY_REQUEST),
    mergeMap((action: actions.GetGroceryRequest) =>
      from(
        groceriesApi
          .getGrocery(action.payload)
          .then((d) => {
            const { data } = d;

            if (data === null) {
              return actions.getGroceryError(action.payload);
            }

            return actions.getGrocerySuccess(data);
          })
          .catch((_e) => {
            return actions.getGroceryError(action.payload);
          })
      )
    )
  );
