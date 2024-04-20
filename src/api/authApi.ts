import { IFormLogin } from "pages/interface";
import axiosClient from "./axiosClient";

const authApi = {
  login: (data: IFormLogin) => {
    const url = "/api/auth/token";
    return axiosClient.post(url, data);
  },
  logout: () => {
    const url = "/api/auth/logout";
    return axiosClient.post(url);
  },
  getMyInfo: () => {
    const url = "/api/auth/getMyInfo";
    return axiosClient.get(url);
  },
};

export default authApi;
