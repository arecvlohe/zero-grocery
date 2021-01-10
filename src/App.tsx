import React from "react";
import * as RD from "@devexperts/remote-data-ts";
import * as O from "fp-ts/lib/Option";
import { pipe } from "fp-ts/lib/pipeable";

import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { getGroceriesRequest } from "./redux/actions.groceries";
import { groceriesSelector } from "./redux/selectors.groceries";
import { Grocery } from "./redux/types.appState";
import { addGroceryItem } from "./redux/actions.cart";
import { cartSelector } from "./redux/selectors.cart";

function App() {
  const dispatch = useDispatch();
  const groceriesRD = useSelector(groceriesSelector);
  const cart = useSelector(cartSelector);

  const addToCart = (grocery: Grocery) => {
    dispatch(addGroceryItem(grocery));
  };

  React.useEffect(() => {
    dispatch(getGroceriesRequest());
  }, [dispatch]);

  return (
    <div>
      {pipe(
        groceriesRD,
        RD.fold(
          () => <div>Initiating...</div>,
          () => <div>Loading...</div>,
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
                  () => <div>There was an error fetching the grocery item</div>,
                  (g) => {
                    return (
                      <div key={g.id}>
                        {g.name}{" "}
                        <button type="button" onClick={() => addToCart(g)}>
                          Add to Cart
                        </button>
                      </div>
                    );
                  }
                )
              );
            });

            return <div>{items}</div>;
          }
        )
      )}
      <div>
        Number of items in cart:{" "}
        {Object.values(cart).reduce((acc, curr) => curr.count + acc, 0)}
      </div>
    </div>
  );
}

export default App;
