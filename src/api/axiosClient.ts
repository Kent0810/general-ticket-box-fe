import { useEffect, ReactElement, useState } from "react";
import axios, { AxiosError, AxiosResponse, AxiosRequestConfig } from "axios";
import queryString from "query-string";
import Config from "configuration";

interface retryAxiosResponseConfig extends AxiosRequestConfig {
  _retry?: boolean;
}

// Set up default config for http requests here
// Please have a look at here `https://github.com/axios/axios#request- config` for the full list of configs
const axiosClient = axios.create({
  headers: {
    "content-type": "application/json",
  },
  baseURL: Config.apiConfig.endpoint,
  paramsSerializer: (params) => queryString.stringify(params),
});

const AxiosInterceptor = ({
  children,
}: {
  children: ReactElement;
}): ReactElement => {
  const [isSet, setIsSet] = useState<Boolean>(false);

  useEffect(() => {
    const resInterceptor = (response: AxiosResponse) => {
      if (response && response.data) {
        return response.data;
      }
      return response;
    };

    const reqInterceptor = (config: AxiosRequestConfig) => {
      const authJson = sessionStorage.getItem(Config.storageKey.auth);

      if (authJson) {
        const authValue = {
          ...JSON.parse(authJson),
        };
        if (authValue && config.headers) {
          config.headers.Authorization = `Bearer ${authValue.token}`;
        }
      }
      return config as any;
    };

    const errInterceptor = async (error: AxiosError) => {
      const originalRequest = error.config;
      const retryRequest: retryAxiosResponseConfig = {
        ...originalRequest,
      };
      if (error.response?.status === 401) {
        if (!retryRequest._retry) {
          retryRequest._retry = true;

          return axiosClient(retryRequest);
        } else {
          sessionStorage.clear();
        }
      }

      return Promise.reject(error);
    };

    const responseInterceptor = axiosClient.interceptors.response.use(
      resInterceptor,
      errInterceptor
    );
    const requestInterceptor = axiosClient.interceptors.request.use(
      reqInterceptor,
      errInterceptor
    );
    setIsSet(true);

    return () => {
      axiosClient.interceptors.response.eject(responseInterceptor);
      axiosClient.interceptors.request.eject(requestInterceptor);
    };
  }, []);

  return isSet && children;
};

export { AxiosInterceptor };
export default axiosClient;
