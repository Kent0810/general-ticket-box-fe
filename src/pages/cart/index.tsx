import React, { useState } from "react";
import CartMainView from "./CartMainView";
import {
  ILabelValue,
  ICustomerInput,
  IPaymentMethod,
  IVoucher,
  ITicketData,
} from "pages/interface";
import LocalAtmIcon from "@mui/icons-material/LocalAtm";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import { Paypal } from "assets";
import { useAppSelector } from "app/hooks";
import { cartSelector } from "app/selectors";

const Cart = () => {
  const cart = useAppSelector(cartSelector);
  const ticketData = cart.ticketData as ITicketData;
  const customerInputs: ICustomerInput[] = [
    {
      name: "firstname",
      required: true,
      label: "First name",
    },
    {
      name: "lastname",
      required: true,
      label: "Last name",
    },
    {
      name: "email",
      required: true,
      label: "Email",
    },
    {
      name: "phone",
      required: true,
      label: "Phone number",
    },
    {
      name: "address",
      required: true,
      label: "Address",
    },
    {
      name: "discount_code",
      required: false,
      label: "Discount Code"
    }
  ];
  const [paymentMethod, setPaymentMethod] = useState<number>(0);
  const handleSelectPaymentMethod = (value: number) => setPaymentMethod(value);

  const paymentMethodData: IPaymentMethod[] = [
    { icon: <LocalAtmIcon />, name: "Cash" },
    { icon: <AccountBalanceIcon />, name: "Internet Banking" },
    { icon: <CreditCardIcon />, name: "Credit / Debit card" },
    { icon: <Paypal />, name: "Paypal" },
  ];
  const [discount, setDiscount] = useState<string>("")


  const billData: ILabelValue[] = [
    { label: "Tickets' price", value: ticketData.price },
    { label: "Platform fee", value: 1.99 },
    { label: "Discount", value: discount === "08102002" ? 10 : 0 },
    { label: "Total", value:  ticketData.price  - (discount === "08102002" ? 10 : 0)  + 1.99 },
  ];

  return (
    <CartMainView
      setDiscount={setDiscount}
      customerInputs={customerInputs}
      paymentMethod={paymentMethod}
      handleSelectPaymentMethod={handleSelectPaymentMethod}
      paymentMethodData={paymentMethodData}
      billData={billData}
      ticketData={ticketData}
    />
  );
};

export default Cart;
