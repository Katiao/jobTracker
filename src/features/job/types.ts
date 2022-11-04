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

export type RequestResponse = {
  job: MODEL_jobEntry;
};

export type RequestPayload = {
  job: MODEL_job;
  token?: string;
};
