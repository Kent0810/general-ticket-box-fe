import React from "react";
import { PageUrl } from "configuration/enum";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import { ToastContainer } from "react-toastify";
import Header from "components/Header";
import Footer from "components/Footer";
import Home from "pages/home";
import AuthForm from "pages/auth/AuthForm";
import Cart from "pages/cart";
import ScrollToTop from "utils/helpers/ScrollToTop";
import Account from "pages/account";

const Routers = () => {
  return (
    <Router>
      <ScrollToTop />
      <ToastContainer theme="colored" />
      <AuthForm />
      <Header />
      <Routes>
        <Route element={<PrivateRoute />}>
          <Route path={PageUrl.CHECKOUT} element={<Cart />} />
          <Route path={PageUrl.ACCOUNT} element={<Account />} />
        </Route>
        <Route path={PageUrl.HOME} element={<Home />} />
        <Route
          path={PageUrl.ALL}
          element={<Navigate to={PageUrl.HOME} replace={true} />}
        />
      </Routes>
      <Footer />
    </Router>
  );
};

export default Routers;
