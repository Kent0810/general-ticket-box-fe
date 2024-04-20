import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initGlobal = () => {
  return {
    isLoading: false,
    isShowModalBackdrop: false,
    isShowSidebar: false,
    authFormState: {
      open: false,
      type: "signin",
    },
  };
};

const global = createSlice({
  name: "global",
  initialState: initGlobal(),
  reducers: {
    handleBackdrop: (state, action: PayloadAction<boolean>) => {
      return {
        ...state,
        isShowModalBackdrop: action.payload,
      };
    },
    handleSidebar: (state, action: PayloadAction<boolean>) => {
      return {
        ...state,
        isShowSidebar: action.payload,
      };
    },
    handleLoading: (state, action: PayloadAction<boolean>) => {
      return {
        ...state,
        isLoading: action.payload,
      };
    },
    handleFormTypeChange: (state, action) => {
      state.authFormState.type = action.payload;
    },
    handleFormOpenChange: (state, action) => {
      state.authFormState.open = action.payload;
    },
  },
});

const { reducer, actions } = global;
export const {
  handleBackdrop,
  handleLoading,
  handleSidebar,
  handleFormOpenChange,
  handleFormTypeChange,
} = actions;
export default reducer;
