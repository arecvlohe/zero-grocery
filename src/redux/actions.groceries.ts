import {
  GET_GROCERIES_ERROR,
  GET_GROCERIES_REQUEST,
  GET_GROCERIES_SUCCESS,
  GET_GROCERY_ERROR,
  GET_GROCERY_REQUEST,
  GET_GROCERY_SUCCESS,
} from "./constants.groceries";
import { Grocery } from "../types/types.app";

/**
 * All actions
 */

export type Actions =
  | GetGroceriesRequest
  | GetGroceriesSuccess
  | GetGroceriesError
  | GetGroceryRequest
  | GetGrocerySuccess
  | GetGroceryError;

/**
 * Groceries
 */

export type GetGroceriesRequest = {
  type: typeof GET_GROCERIES_REQUEST;
};

export type GetGroceriesSuccess = {
  type: typeof GET_GROCERIES_SUCCESS;
  payload: Array<Grocery>;
};

export type GetGroceriesError = {
  type: typeof GET_GROCERIES_ERROR;
};

export const getGroceriesRequest = (): GetGroceriesRequest => ({
  type: GET_GROCERIES_REQUEST,
});

export const getGroceriesSuccess = (
  payload: Array<Grocery>
): GetGroceriesSuccess => ({
  type: GET_GROCERIES_SUCCESS,
  payload,
});

export const getGroceriesError = (): GetGroceriesError => ({
  type: GET_GROCERIES_ERROR,
});

/**
 * Grocery
 */

export type GetGroceryRequest = {
  type: typeof GET_GROCERY_REQUEST;
  payload: string;
};

export type GetGrocerySuccess = {
  type: typeof GET_GROCERY_SUCCESS;
  payload: Grocery;
};

export type GetGroceryError = {
  type: typeof GET_GROCERY_ERROR;
  payload: string;
};

export const getGroceryRequest = (payload: string): GetGroceryRequest => ({
  type: GET_GROCERY_REQUEST,
  payload,
});

export const getGrocerySuccess = (payload: Grocery): GetGrocerySuccess => ({
  type: GET_GROCERY_SUCCESS,
  payload,
});

export const getGroceryError = (payload: string): GetGroceryError => ({
  type: GET_GROCERY_ERROR,
  payload,
});
