import React from "react";
import * as RD from "@devexperts/remote-data-ts";
import * as O from "fp-ts/lib/Option";
import * as R from "fp-ts/lib/Record";
import { pipe } from "fp-ts/lib/pipeable";

import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { getGroceriesRequest } from "./redux/actions.groceries";
import { groceriesSelector } from "./redux/selectors.groceries";
import { CartItem, Grocery } from "./redux/types.appState";
import { addGroceryItem } from "./redux/actions.cart";
import { cartSelector } from "./redux/selectors.cart";

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
      <div className="text-lg border-b-2 border-gray-100 pb-2">
        Shopping Cart
      </div>
      <div className="space-y-4">
        {cart.map((item) => {
          return (
            <div className="grid grid-cols-3 pb-4 items-center border-b-2 border-gray-100 last:border-0">
              <img src={item.data.imageUrl} className="img-sm rounded-md" />
              <div className="capitalize">{item.data.name}</div>
              <div>
                ${item.data.price} / {item.data.size} x {item.count}
              </div>
            </div>
          );
        })}
        <div className="flex justify-between">
          <div>Total </div>
          <div>
            $
            {cart
              .reduce((acc, curr) => {
                return curr.count * JSON.parse(curr.data.price) + acc;
              }, 0)
              .toFixed(2)}
          </div>
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

    setTimeout(() => {
      setAnimateButtons({ [id]: "initial" });
    }, 2000);
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
              className="bg-black text-white text-xs rounded-full p-1 absolute"
              style={{ top: -12, left: 54 }}
            >
              {Object.values(cart).reduce((acc, curr) => curr.count + acc, 0)}
            </span>
          </button>
          <Modal state={modalState} cart={cartItems} />
        </span>
      </header>
      <div className="max-w-screen-lg my-0 mx-auto py-8 px-8">
        {pipe(
          groceriesRD,
          RD.fold(
            () => <div>Initiating...</div>,
            () => (
              <div className="flex align-center justify-center">Loading...</div>
            ),
            (_err) => (
              <div>Sorry, there was an error fetching the resources.</div>
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
                          />
                          <div className="p-2 flex justify-between">
                            <div className="flex flex-col">
                              <span className="uppercase text-gray-400 text-xs">
                                Item Name
                              </span>
                              <span className="capitalize">{g.name}</span>{" "}
                            </div>
                            <div className="flex flex-col">
                              <span className="uppercase text-gray-400 text-xs">
                                Price
                              </span>
                              <span>
                                ${g.price} / {g.size}
                              </span>
                            </div>
                          </div>
                          <button
                            type="button"
                            className="border-t-2 border-black text-center w-full py-2 transition-colors duration-500 ease-in-out hover:bg-black hover:text-white"
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
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
