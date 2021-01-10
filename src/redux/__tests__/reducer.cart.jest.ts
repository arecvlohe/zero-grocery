import { addGroceryItem, removeGroceryItem } from "../actions.cart";
import { cartReducer, CartState } from "../reducer.cart";

describe("cartReducer", () => {
  it("should return a new entity in the cart given a grocery item", () => {
    const actual = cartReducer(
      { entities: {} },
      addGroceryItem({
        id: 1,
        description: "",
        ingredients: "",
        name: "",
        price: "",
        size: "",
      })
    );
    const expected: CartState = {
      entities: {
        "1": {
          count: 1,
          data: {
            id: 1,
            description: "",
            ingredients: "",
            name: "",
            price: "",
            size: "",
          },
        },
      },
    };
    expect(actual).toEqual(expected);
  });

  it("should remove an entity from the cart given an id", () => {
    const actual = cartReducer(
      {
        entities: {
          "1": {
            count: 1,
            data: {
              id: 1,
              description: "",
              ingredients: "",
              name: "",
              price: "",
              size: "",
            },
          },
        },
      },
      removeGroceryItem("1")
    );
    const expected: CartState = { entities: {} };

    expect(actual).toEqual(expected);
  });
});
