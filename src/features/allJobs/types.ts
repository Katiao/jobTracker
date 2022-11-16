import { Slice } from "@reduxjs/toolkit";
import { MODEL_jobEntry, MODEL_Stats } from "../../types";

type Sort = "latest" | "oldest" | "a-z" | "z-a";

export type InitialFiltersState = {
  search: string;
  searchStatus: "all" | "interview" | "declined" | "pending";
  searchType: "all" | "full-time" | "part-time" | "remote" | "internship";
  sort: Sort;
  sortOptions: Sort[];
};

export type SearchFormInputs = Omit<InitialFiltersState, "sortOptions">;

export type InitialState = {
  isLoading: boolean;
  jobs: MODEL_jobEntry[];
  totalJobs: number;
  numOfPages: number;
  page: number;
  stats: MODEL_Stats["defaultStats"];
  monthlyApplications: MODEL_Stats["monthlyApplications"];
} & InitialFiltersState;

export type AllJobsRequestResponse = {
  jobs: InitialState["jobs"];
  numOfPages: number;
  totalJobs: number;
};

export type AllJobsSlice = Slice<
  InitialState,
  {
    showLoading: (state: InitialState) => void;
    hideLoading: (state: InitialState) => void;
    handleChange: (
      state: InitialState,
      {
        payload: { name, value },
      }: {
        payload: {
          name: keyof SearchFormInputs;
          value: string;
        };
      }
    ) => void;
    clearFilters: (state: InitialState) => void;
  },
  string
>;
