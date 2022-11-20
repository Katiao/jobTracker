import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { RootState } from "../../store";
// import { ValueOf } from "type-fest";
import { getUserFromLocalStorage } from "../../utils";
import { MODEL_job } from "../../types";
// import { useSelector } from "react-redux";
import { customFetch, handleRequestError } from "../../utils/axios";
import { showLoading, hideLoading, getAllJobs } from "../allJobs/allJobsSlice";
// import { getUserFromLocalStorage } from "../../utils";
import {
  InitiaState,
  HandleChangePayload,
  PostRequestResponse,
  JobSlice,
  DeleteRequestResponse,
  PatchRequestResponse,
  EditJobArg,
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
    const resp = await customFetch.post<PostRequestResponse>("/jobs", job);
    thunkAPI.dispatch(clearValues());
    return resp.data;
  } catch (error: any) {
    return handleRequestError(error, thunkAPI);
  }
});

export const deleteJob = createAsyncThunk<
  DeleteRequestResponse,
  string,
  { state: RootState }
>("job/deleteJob", async (jobId, thunkAPI) => {
  thunkAPI.dispatch(showLoading());
  try {
    const resp = await customFetch.delete(`/jobs/${jobId}`);
    thunkAPI.dispatch(getAllJobs());
    return resp.data;
  } catch (error: any) {
    thunkAPI.dispatch(hideLoading());
    return handleRequestError(error, thunkAPI);
  }
});

export const editJob = createAsyncThunk<
  PatchRequestResponse,
  EditJobArg,
  { state: RootState }
>("job/editJob", async ({ jobId, job }, thunkAPI) => {
  try {
    const resp = await customFetch.patch(`/jobs/${jobId}`, job);
    thunkAPI.dispatch(clearValues());
    return resp.data;
  } catch (error: any) {
    return handleRequestError(error, thunkAPI);
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
    setEditJob: (
      state: InitiaState,
      { payload }: { payload: Partial<InitiaState> }
    ) => {
      return { ...state, isEditing: true, ...payload };
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
      }),
      builder.addCase(editJob.pending, (state) => {
        state.isLoading = true;
      }),
      builder.addCase(editJob.fulfilled, (state) => {
        state.isLoading = false;
        toast.success("Job modified...");
      }),
      builder.addCase(editJob.rejected, (state, payload) => {
        state.isLoading = false;
        //@ts-ignore fix error payload type
        toast.error(payload);
      })
    );
  },
});

export const { handleChange, clearValues, setEditJob } = jobSlice.actions;

export default jobSlice.reducer;
