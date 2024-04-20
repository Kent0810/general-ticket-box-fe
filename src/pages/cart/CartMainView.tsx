import React, { useEffect, useState } from "react";
import WrapperContainer from "components/WrapperContainer";
import CartSection from "./CartSection";
import {
  Controller,
  SubmitErrorHandler,
  SubmitHandler,
  useForm,
  useWatch,
} from "react-hook-form";
import {
  IBooking,
  IBookingData,
  ILabelValue,
  ICustomerInput,
  IPaymentMethod,
  IVoucher,
  ITicketData,
} from "pages/interface";
import { useAppDispatch } from "app/hooks";
import { handleLoading } from "app/globalSlice";
import CInput from "components/CInput";
import {
  FormControl,
  FormGroup,
  InputLabel,
  FormHelperText,
  TextField
} from "@mui/material";
import LuggageIcon from "@mui/icons-material/Luggage";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { useNavigate } from "react-router-dom";
import CButton from "components/CButton";
import { formatPrice } from "utils/helpers/formatPrice";
import { getGenreFromGenreId } from "utils/helpers/getGenreFromGenreId";
import { addBooking, approvePaypalOrder, createPaypalOrder } from "./cartSlice";
import customToast, { ToastType } from "components/CustomToast/customToast";
import { PageUrl } from "configuration/enum";
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import { OnApproveData } from "@paypal/paypal-js";
import AspectRatio from "@mui/joy/AspectRatio";
import Link from "@mui/joy/Link";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import Chip from "@mui/joy/Chip";
import Typography from "@mui/joy/Typography";
import { deleteTicket } from "pages/home/homeSlice";

interface Props {
  customerInputs: ICustomerInput[];
  paymentMethod: number;
  handleSelectPaymentMethod: (value: number) => void;
  paymentMethodData: IPaymentMethod[];
  setDiscount: (discountCode: string) => void;
  billData: ILabelValue[];
  ticketData: ITicketData;
}

const defaultValues: IBooking = {
  email: "",
  firstname: "",
  lastname: "",
  paymentMethod: 0,
  phone: "",
  checked_in_luggage: "no",
  discount_code: ""
};

const CartMainView = (props: Props) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const {
    customerInputs,
    handleSelectPaymentMethod,
    paymentMethod,
    paymentMethodData,
    billData,
    ticketData,
    setDiscount
  } = props;

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    getValues,
  } = useForm<IBooking>({ defaultValues });
  const submitFormHandler: SubmitHandler<IBooking> = async (data) => {
    dispatch(handleLoading(true));
    const { checked_in_luggage, ...restData } = data;


    const bookingData: IBookingData = {
      ...restData,
      location: ticketData.location,
      price: ticketData.price,
      ticketId: ticketData.id,
      seat: ticketData.seat,
      title: ticketData.original_title,
    };

    const res: any = await dispatch(addBooking(bookingData)).unwrap();
    const { success, message } = res;
    if (success) {
      customToast(ToastType.SUCCESS, message);
      navigate(`/${PageUrl.ACCOUNT}`);
    } else {
      customToast(ToastType.ERROR, message);
    }
    dispatch(handleLoading(false));
  };
  const errorFormHandler: SubmitErrorHandler<IBooking> = (_, event) => {
    event?.target.classList.add("wasvalidated");
  };

  const {
    id,
    original_title,
    overview,
    backdrop_path,
    poster_path,
    release_date,
    location,
    genre_ids,
    price,
    seat,
    rating
  } = ticketData;

  const isPaidWithBanking = watch("paymentMethod") === 1;
  const isPaidWithCard = watch("paymentMethod") === 2;
  const isPaidWithPaypal = watch("paymentMethod") === 3;

  const createOrder = async () => {
    try {
      const paypalData = {
        purchase_units: [
          {
            amount: {
              currency_code: "USD",
              value: billData[3].value,
            },
          },
        ],
        intent: "CAPTURE",
      };
      const response: any = await dispatch(
        createPaypalOrder(paypalData)
      ).unwrap();
      return response.id;
    } catch (err) {
      console.error(err);
    }
  };

  const onApprove = async (data: OnApproveData) => {
    try {
      const paypalData: { orderId: string } = {
        orderId: data.orderID,
      };
      const response: any = await dispatch(
        approvePaypalOrder(paypalData)
      ).unwrap();

      if (response && response.status === "COMPLETED") {
        const data = getValues();
        submitFormHandler(data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(()=>{
    const subscription = watch((value) => setDiscount(value.discount_code!));

    return () => subscription.unsubscribe()
  },[watch])

  return (
    <main className='cart'>
      <WrapperContainer>
        <p
          className='d-flex align-items-center gap-2 mb-3'
          style={{ cursor: "pointer" }}
          onClick={() => navigate(-1)}
        >
          <ChevronLeftIcon />
          Back
        </p>
        <form
          action='#'
          noValidate
          method='POST'
          className='row m-0'
          onSubmit={handleSubmit(submitFormHandler, errorFormHandler)}
        >
          <div className='col-9 p-0 pe-3'>
            <div className='cart-detail'>
              <CartSection title='Customer Information' order={1}>
                <div
                  className='row m-0 justify-content-between'
                  style={{ gap: "16px 0" }}
                >
                  {customerInputs.slice(0, -1).map((input) => {
                    const { label, name, required } = input;

                    return (
                      <FormControl key={name} className='passenger-input'>
                        <Controller
                          control={control}
                          name={name}
                          rules={
                            required
                              ? {
                                  required: {
                                    value: true,
                                    message: "This field is required",
                                  },
                                }
                              : {}
                          }
                          render={({ field }) => (
                            <FormGroup className='passenger-group'>
                              <InputLabel htmlFor={name}>
                                <span>
                                  {label} ({required ? "Required" : "Optional"})
                                </span>
                              </InputLabel>
                              <CInput
                                {...field}
                                size='small'
                                id={name}
                                valid={!errors[name]}
                              />
                            </FormGroup>
                          )}
                        />
                        {!!errors[name] && (
                          <FormHelperText className='ms-0' error>
                            {errors[name]?.message}
                          </FormHelperText>
                        )}
                      </FormControl>
                    );
                  })}
                </div>
              </CartSection>

              <CartSection title='Discount' order={2}>
                <div
                  className='row m-0 justify-content-between'
                  style={{ gap: "16px 0" }}
                >
                  <FormControl key={"discount"} className='passenger-input'>
                        <Controller
                          control={control}
                          name={"discount_code"}
                          render={({ field }) => (
                            <FormGroup className='passenger-group'>
                              <InputLabel htmlFor={"discount_code"}>
                                <span>
                                  {"Discount Code"} (Optional)
                                </span>
                              </InputLabel>
                              <CInput
                                {...field}
                                size='small'
                                id="discount"
                              />
                            </FormGroup>
                          )}
                        />                      
                      </FormControl>
                      <span style={{marginTop: -10, color: "gray", marginLeft: -10}}>*Hint, try 08102002</span>
                </div>
              </CartSection>


              <CartSection title='Your Item' order={3}>
                <Card
                  variant='outlined'
                  orientation='horizontal'
                  sx={{
                    width: "500px",
                    "&:hover": {
                      boxShadow: "md",
                      borderColor: "neutral.outlinedHoverBorder",
                    },
                  }}
                >
                  <AspectRatio ratio='0.7' sx={{ width: 90 }}>
                    <img src={poster_path.includes("picsum")? poster_path: `https://image.tmdb.org/t/p/w500/${poster_path}`} loading='lazy' alt='' />
                  </AspectRatio>
                  <CardContent>
                    <Typography level='title-lg' id='card-description'>
                      {original_title}
                    </Typography>
                    <Typography
                      level='body-sm'
                      aria-describedby='card-description'
                      mb={1}
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <Link
                        overlay
                        underline='none'
                        href='#interactive-card'
                        sx={{ color: "text.tertiary" }}
                      >
                        Location: {location}
                      </Link>
                      <Link
                        overlay
                        underline='none'
                        href='#interactive-card'
                        sx={{ color: "text.tertiary" }}
                      >
                        Genre: {genre_ids.map(genre_id=>getGenreFromGenreId(genre_id)).join(', ')}
                      </Link>
                      <Link
                        overlay
                        underline='none'
                        href='#interactive-card'
                        sx={{ color: "text.tertiary" }}
                      >
                        Seat: {seat}
                      </Link>
                    </Typography>
                    <Chip
                      variant='outlined'
                      color="primary"
                      size='sm'
                      sx={{ pointerEvents: "none" }}
                    >
                      The event will start at {release_date}
                    </Chip>
                  </CardContent>
                </Card>
              </CartSection>
              <CartSection title='Payment' order={4}>
                {(isPaidWithBanking || isPaidWithCard) && <TextField
                  label="Bank Account Number"
                  name="paymentInfo"
                  style={{marginTop: 10, marginBottom: 10, width: "100%"}}
                  required
                />}
                {isPaidWithCard && <div style={{display: 'flex'}}>
                  <TextField
                    label="Bank Name"
                    name="bankName"
                    style={{marginTop: 10, marginBottom: 10, width: "100%"}}
                    required
                  />
                  <TextField
                    label="Expiration Date"
                    name="expDate"
                    style={{marginTop: 10, marginBottom: 10, width: "100%"}}
                    required
                  />
                </div>}
                <div className='payment-wrapper'>
                  {paymentMethodData.map((data, idx) => (
                    <div
                      className='payment-method'
                      key={data.name}
                      aria-selected={idx === paymentMethod}
                      onClick={() => {
                        handleSelectPaymentMethod(idx);
                        setValue("paymentMethod", idx);
                      }}
                    >
                      <span>{data.name}</span>
                      {data.icon}
                    </div>
                  ))}
                </div>
              </CartSection>
            </div>
          </div>
          <div className='col p-0'>
            <div className='cart-overview'>
              <section className='cart-bill'>
                <h4>Your Bill</h4>
                <div className='cart-bill__detail mb-3'>
                  {billData.map((data, idx) => (
                    <div className='bill-price' key={data.label}>
                      <span className='bill-price--label'>{data.label}</span>
                      <span
                        className={`bill-price--value ${
                          idx === 3 ? "red-value" : ""
                        }`}
                      >
                        {idx === 2 ? "-" : ""}${formatPrice(data.value)}
                      </span>
                    </div>
                  ))}
                </div>
                {isPaidWithPaypal ? (
                  <PayPalScriptProvider
                    options={{
                      clientId: process.env.REACT_APP_PAYPAL_CLIENT_ID || "",
                    }}
                  >
                    <PayPalButtons
                      createOrder={createOrder}
                      onApprove={onApprove}
                    />
                  </PayPalScriptProvider>
                ) : (
                  <CButton type='submit' className='w-100'>
                    Proceed Payment
                  </CButton>
                )}
              </section>
            </div>
          </div>
        </form>
      </WrapperContainer>
    </main>
  );
};

export default CartMainView;
