import { IBookingData } from "pages/interface";
import axiosClient from "./axiosClient";

const bookingApi = {
  addBooking: (data: IBookingData) => {
    const url = "/api/booking";
    return axiosClient.post(url, data);
  },
  getAllBookings: () => {
    const url = "/api/booking";
    return axiosClient.get(url);
  },
};

export default bookingApi;
