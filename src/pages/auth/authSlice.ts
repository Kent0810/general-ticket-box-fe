import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import authApi from "api/authApi";
import usersApi from "api/usersApi";
import { AxiosError } from "axios";
import Config from "configuration";
import { IFormLogin, ILoginState } from "pages/interface";

const initialState = (): ILoginState => {
  const auth = sessionStorage.getItem(Config.storageKey.auth);
  if (auth) {
    return { ...JSON.parse(auth) };
  }

  return {
    user: "",
  };
};

export const signupUser = createAsyncThunk(
  "user/signup",
  async (data: IFormLogin) => {
    const res = await usersApi.signup(data);
    return res;
  }
);

export const authenticate = createAsyncThunk(
  "auth/login",
  async (data: IFormLogin) => {
    const res = await authApi.login(data);
    return res;
  }
);

export const logout = createAsyncThunk("auth/logout", async () => {
  const res = await authApi.logout();
  return res;
});

export const getMyInfo = createAsyncThunk(
  "auth/getMyInfo",
  async (_, { rejectWithValue }) => {
    try {
      const res = await authApi.getMyInfo();
      return res;
    } catch (err: any) {
      if (err instanceof AxiosError) {
        if (!err.response) {
          throw err;
        }

        rejectWithValue(err.response.data);
      }
    }
  }
);

const auth = createSlice({
  name: "auth",
  initialState: initialState(),
  reducers: {
    saveAccessToken: (state, action) => {
      state.token = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(authenticate.fulfilled, (state, action: PayloadAction<any>) => {
        const { token } = action.payload;
        state.token = token;
        sessionStorage.setItem(Config.storageKey.auth, JSON.stringify(state));
      })
      .addCase(logout.fulfilled, () => {
        sessionStorage.removeItem(Config.storageKey.auth);
        window.location.reload();
      })
      .addCase(getMyInfo.fulfilled, (state, action: PayloadAction<any>) => {
        state.user = action.payload.data;
        sessionStorage.setItem(Config.storageKey.auth, JSON.stringify(state));
      })
      .addCase(signupUser.fulfilled, (state, action: PayloadAction<any>) => {
        const { token } = action.payload;
        state.token = token;
        sessionStorage.setItem(Config.storageKey.auth, JSON.stringify(state));
      });
  },
});

const { reducer, actions } = auth;
export const { saveAccessToken } = actions;
export default reducer;
