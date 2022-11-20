import { PayloadAction, Slice } from "@reduxjs/toolkit";

import {
  MODEL_jobTypeOptions,
  MODEL_statusOptions,
  MODEL_job,
  MODEL_jobEntry,
} from "../../types";

export type InitiaState = MODEL_job & {
  isLoading: boolean;
  jobTypeOptions: MODEL_jobTypeOptions;
  statusOptions: MODEL_statusOptions;
  isEditing: boolean;
  editJobId: string;
};

export type HandleChangePayload = {
  name: Partial<keyof InitiaState>;
  //TODO: find out why I cannot change this type
  value?: string;
};

export type JobSlice = Slice<
  InitiaState,
  {
    handleChange: (
      state: InitiaState,
      action: PayloadAction<HandleChangePayload>
    ) => void;
    clearValues: () => InitiaState;
    setEditJob: (
      state: InitiaState,
      action: { payload: Partial<InitiaState>; type: string }
    ) => InitiaState;
  },
  string
>;

export type PostRequestResponse = {
  job: MODEL_jobEntry;
};

export type DeleteRequestResponse = {
  msg: string;
};

export type PatchRequestResponse = {
  updatedJob: MODEL_jobEntry;
};

export type EditJobArg = {
  jobId: InitiaState["editJobId"];
  job: MODEL_job;
};
