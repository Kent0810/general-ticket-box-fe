import axiosClient from "./axiosClient";

const cartApi = {
  addItemToCart: (ticketId: string) => {
    const url = "/api/cart";
    return axiosClient.post(url, ticketId, { params: { ticketId } });
  },
  getCartItems: () => {
    const url = "/api/cart";
    return axiosClient.get(url);
  },
  createPaypalOrder: (data: any) => {
    const url = "/api/cart/paypal/create-order";
    return axiosClient.post(url, data);
  },
  approvePaypalOrder: (data: { orderId: string }) => {
    const url = "/api/cart/paypal/approve-order";
    return axiosClient.post(url, data);
  },
};

export default cartApi;
