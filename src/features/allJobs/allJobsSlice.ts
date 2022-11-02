import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { MODEL_job, MODEL_jobEntry } from "../../types";
import { customFetch } from "../../utils/axios";

type Sort = "latest" | "oldest" | "a-z" | "z-a";

//TODO: improve type
type InitialFiltersState = {
  search: string;
  searchStatus: string;
  searchType: string;
  sort: Sort;
  sortOptions: Sort[];
};

//TODO: improve type
type InitialState = {
  isLoading: boolean;
  jobs: MODEL_jobEntry[];
  totalJobs: number;
  numOfPages: number;
  page: number;
  stats: {};
  monthlyApplications: [];
} & InitialFiltersState;

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

type RequestResponse = {
  jobs: InitialState["jobs"];
  numOfPages: number;
  totalJobs: number;
};

export const getAllJobs = createAsyncThunk<RequestResponse, string>(
  "allJobs/getJobs",
  async (token, thunkAPI) => {
    let url = `/jobs`;

    try {
      const resp = await customFetch.get<RequestResponse>(url, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });

      return resp.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
);

const allJobsSlice = createSlice({
  name: "allJobs",
  initialState,
  reducers: {},
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

export default allJobsSlice.reducer;
