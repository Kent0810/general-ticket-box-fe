import axiosClient from "./axiosClient";

const ticketApi = {
  getAllTickets: (currentPage: string | null) => {
    const url = "/api/tickets";
    return axiosClient.get(url, {params: currentPage ? currentPage: '1'});
  },
  postTicket: (data: any) => {
    const url = "/api/tickets";
    return axiosClient.post(url, data);
  },
  deleteTicket: (id: any) => { 
    const url = "/api/tickets";
    return axiosClient.delete(url, id);
  }
};

export default ticketApi;
