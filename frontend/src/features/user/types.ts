import { MODEL_user } from "../../types";

export type UserSliceInitialState = {
  isLoading: boolean;
  isSidebarOpen: boolean;
  user: MODEL_user | null;
};

export type RequestResponse = {
  user: MODEL_user;
};