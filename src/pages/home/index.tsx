import { useEffect, useMemo, useState } from "react";
import HomeMainView from "./HomeMainView";
import {
  Banner1,
  Banner2,
  Banner3,
  Banner4,
  Banner5,
} from "assets";
import { SelectDataType } from "utils/base/model";
import { ILogo, ITicketData } from "pages/interface";
import TicketDetail from "./TicketDetail";
import { useNavigate } from "react-router-dom";
import { PageUrl } from "configuration/enum";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { getAllVouchers } from "./homeSlice";
import { authSelector, homeSelector } from "app/selectors";
import {
  handleFormOpenChange,
  handleFormTypeChange,
  handleLoading,
} from "app/globalSlice";
import { useSearchParams } from "react-router-dom";
import { addItemToCart, handleSaveTicketData } from "pages/cart/cartSlice";
import { searchTicketType } from "utils/base/model";
import { getGenreFromGenreId, getGenreIdFromGenreName } from "utils/helpers/getGenreFromGenreId";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const home = useAppSelector(homeSelector);
  const auth = useAppSelector(authSelector);
  const { ticketList } = home;
  const { user } = auth;
  const homeBanners: string[] = [Banner1, Banner2, Banner3, Banner5];
  const [ticketTypeSearchValue, setTicketTypeSearchValue] = useState<number>(1)
  const [genreSearchValue, setGenreSearchValue] = useState<number>(0)
  const filterData = (data:any[], filters: searchTicketType) => {
  let filteredData = data;

  if(getGenreFromGenreId(ticketTypeSearchValue)?.toLowerCase() === "movie"){
    if (filters.genre) {
      const genreId = getGenreIdFromGenreName(filters.genre);
      filteredData = filteredData.filter((item) => item.genre_ids.includes(genreId));
    }
  
    if (filters.name) {
      const nameFilter = filters.name.toLowerCase();
      filteredData = filteredData.filter((item) => item.title.toLowerCase().includes(nameFilter));
    }
  
    if (filters.location) {
      const locationFilter = filters.location.toLowerCase();
      filteredData = filteredData.filter((item) => item.location.toLowerCase().includes(locationFilter));
    }
  }
  else {
    const ticketTypeFilter = getGenreFromGenreId(ticketTypeSearchValue)?.toLowerCase()
    filteredData = filteredData.filter((item)=> item.type.toLowerCase().includes(ticketTypeFilter) )
  }
  return filteredData;
};


  const ticketType: SelectDataType[] = [
    {
      "id":0,
      "value": "All",
    },
    {
      "id": 28,
      "value": "Action"
    },
    {
      "id": 12,
      "value": "Adventure"
    },
    {
      "id": 16,
      "value": "Animation"
    },
    {
      "id": 35,
      "value": "Comedy"
    },
    {
      "id": 80,
      "value": "Crime"
    },
    {
      "id": 99,
      "value": "Documentary"
    },
    {
      "id": 18,
      "value": "Drama"
    },
    {
      "id": 10751,
      "value": "Family"
    },
    {
      "id": 14,
      "value": "Fantasy"
    },
    {
      "id": 36,
      "value": "History"
    },
    {
      "id": 27,
      "value": "Horror"
    },
    {
      "id": 10402,
      "value": "Music"
    },
    {
      "id": 9648,
      "value": "Mystery"
    },
    {
      "id": 10749,
      "value": "Romance"
    },
    {
      "id": 878,
      "value": "Science Fiction"
    },
    {
      "id": 10770,
      "value": "TV Movie"
    },
    {
      "id": 53,
      "value": "Thriller"
    },
    {
      "id": 10752,
      "value": "War"
    },
    {
      "id": 37,
      "value": "Western"
    }
  ];

  const [filteredTicketList, setFilteredTicketList] = useState<ITicketData[]>([])

  useEffect(() => {
      setFilteredTicketList(ticketList);
  }, [ticketList]);

  const searchTicket = async (data: searchTicketType) => {
    data.genre = getGenreFromGenreId(genreSearchValue) as string
    setFilteredTicketList(filterData(ticketList, data))
  };

  // Ticket detail
  const [selectedTicket, setSelectedTicket] = useState<string>("");

  const handleSelectedTicket = (id: string) => {
    setSelectedTicket(id);
  };
  const handleCloseVoucher = () => setSelectedTicket("");
  const handleContinue = async (id: string) => {
    if (user === "") {
      dispatch(handleFormOpenChange(true));
      dispatch(handleFormTypeChange("signin"));
    } else {
      dispatch(handleLoading(true));
      const res: any = await dispatch(addItemToCart(id)).unwrap();
      const { success, data } = res;
      if (success) {
        dispatch(handleSaveTicketData(data));
      }
      dispatch(handleLoading(false));
      navigate(PageUrl.CHECKOUT);
    }
  };  

  const selectedTicketData = useMemo(() => {
    return ticketList.find((ticket) => ticket.id === selectedTicket);
  }, [selectedTicket, ticketList]);

  const [searchParams] = useSearchParams();

  const currentPage = searchParams.get('page')


  useEffect(() => {
    const fetchData = async () => {
      await dispatch(getAllVouchers(currentPage));
    };

    fetchData();
  }, [dispatch, currentPage]);

  return (
    <>
      <HomeMainView
        genreSearchValue={genreSearchValue}
        ticketTypeSearchValue={ticketTypeSearchValue}
        setTicketTypeSearchValue={setTicketTypeSearchValue}
        setGenreSearchValue={setGenreSearchValue}
        bannerList={homeBanners}
        ticketType={ticketType}
        searchTicket={searchTicket}
        handleSelectedTicket={handleSelectedTicket}
        ticketListData={filteredTicketList}
        handleTicketContinue={handleContinue}
      />
      {selectedTicketData && (
        <TicketDetail
          data={selectedTicketData}
          handleClose={handleCloseVoucher}
          handleContinue={handleContinue}
          open={selectedTicket !== ""}
        />
      )}
    </>
  );
};

export default Home;
