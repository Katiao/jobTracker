export type MODEL__Member = {
  email: string;
  password: string;
};

export type MODEL__NonMember = {
  name: string;
} & MODEL__Member;

export type MODEL__user = {
  email: string;
  lastName: string;
  location: string;
  name: string;
  token: string;
};

export type MODEL_jobTypeOption =
  | "full-time"
  | "part-time"
  | "remote"
  | "internship";
export type MODEL_jobTypeOptions = MODEL_jobTypeOption[];

export type MODEL_statusOption = "interview" | "declined" | "pending";
export type MODEL_statusOptions = MODEL_statusOption[];
