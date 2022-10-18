import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { ValueOf } from "type-fest";
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

type handleChangePayload = {
  name: Partial<keyof InitiaState>;
  //TODO: find out why I cannot change this type
  value: never;
};

const jobSlice = createSlice({
  name: "job",
  initialState,
  reducers: {
    handleChange: (
      state: InitiaState,
      action: PayloadAction<handleChangePayload>
    ) => {
      const {
        payload: { name, value },
      } = action;
      state[name] = value;
    },
  },
});

export default jobSlice.reducer;
