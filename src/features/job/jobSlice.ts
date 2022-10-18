import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import {
  MODEL_jobTypeOptions,
  MODEL_jobTypeOption,
  MODEL_statusOption,
  MODEL_statusOptions,
} from "../../types";
import { customFetch } from "../../utils/axios";
import { getUserFromLocalStorage } from "../../utils";

type InitiaState = {
  isLoading: boolean;
  position: string;
  company: string;
  jobLocation: string;
  jobTypeOptions: MODEL_jobTypeOptions;
  jobType: MODEL_jobTypeOption;
  statusOptions: MODEL_statusOptions;
  status: MODEL_statusOption;
  isEditing: boolean;
  editJobId: string;
};

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

const jobSlice = createSlice({
  name: "job",
  initialState,
  reducers: {},
});

export default jobSlice.reducer;
