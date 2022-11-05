import { Slice } from "@reduxjs/toolkit";
import { MODEL_jobEntry } from "../../types";

type Sort = "latest" | "oldest" | "a-z" | "z-a";

//TODO: improve type
export type InitialFiltersState = {
  search: string;
  searchStatus: string;
  searchType: string;
  sort: Sort;
  sortOptions: Sort[];
};

//TODO: improve type
export type InitialState = {
  isLoading: boolean;
  jobs: MODEL_jobEntry[];
  totalJobs: number;
  numOfPages: number;
  page: number;
  stats: {};
  monthlyApplications: [];
} & InitialFiltersState;

export type RequestResponse = {
  jobs: InitialState["jobs"];
  numOfPages: number;
  totalJobs: number;
};

export type AllJobsSlice = Slice<
  InitialState,
  {
    showLoading: (state: InitialState) => void;
    hideLoading: (state: InitialState) => void;
  },
  string
>;
