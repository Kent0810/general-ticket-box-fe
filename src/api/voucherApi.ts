import axiosClient from "./axiosClient";

const voucherApi = {
  getAllVouchers: () => {
    const url = "/api/voucher";
    return axiosClient.get(url);
  },
};

export default voucherApi;
