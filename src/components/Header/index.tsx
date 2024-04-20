import React, { useEffect, useRef, useState } from "react";
import HeaderMainView from "./HeaderMainView";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { authSelector } from "app/selectors";
import Events from "utils/helpers/Events";
import { getMyInfo, logout } from "pages/auth/authSlice";
import { eventKey } from "configuration/eventKey";
import { PageUrl } from "configuration/enum";
import PermContactCalendarIcon from "@mui/icons-material/PermContactCalendar";
import BadgeIcon from "@mui/icons-material/Badge";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const auth = useAppSelector(authSelector);
  const accountDropdownRef = useRef<any>(null);
  const [accountDropdownDataState, setAccountDropdownDataState] =
    useState("closed");
  const { user } = auth;

  const openAccountDropdown = () => setAccountDropdownDataState("open");
  const closeAccountDropdown = () => {
    setAccountDropdownDataState("closing");

    accountDropdownRef.current?.addEventListener(
      "animationend",
      () => setAccountDropdownDataState("closed"),
      {
        once: true,
      }
    );
  };

  const toggleDropdown = () => {
    if (accountDropdownDataState === "closed") {
      openAccountDropdown();
    } else {
      closeAccountDropdown();
    }
  };

  const accountDropdownData = [
    {
      label: "Personal Information",
      icon: <PermContactCalendarIcon />,
      path: PageUrl.ACCOUNT,
    },
    {
      label: "My Account",
      icon: <BadgeIcon />,
      path: PageUrl.ACCOUNT,
    },
    {
      label: "Log out",
      icon: <LogoutIcon />,
      path: "logout",
    },
  ];

  const navigateTo = async (path: string) => {
    if (path === "logout") {
      await dispatch(logout());
    } else navigate(path);
  };

  useEffect(() => {
    const getMyInfoEvent = Events.addListener(
      eventKey.GET_MY_INFO,
      async () => {
        await dispatch(getMyInfo());
      }
    );

    Events.emit(eventKey.GET_MY_INFO);

    return () => getMyInfoEvent.remove();
  }, []);

  return (
    <HeaderMainView
      user={user}
      accountDropdownData={accountDropdownData}
      accountDropdownDataState={accountDropdownDataState}
      accountDropdownRef={accountDropdownRef}
      closeAccountDropdown={closeAccountDropdown}
      navigateTo={navigateTo}
      toggleDropdown={toggleDropdown}
    />
  );
};

export default Header;
