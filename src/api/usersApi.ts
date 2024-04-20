import { IFormLogin } from "pages/interface";
import axiosClient from "./axiosClient";

const usersApi = {
  signup: (data: IFormLogin) => {
    const url = "/api/users";
    return axiosClient.post(url, data);
  },
};

export default usersApi;
