import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { RootState } from "../../store";
import { customFetch, handleRequestError } from "../../utils/axios";
import { MODEL_Stats } from "../../types";
import {
  InitialFiltersState,
  InitialState,
  AllJobsRequestResponse,
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
  stats: {
    pending: 0,
    interview: 0,
    declined: 0,
  },
  monthlyApplications: [],
  ...initialFiltersState,
};

export const getAllJobs = createAsyncThunk<
  AllJobsRequestResponse,
  undefined,
  { state: RootState }
>("allJobs/getJobs", async (_, thunkAPI) => {
  const { page, search, searchStatus, searchType, sort } =
    thunkAPI.getState().allJobs;

  let url = `/jobs?status=${searchStatus}&jobType=${searchType}&sort=${sort}&page=${page}`;
  if (search) {
    url = url + `&search=${search}`;
  }
  try {
    const resp = await customFetch.get(url);

    return resp.data;
  } catch (error: any) {
    return handleRequestError(error, thunkAPI);
  }
});

export const showStats = createAsyncThunk<
  MODEL_Stats,
  undefined,
  { state: RootState }
>("allJobs/showStats", async (_, thunkAPI) => {
  try {
    const resp = await customFetch.get("/jobs/stats");
    return resp.data;
  } catch (error: any) {
    return handleRequestError(error, thunkAPI);
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
    handleChange: (state, { payload: { name, value } }) => {
      // set page to 1 when state changes in search container to avoid bug of no results due page not existing.
      state.page = 1;
      //@ts-ignore. TODO: fix types
      state[name] = value;
    },
    clearFilters: (state) => {
      return { ...state, ...initialFiltersState };
    },
    changePage: (state, { payload }) => {
      state.page = payload;
    },
    clearAllJobsState: () => initialState,
  },
  extraReducers: (builder) => {
    return (
      builder.addCase(getAllJobs.pending, (state) => {
        state.isLoading = true;
      }),
      builder.addCase(getAllJobs.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.jobs = payload.jobs;
        state.numOfPages = payload.numOfPages;
        state.totalJobs = payload.totalJobs;
      }),
      builder.addCase(getAllJobs.rejected, (state, payload) => {
        state.isLoading = false;
        //@ts-ignore fix error payload type
        toast.error(payload);
      }),
      builder.addCase(showStats.pending, (state) => {
        state.isLoading = true;
      }),
      builder.addCase(showStats.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.stats = payload.defaultStats;
        state.monthlyApplications = payload.monthlyApplications;
      }),
      builder.addCase(showStats.rejected, (state, payload) => {
        state.isLoading = false;
        //@ts-ignore fix error payload type
        toast.error(payload);
      })
    );
  },
});

export const {
  showLoading,
  hideLoading,
  handleChange,
  clearFilters,
  changePage,
  clearAllJobsState,
} = allJobsSlice.actions;

export default allJobsSlice.reducer;
