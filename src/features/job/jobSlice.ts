import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
// import { ValueOf } from "type-fest";
import { getUserFromLocalStorage } from "../../utils";
// import { useSelector } from "react-redux";
import { customFetch } from "../../utils/axios";
// import { getUserFromLocalStorage } from "../../utils";
import { logoutUser } from "../user/userSlice";
import {
  InitiaState,
  HandleChangePayload,
  RequestPayload,
  RequestResponse,
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

export const createJob = createAsyncThunk<RequestResponse, RequestPayload>(
  "job/createJob",
  async (requestPayload, thunkAPI) => {
    try {
      const resp = await customFetch.post<RequestResponse>(
        "/jobs",
        requestPayload.job,
        {
          headers: {
            authorization: `Bearer ${requestPayload.token}`,
          },
        }
      );
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
  }
);

const jobSlice = createSlice({
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
      //@ts-ignore
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
