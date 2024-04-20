import { RootState } from "./store";

export const authSelector = (state: RootState) => state.auth;

export const globalSelector = (state: RootState) => state.global;

export const homeSelector = (state: RootState) => state.home;

export const cartSelector = (state: RootState) => state.cart;

export const accountSelector = (state: RootState) => state.account;
