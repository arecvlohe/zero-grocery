import * as RD from "@devexperts/remote-data-ts";

import { groceriesReducer, GroceriesState } from "../reducer.groceries";
import {
  getGroceriesError,
  getGroceriesRequest,
  getGroceriesSuccess,
} from "../actions.groceries";

describe("groceriesReducer", () => {
  it("should return pending given pending action", () => {
    const actual = groceriesReducer(
      { entities: RD.initial },
      getGroceriesRequest()
    );
    const expected = { entities: RD.pending };
    expect(actual).toEqual(expected);
  });
  it("should return error given error action", () => {
    const actual = groceriesReducer(
      { entities: RD.pending },
      getGroceriesError()
    );
    const expected = {
      entities: RD.failure("Failed to fetch groceries"),
    };
    expect(actual).toEqual(expected);
  });

  it("should return success given success action", () => {
    const actual = groceriesReducer(
      { entities: RD.pending },
      getGroceriesSuccess([
        {
          id: 1,
          description: "",
          ingredients: "",
          name: "",
          size: "",
          price: "",
        },
      ])
    );
    const expected: GroceriesState = {
      entities: RD.success({
        "1": RD.success({
          id: 1,
          description: "",
          ingredients: "",
          name: "",
          size: "",
          price: "",
        }),
      }),
    };
    expect(actual).toEqual(expected);
  });
});
