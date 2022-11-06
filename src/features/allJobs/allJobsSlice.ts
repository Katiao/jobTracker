import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { RootState } from "../../store";
import { customFetch } from "../../utils/axios";
import {
  InitialFiltersState,
  InitialState,
  RequestResponse,
  AllJobsSlice,
} from "./types";

const initialFiltersState: InitialFiltersState = {
  search: "",
  searchStatus: "all",
  searchType: "all",
  sort: "latest",
  sortOptions: ["latest", "oldest", "a-z", "z-a"],
};

const initialState: InitialState = {
  isLoading: true,
  jobs: [],
  totalJobs: 0,
  numOfPages: 1,
  page: 1,
  stats: {},
  monthlyApplications: [],
  ...initialFiltersState,
};

export const getAllJobs = createAsyncThunk<
  RequestResponse,
  undefined,
  { state: RootState }
>("allJobs/getJobs", async (_, thunkAPI) => {
  let url = `/jobs`;

  try {
    const resp = await customFetch.get(url);

    return resp.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
});

const allJobsSlice: AllJobsSlice = createSlice({
  name: "allJobs",
  initialState,
  reducers: {
    showLoading: (state) => {
      state.isLoading = true;
    },
    hideLoading: (state) => {
      state.isLoading = false;
    },
  },
  extraReducers: (builder) => {
    return (
      builder.addCase(getAllJobs.pending, (state) => {
        state.isLoading = true;
      }),
      builder.addCase(getAllJobs.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.jobs = payload.jobs;
      }),
      builder.addCase(getAllJobs.rejected, (state, payload) => {
        state.isLoading = false;
        //@ts-ignore fix error payload type
        toast.error(payload);
      })
    );
  },
});

export const { showLoading, hideLoading } = allJobsSlice.actions;

export default allJobsSlice.reducer;
