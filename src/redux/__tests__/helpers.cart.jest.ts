import {
  addGroceryItem,
  AddGroceryItem,
  removeGroceryItem,
  RemoveGroceryItem,
} from "../actions.cart";
import {
  addGroceryItemToEntities,
  removeGroceryItemFromEntities,
} from "../helpers.cart";
import { CartState } from "../reducer.cart";

describe("addGroceryItemToEntities", () => {
  test.each<
    [
      string,
      string,
      CartState["entities"],
      CartState["entities"],
      AddGroceryItem
    ]
  >([
    [
      "item in state with count of 1",
      "item did not exist in state before",
      {
        "1": {
          count: 1,
          data: {
            id: 1,
            description: "",
            ingredients: "",
            price: "",
            name: "",
            size: "",
          },
        },
      },
      {},
      addGroceryItem({
        id: 1,
        description: "",
        ingredients: "",
        price: "",
        name: "",
        size: "",
      }),
    ],
    [
      "item in state with count incremented by 1",
      "item existed in state already",
      {
        "1": {
          count: 2,
          data: {
            id: 1,
            description: "",
            ingredients: "",
            price: "",
            name: "",
            size: "",
          },
        },
      },
      {
        "1": {
          count: 1,
          data: {
            id: 1,
            description: "",
            ingredients: "",
            price: "",
            name: "",
            size: "",
          },
        },
      },
      addGroceryItem({
        id: 1,
        description: "",
        ingredients: "",
        price: "",
        name: "",
        size: "",
      }),
    ],
  ])("should return %s given %s", (_a, _b, expected, prevState, action) => {
    const actual = addGroceryItemToEntities(prevState, action);
    expect(actual).toEqual(expected);
  });
});

describe("removeGroceryItemFromEntities", () => {
  test.each<
    [
      string,
      string,
      CartState["entities"],
      CartState["entities"],
      RemoveGroceryItem
    ]
  >([
    [
      "an empty state",
      "the item does not exist in state",
      {},
      {},
      removeGroceryItem("1"),
    ],
    [
      "an empty state",
      "the item existed in state as the only thing",
      {},
      {
        "1": {
          count: 1,
          data: {
            id: 1,
            description: "",
            ingredients: "",
            size: "",
            price: "",
            name: "",
          },
        },
      },
      removeGroceryItem("1"),
    ],
  ])("should return %s given %s", (_a, _b, expected, prevState, action) => {
    const actual = removeGroceryItemFromEntities(prevState, action);
    expect(actual).toEqual(expected);
  });
});
