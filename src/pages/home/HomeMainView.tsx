import { useState } from "react";
import CButton from "components/CButton";
import CSelect from "components/CSelect";
import WrapperContainer from "components/WrapperContainer";
import { useForm, Controller } from "react-hook-form";
import { Autoplay, Pagination as SwiperPagination, EffectFade } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { SelectDataType } from "utils/base/model";
import SearchIcon from "@mui/icons-material/Search";
import GroupInput, { GroupInputProps } from "components/GroupInput/GroupInput";
import { FormControl } from "@mui/material";
import CCardList from "components/CCardList";
import SendIcon from '@mui/icons-material/Send';
import MovieIcon from '@mui/icons-material/Movie';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import MusicVideoIcon from '@mui/icons-material/MusicVideo';
import StadiumIcon from '@mui/icons-material/Stadium';
import SmartphoneIcon from '@mui/icons-material/Smartphone';
import { searchTicketType } from "utils/base/model";
import Pagination from '@mui/material/Pagination';
import { useSearchParams } from "react-router-dom";
import TicketModal from "./modal";
import {
  handleFormOpenChange,
  handleFormTypeChange,
  handleLoading,
} from "app/globalSlice";

import { authSelector } from "app/selectors";
import { useAppDispatch, useAppSelector } from "app/hooks";



interface Props {
  bannerList: string[];
  ticketType: SelectDataType[];
  genreSearchValue: number;
  ticketTypeSearchValue: number;
  searchTicket: (data: searchTicketType) => Promise<void>;
  setGenreSearchValue: (data: number) => void;
  setTicketTypeSearchValue: (data: number) => void;
  ticketListData: any[];
  handleSelectedTicket: (id: string) => void;
  handleTicketContinue: (id: string) => Promise<void>;
}

const HomeMainView = (props: Props) => {
  const {
    bannerList,
    ticketType,
    genreSearchValue,
    ticketTypeSearchValue,
    ticketListData,
    searchTicket,
    setGenreSearchValue,
    setTicketTypeSearchValue,
    handleSelectedTicket,
    handleTicketContinue,
  } = props;
  const defaultValues: any = {
    genre: "",
    name: "",
    location: "",
    startDate: "",
    endDate: "",
  };
  const dispatch = useAppDispatch();

  const auth = useAppSelector(authSelector);

  const { user } = auth;

  const { control, handleSubmit } = useForm({ defaultValues });

  const [open, setOpen] = useState(false);
  const handleOpen = async () => {
    if (user === "") {
      dispatch(handleFormOpenChange(true));
      dispatch(handleFormTypeChange("signin"));
    } else {
      setOpen(true)
    }
  };
  const handleClose = () => setOpen(false);

  const [, setSearchParams] = useSearchParams();
  const [page, setPage] = useState(1);

  const params = new URLSearchParams(document.location.search);

  const navigationChangeHandler = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value)
    setSearchParams(()=> {
      params.set("page", value.toString()) 
      return params
    })
  }

  const filterTicket: GroupInputProps[] = [
    {
      label: "Name",
      type: "text",
      groupInputData: [{ name: "name", placeholder: "Name" }],
      control,
    },
    {
      label: "Location",
      type: "text",
      groupInputData: [{ name: "location", placeholder: "Location" }],
      control,
    },
    {
      label: "Expiration Date",
      type: "date",
      groupInputData: [
        { name: "startDate", placeholder: "From Date" },
        { name: "endDate", placeholder: "To Date" },
      ],
      control,
    },
  ];
  return (
    <div className='home'>
      <div className='home-banner'>
        <TicketModal open={open} handleClose={handleClose} setOpen={setOpen}></TicketModal>
        <Swiper
          spaceBetween={30}
          effect={"fade"}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          modules={[SwiperPagination, Autoplay, EffectFade]}
        >
          {bannerList.map((value, idx) => (
            <SwiperSlide key={idx}>
              <img src={value} style={{objectFit: "cover"}} alt='' />
            </SwiperSlide>
          ))}
        </Swiper>
        <div className='home-banner__content'>
          <p>ENTERTAINMENT MAGIC UNLEASHED: TICKET THRILLS, SAVINGS SPREE!</p>
          <h1>UNLOCK THE WONDER OF ENTERTAINMENT: VOUCH YOUR TICKET BLISS!</h1>
          <div style={{display: 'flex', justifyContent: 'center'}}>
          <CButton
            type="submit"
            sx={{ height: "48px", marginTop: 5}}
            className='d-flex align-items-center gap-1'
            onClick={handleOpen}
          >
            <SendIcon />
              Sell Your Ticket Now !
          </CButton>
        </div>
        </div>

        

        <div className='home-banner__search'>
          <div className='search-wrapper'>
            <form
              action='#'
              noValidate
              onSubmit={handleSubmit(searchTicket)}
            >
              <div className='d-flex align-items-center gap-3 mb-4'>
              <FormControl className='select-form-control'>
                  <Controller
                    name="type"
                    control={control}
                    render={({ field }) => (
                      <CSelect {...field} options={
                        [
                          {
                            id: 1,
                            value: "Movie"
                          },
                          {
                            id: 2,
                            value: "Concert"
                          },
                          {
                            id: 3,
                            value: "Fan Meet"
                          }
                        ]
                      } 
                      setSearchValue={setTicketTypeSearchValue}
                      value={ticketTypeSearchValue}/>
                    )}
                  />
                </FormControl>

                {ticketTypeSearchValue === 1 && <FormControl className='select-form-control'>
                  <Controller
                    name="genre"
                    control={control}
                    render={({ field }) => (
                      <CSelect {...field} setSearchValue={setGenreSearchValue} options={ticketType} value={genreSearchValue}/>
                    )}
                  />
                </FormControl>}
              </div>

              <div
                className='d-flex align-items-center gap-3'
                style={{ height: "48px" }}
              >
                {filterTicket.map((data, idx) => (
                  <GroupInput key={idx} {...data} />
                ))}
                <CButton
                  type="submit"
                  sx={{ height: "48px" }}
                  className='d-flex align-items-center gap-1'
                >
                  <SearchIcon />
                  Search
                </CButton>
              </div>
            </form>
          </div>
        </div>
      </div>

      <main>
        <section className='home-logos'>
          <WrapperContainer>
            <div className='logo-list'>
              <MovieIcon />
              <FavoriteIcon />
              <ConfirmationNumberIcon />
              <MusicVideoIcon />
              <StadiumIcon />
              <SmartphoneIcon />
            </div>
          </WrapperContainer>
        </section>

        <WrapperContainer>
          <section className='home-flight'>
            <h4 className='mb-4'>Trending Tickets At The Moment</h4>

            <div className='home-flight-list'>
              <CCardList
                ticketListData={ticketListData}
                handleDetailClick={handleSelectedTicket}
                handleBuyClick={handleTicketContinue}
              />
            </div>

            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 40}}>
            <Pagination count={7} page={page} variant="outlined" shape="rounded" onChange={navigationChangeHandler}/>
            </div>
          </section>
        </WrapperContainer>
      </main>
    </div>
  );
};

export default HomeMainView;
