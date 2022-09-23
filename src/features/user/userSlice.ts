// @ts-nocheck
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { MODEL__user, MODEL__Member, MODEL__NonMember } from "../../types";
import {
  customFetch,
  getUserFromLocalStorage,
  addUserToLocalStorage,
} from "../../utils";

type InitiaState = {
  isLoading: boolean;
  user: MODEL__user | null;
};

const initialState: InitiaState = {
  isLoading: false,
  user: getUserFromLocalStorage(),
};

export const registerUser = createAsyncThunk(
  "user/registerUser",
  async (user: MODEL__NonMember, thunkAPI) => {
    try {
      //add resp type
      const resp = await customFetch.post("/auth/register", user);
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
);

//consider combining loginUser with register user function
export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (user: MODEL__Member, thunkAPI) => {
    try {
      //add resp type
      const resp = await customFetch.post("/auth/login", user);
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  extraReducers: {
    [registerUser.pending]: (state) => {
      state.isLoading = true;
    },
    [registerUser.fulfilled]: (state, { payload }) => {
      const { user } = payload;
      state.isLoading = false;
      state.user = user;
      addUserToLocalStorage(user);
      toast.success(`Hello There ${user.name}`);
    },
    [registerUser.rejected]: (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload);
    },
    [loginUser.pending]: (state) => {
      state.isLoading = true;
    },
    [loginUser.fulfilled]: (state, { payload }) => {
      const { user } = payload;
      state.isLoading = false;
      state.user = user;
      addUserToLocalStorage(user);
      toast.success(`Welcome back ${user.name}`);
    },
    [loginUser.rejected]: (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload);
    },
  },
});

export default userSlice.reducer;
