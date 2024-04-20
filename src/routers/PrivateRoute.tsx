import React from "react";
import { PageUrl } from "configuration/enum";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAppSelector } from "app/hooks";
import { authSelector } from "app/selectors";
import jwtDecode from "jwt-decode";

const PrivateRoute = () => {
  const location = useLocation();
  const auth = useAppSelector(authSelector);
  const { token } = auth;

  return token && jwtDecode(token) ? (
    <Outlet />
  ) : (
    <Navigate to={PageUrl.HOME} state={{ from: location }} replace />
  );
};

export default PrivateRoute;
