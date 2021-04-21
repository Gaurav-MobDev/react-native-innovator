import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { postApi } from "../../network";
import { URL, slicesNames, apiResponseTypes } from "../../utilities/Constants";

const { login } = slicesNames;
const { login: loginURL } = URL;
const initialState = {
  loginData: {},
  loading: false,
  error: null,
  isError: false,
  loginDetails: {
    email: "",
    passwordLogin: "",
  },
};

export const loginAPI = createAsyncThunk(
  login,
  async ({ data, token }, thunkAPI) => {
    const response = await postApi({
      url: loginURL,
      data,
      token,
    });
    return response;
  }
);

const loginSlice = createSlice({
  name: login,
  initialState,
  reducers: {
    loginSuccess(state, action) {
      const { payload } = action;
      state.loading = false;
    },
    loginFailure(state, action) {
      const { payload } = action;
      state.error = payload;
      state.loading = false;
    },
  },
});

export const { loginSuccess, loginFailure } = loginSlice.actions;
export default loginSlice.reducer;
