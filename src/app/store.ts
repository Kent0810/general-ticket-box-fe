import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import authReducer from "pages/auth/authSlice";
import globalReducer from "app/globalSlice";
import homeReducer from "pages/home/homeSlice";
import cartReducer from "pages/cart/cartSlice";
import accountReducer from "pages/account/accountSlice";

export const store = configureStore({
  reducer: {
    global: globalReducer,
    auth: authReducer,
    home: homeReducer,
    cart: cartReducer,
    account: accountReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
