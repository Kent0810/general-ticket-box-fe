import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import ticketApi from "api/ticketApi";
import { ITicketData } from "pages/interface";

const initialState: { ticketList: ITicketData[] } = {
  ticketList: [],
};

export const getAllVouchers = createAsyncThunk(
  "home/getAllVouchers",
  async (currentPage: string | null) => {
    const res = await ticketApi.getAllTickets(currentPage);
    return res;
  }
);
export const postTicket = createAsyncThunk(
  "home/postTicket",
  async (data: any) => {
    const res = await ticketApi.postTicket(data);
    return res;
  }
);

export const deleteTicket = createAsyncThunk(
  "home/delete",
  async (id: any) => {
    const res = await ticketApi.postTicket(id);
    return res;
  }
);

const home = createSlice({
  name: "home",
  initialState,
  reducers: {},
  extraReducers: (builders) => {
    builders.addCase(
      getAllVouchers.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.ticketList = action.payload;
      }
    );
  },
});

const { reducer } = home;
export default reducer;
