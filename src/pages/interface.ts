import { ReactNode } from "react";
import { Moment } from "moment";

type alignPadding = "left" | "right" | "center";
type cellPadding = "checkbox" | "none" | "normal";

export interface IFormLogin {
  email: string;
  password: string;
}

export interface IFormAuth extends IFormLogin {
  confirmPassword: string;
}

export interface ILoginState {
  user: string;
  token?: string;
}

export interface BaseProps {
  children?: ReactNode;
}

export interface ITicketData {
  id: string;
  original_title: string;
  overview: string
  backdrop_path: string;
  poster_path: string;
  release_date: string;
  location: string;
  genre_ids: number[];
  price: number;
  seat: string;
  type: string;
  rating?: number;
}

export interface ITableHeadCell {
  padding: cellPadding;
  id: string;
  label: string;
  align: alignPadding;
}

export interface ITicket extends ITicketData {
  id: string;
  wifi: boolean;
  meals: number;
  entertainment: boolean;
  airline: number;
  price: number;
}

export interface IVoucher {
  id: string;
  voucherCode: string;
  expirationDate: Moment;
  numberOfProduct: number;
  status: string;
  originalPrice: number;
  salePrice: number;
  category: string;
  brand: string;
  location: string;
  description: string[];
  image: string;
}

export interface IVoucherDisplay extends Omit<IVoucher, "expirationDate"> {
  expirationDate: string;
}

export interface ILogo {
  name: string;
  img: string;
}

export interface IBooking {
  firstname: string;
  lastname: string;
  email: string;
  phone?: string;
  address?: string;
  paymentMethod: number;
  checked_in_luggage: string;
  discount_code?: string
}

export interface IBookingData extends Omit<IBooking, "checked_in_luggage"> {
  ticketId: string;
  title: string;
  price: number;
  seat: string;
  location: string;
}

export interface ICustomerInput {
  name: keyof IBooking;
  label: string;
  required?: boolean;
}

export interface IPaymentMethod {
  icon: ReactNode;
  name: string;
}

export interface ILabelValue {
  label: string;
  value: number;
}
