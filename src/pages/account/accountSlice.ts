import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import bookingApi from "api/bookingApi";

const initialState: { data: any[] } = {
  data: [],
};

export const getBookingHistory = createAsyncThunk(
  "account/getBookingHistory",
  async () => {
    const res = await bookingApi.getAllBookings();
    return res;
  }
);

const account = createSlice({
  name: "account",
  initialState,
  reducers: {},
  extraReducers: (builders) => {
    builders.addCase(
      getBookingHistory.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.data = action.payload.data;
      }
    );
  },
});

const { reducer } = account;
export default reducer;
