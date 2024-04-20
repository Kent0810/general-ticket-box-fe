import React, { MutableRefObject } from "react";
import { Logo } from "assets";
import Avatar from "@mui/material/Avatar";
import Chip from "@mui/material/Chip";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PersonIcon from "@mui/icons-material/Person";
import CButton from "components/CButton";
import WrapperContainer from "components/WrapperContainer";
import { useAppDispatch } from "app/hooks";
import { handleFormOpenChange, handleFormTypeChange } from "app/globalSlice";
import CustomDropdown from "components/CustomDropdown/CustomDropdown";
import { useNavigate } from "react-router-dom";
import { PageUrl } from "configuration/enum";

interface Props {
  user?: string;
  closeAccountDropdown: () => void;
  toggleDropdown: () => void;
  accountDropdownDataState: string;
  accountDropdownRef: MutableRefObject<any>;
  accountDropdownData: any;
  navigateTo: (path: string) => Promise<void>;
}

const HeaderMainView = (props: Props) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {
    user,
    accountDropdownData,
    accountDropdownDataState,
    accountDropdownRef,
    closeAccountDropdown,
    navigateTo,
    toggleDropdown,
  } = props;

  const handleOpenAuthForm = (type = "signin") => {
    dispatch(handleFormOpenChange(true));
    dispatch(handleFormTypeChange(type));
  };

  return (
    <header>
      <WrapperContainer>
        <div className='header'>
          <div className='header-logo' onClick={() => navigate('/')}>
            <img
              src={Logo}
              alt='movie booking logo'
              width={150}
              height={150}
            />
          </div>

          <div className='header-account'>
            {user ? (
              <div className='header-account__wrapper' onClick={toggleDropdown}>
                <Chip
                  avatar={
                    <Avatar alt={user}>
                      <PersonIcon />
                    </Avatar>
                  }
                  className='header-account--avatar'
                  label={user}
                  variant='outlined'
                />

                <CustomDropdown
                  closeDropdown={closeAccountDropdown}
                  dropdownState={accountDropdownDataState}
                  ref={accountDropdownRef}
                  className='account-dropdown'
                >
                  {accountDropdownData.map((data: any) => (
                    <div
                      className='account-dropdown__item'
                      key={data.label}
                      onClick={() => navigateTo(data.path)}
                    >
                      {data.icon}
                      <span>{data.label}</span>
                    </div>
                  ))}
                </CustomDropdown>
              </div>
            ) : (
              <>
                <CButton
                  variant='text'
                  onClick={() => handleOpenAuthForm("signin")}
                >
                  Login
                </CButton>
                <CButton
                  variant='outlined'
                  onClick={() => handleOpenAuthForm("signup")}
                >
                  Sign up
                </CButton>
              </>
            )}
          </div>
        </div>
      </WrapperContainer>
    </header>
  );
};

export default HeaderMainView;
