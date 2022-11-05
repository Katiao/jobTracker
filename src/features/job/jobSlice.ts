import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { RootState } from "../../store";
// import { ValueOf } from "type-fest";
import { getUserFromLocalStorage } from "../../utils";
import { MODEL_job } from "../../types";
// import { useSelector } from "react-redux";
import { customFetch } from "../../utils/axios";
import { showLoading, hideLoading, getAllJobs } from "../allJobs/allJobsSlice";
// import { getUserFromLocalStorage } from "../../utils";
import { logoutUser } from "../user/userSlice";
import {
  InitiaState,
  HandleChangePayload,
  PostRequestResponse,
  JobSlice,
  DeleteRequestResponse,
} from "./types";

const initialState: InitiaState = {
  isLoading: false,
  position: "",
  company: "",
  jobLocation: "",
  jobTypeOptions: ["full-time", "part-time", "remote", "internship"],
  jobType: "full-time",
  statusOptions: ["interview", "declined", "pending"],
  status: "pending",
  isEditing: false,
  editJobId: "",
};

export const createJob = createAsyncThunk<
  PostRequestResponse,
  MODEL_job,
  { state: RootState }
>("job/createJob", async (job, thunkAPI) => {
  try {
    const resp = await customFetch.post<PostRequestResponse>("/jobs", job, {
      headers: {
        authorization: `Bearer ${thunkAPI.getState().user?.user?.token}`,
      },
    });
    thunkAPI.dispatch(clearValues());
    return resp.data;
  } catch (error: any) {
    // logout user
    if (error.response.status === 401) {
      thunkAPI.dispatch(logoutUser("Unauthorized! Logging out.."));
      return thunkAPI.rejectWithValue("Unauthorized! Logging Out...");
    }
    // basic setup
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
});

export const deleteJob = createAsyncThunk<
  DeleteRequestResponse,
  string,
  { state: RootState }
>("job/deleteJob", async (jobId, thunkAPI) => {
  thunkAPI.dispatch(showLoading());
  try {
    const resp = await customFetch.delete(`/jobs/${jobId}`, {
      headers: {
        authorization: `Bearer ${thunkAPI.getState().user?.user?.token}`,
      },
    });
    thunkAPI.dispatch(getAllJobs());
    return resp.data;
  } catch (error: any) {
    thunkAPI.dispatch(hideLoading());
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
});

const jobSlice: JobSlice = createSlice({
  name: "job",
  initialState,
  reducers: {
    handleChange: (
      state: InitiaState,
      action: PayloadAction<HandleChangePayload>
    ) => {
      const {
        payload: { name, value },
      } = action;
      //@ts-ignore TODO: fix type
      state[name] = value;
    },
    clearValues: () => {
      return {
        ...initialState,
        jobLocation: getUserFromLocalStorage()?.location || "",
      };
    },
  },
  extraReducers: (builder) => {
    return (
      builder.addCase(createJob.pending, (state) => {
        state.isLoading = true;
      }),
      builder.addCase(createJob.fulfilled, (state) => {
        state.isLoading = false;
        toast.success("Job created");
      }),
      builder.addCase(createJob.rejected, (state, payload) => {
        state.isLoading = false;
        //@ts-ignore fix error payload type
        toast.error(payload);
      })
    );
  },
});

export const { handleChange, clearValues } = jobSlice.actions;

export default jobSlice.reducer;
