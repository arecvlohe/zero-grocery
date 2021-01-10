import { totalItems, totalPrice } from "../helpers.app";
import { Cart, CartArr } from "../types/types.app";

describe("totalPrice", () => {
  test.each<[string, string, CartArr]>([
    ["0.00", "an empty array", []],
    [
      "0.99",
      "an array with 1 item",
      [
        {
          count: 1,
          data: {
            id: 1,
            description: "",
            ingredients: "",
            name: "",
            price: "0.99",
            size: "",
          },
        },
      ],
    ],
    [
      (0.99 * 5).toString(),
      "an array with many items",
      [
        {
          count: 5,
          data: {
            id: 1,
            description: "",
            ingredients: "",
            name: "",
            price: "0.99",
            size: "",
          },
        },
      ],
    ],
  ])("should return %s given %s", (expected, _, cartArr) => {
    const actual = totalPrice(cartArr);
    expect(actual).toEqual(expected);
  });
});

describe("totalItems", () => {
  test.each<[number, string, Cart]>([
    [0, "an empty cart", {}],
    [
      1,
      "a cart with a few items",
      {
        "1": {
          count: 1,
          data: {
            id: 1,
            ingredients: "",
            description: "",
            name: "",
            price: "",
            size: "",
          },
        },
      },
    ],
    [
      10,
      "a cart with a bunch of items",
      {
        "1": {
          count: 5,
          data: {
            id: 1,
            ingredients: "",
            description: "",
            name: "",
            price: "",
            size: "",
          },
        },
        "2": {
          count: 5,
          data: {
            id: 1,
            ingredients: "",
            description: "",
            name: "",
            price: "",
            size: "",
          },
        },
      },
    ],
  ])("should return %i given %s", (expected, _, cart) => {
    const actual = totalItems(cart);
    expect(actual).toEqual(expected);
  });
});
