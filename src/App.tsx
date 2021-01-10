import React from "react";
import * as RD from "@devexperts/remote-data-ts";
import * as O from "fp-ts/lib/Option";
import * as R from "fp-ts/lib/Record";
import { pipe } from "fp-ts/lib/pipeable";

import { useDispatch, useSelector } from "react-redux";
import { getGroceriesRequest } from "./redux/actions.groceries";
import { groceriesSelector } from "./redux/selectors.groceries";
import { CartItem, Grocery } from "./types/types.app";
import { addGroceryItem } from "./redux/actions.cart";
import { cartSelector } from "./redux/selectors.cart";
import { totalItems, totalPrice } from "./helpers.app";

function Modal({
  state,
  cart,
}: {
  state: "open" | "closed";
  cart: Array<CartItem>;
}) {
  const classes = state === "open" ? "block" : "hidden";

  return (
    <div
      className={
        `${classes}` +
        " absolute border-2 p-4 z-10 bg-white rounded-md space-y-4"
      }
      style={{ width: 400, left: -320 }}
    >
      <div className="pb-2 text-lg border-b-2 border-gray-100">
        Shopping Cart
      </div>
      <div className="space-y-4">
        {cart.map((item) => {
          return (
            <div className="grid items-center grid-cols-3 pb-4 border-b-2 border-gray-100 last:border-0">
              <img
                src={item.data.imageUrl}
                className="rounded-md img-sm"
                alt={item.data.name}
              />
              <div className="capitalize">{item.data.name}</div>
              <div>
                ${item.data.price} / {item.data.size} x {item.count}
              </div>
            </div>
          );
        })}
        <div className="flex justify-between">
          <div>Total </div>
          <div>${totalPrice(cart)}</div>
        </div>
      </div>
    </div>
  );
}

function App() {
  const dispatch = useDispatch();
  const groceriesRD = useSelector(groceriesSelector);
  const cart = useSelector(cartSelector);

  const cartItems: Array<CartItem> = pipe(cart, Object.values);

  const [animateButtons, setAnimateButtons] = React.useState<
    Record<string, "added" | "initial">
  >({});
  const [modalState, setModalState] = React.useState<"open" | "closed">(
    "closed"
  );

  const animateButton = (id: string) => {
    setAnimateButtons({ [id]: "added" });
  };

  const addToCart = (grocery: Grocery) => {
    dispatch(addGroceryItem(grocery));
  };

  React.useEffect(() => {
    dispatch(getGroceriesRequest());
  }, [dispatch]);

  return (
    <div>
      <header className="flex justify-between p-8 border-b-2 border-black">
        <span className="text-xl">Adam's Grocery Store</span>
        <span
          className="relative"
          onClick={() => {
            setModalState(modalState === "open" ? "closed" : "open");
          }}
        >
          <button type="button" style={{ minWidth: 80 }} className="relative">
            Cart{" "}
            <span
              className="absolute flex items-center justify-center p-1 text-xs text-white bg-black rounded-full"
              style={{ top: -10, left: 54, width: 20, height: 20 }}
            >
              {totalItems(cart)}
            </span>
          </button>
          <Modal state={modalState} cart={cartItems} />
        </span>
      </header>
      <div className="max-w-screen-lg px-8 py-8 mx-auto my-0">
        {pipe(
          groceriesRD,
          RD.fold(
            () => (
              <div className="flex items-center justify-center">
                Initiating...
              </div>
            ),
            () => (
              <div className="flex items-center justify-center">Loading...</div>
            ),
            (_err) => (
              <div className="flex items-center justify-center">
                Sorry, there was an error fetching the groceries.
              </div>
            ),
            (data) => {
              const groceries = Object.values(data);

              const items = groceries.map((grocery) => {
                return pipe(
                  grocery,
                  RD.toOption,
                  O.fold(
                    () => (
                      <div>There was an error fetching the grocery item</div>
                    ),
                    (g) => {
                      const isItemAdded = pipe(
                        R.lookup(g.id.toString(), animateButtons),
                        O.exists((a) => a === "added")
                      );
                      return (
                        <div
                          key={g.id}
                          className="space-y-4 border-2 border-black rounded-t-md"
                        >
                          <img
                            loading="lazy"
                            src={g.imageUrl}
                            className="img"
                            alt={g.name}
                          />
                          <div className="flex justify-between p-2">
                            <div className="flex flex-col">
                              <span className="text-xs text-gray-400 uppercase">
                                Item Name
                              </span>
                              <span className="capitalize">{g.name}</span>{" "}
                            </div>
                            <div className="flex flex-col">
                              <span className="text-xs text-gray-400 uppercase">
                                Price
                              </span>
                              <span>
                                ${g.price} / {g.size}
                              </span>
                            </div>
                          </div>
                          <button
                            type="button"
                            className="w-full py-2 text-center transition-colors duration-500 ease-in-out border-t-2 border-black hover:bg-black hover:text-white"
                            onClick={() => {
                              addToCart(g);
                              animateButton(g.id.toString());
                            }}
                          >
                            Add{isItemAdded ? "ed" : ""} to Cart
                            {isItemAdded ? "!" : ""}
                          </button>
                        </div>
                      );
                    }
                  )
                );
              });

              return (
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                  {items}
                </div>
              );
            }
          )
        )}
      </div>
    </div>
  );
}

export default App;
