import { StyledEngineProvider } from '@mui/material/styles';
import { AxiosInterceptor } from 'api/axiosClient';
import { store } from 'app/store';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import Routers from 'routers';
import '_styles.scss';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <StyledEngineProvider injectFirst>
    <Provider store={store}>
      <AxiosInterceptor>
        <Routers />
      </AxiosInterceptor>
    </Provider>
  </StyledEngineProvider>
);
