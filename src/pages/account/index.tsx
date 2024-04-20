import { useAppDispatch, useAppSelector } from "app/hooks";
import { accountSelector } from "app/selectors";
import React, { useEffect, useMemo } from "react";
import { getBookingHistory } from "./accountSlice";
import { handleLoading } from "app/globalSlice";
import TheatersIcon from '@mui/icons-material/Theaters';
import { ITableHeadCell } from "pages/interface";
import CTable from "components/CTable";
import WrapperContainer from "components/WrapperContainer";
import moment from "moment";
import { formatPrice } from "utils/helpers/formatPrice";

const Account = () => {
  const dispatch = useAppDispatch();
  const account = useAppSelector(accountSelector);
  const { data } = account;

  useEffect(() => {
    dispatch(handleLoading(true));
    try {
      const fetchData = async () => {
        await dispatch(getBookingHistory());
        dispatch(handleLoading(false));
      };

      fetchData();
    } catch (error) {
      dispatch(handleLoading(false));
    }
  }, []);

  const bookingHistoryHeadCells: ITableHeadCell[] = [
    {
      id: "order",
      label: "Order",
      align: "left",
      padding: "normal",
    },
    {
      id: "start_time",
      label: "Order At",
      align: "left",
      padding: "normal",
    },
    {
      id: "userName",
      label: "Customer's Name",
      align: "left",
      padding: "normal",
    },
    {
      id: "location",
      label: "Location",
      align: "left",
      padding: "normal",
    },
    {
      id: "tickets",
      label: "Tickets",
      align: "left",
      padding: "normal",
    },
    {
      id: "seat",
      label: "Seat",
      align: "left",
      padding: "normal",
    },
    {
      id: "paymentStatus",
      label: "Payment Status",
      align: "left",
      padding: "normal",
    },
    {
      id: "price",
      label: "Price",
      align: "left",
      padding: "normal",
    },
  ];
  const bookingHistoryData = useMemo(() => {
    const bookingData = data.map((value, idx) => {
      const { firstname, lastname, items, created_at } = value;
      const { location, original_title, price, seat, paymentMethod } = items;

      return {
        order: idx + 1,
        date: moment(new Date(created_at)).format("DD/MM/YYYY HH:mm"),
        passenger: firstname + " " + lastname,
        location: location,
        ticket: original_title,
        seat,
        paymentMethod: "Paid",
        price: `$${formatPrice(price)}`,
      };
    });

    return bookingData;
  }, [data]);

  return (
    <div className="account">
      <WrapperContainer>
        <h1>
          <TheatersIcon />
          Your Ticket
        </h1>

        <CTable data={bookingHistoryData} headCells={bookingHistoryHeadCells} />
      </WrapperContainer>
    </div>
  );
};

export default Account;
