export type MODEL_Member = {
  email: string;
  password: string;
};

export type MODEL_NonMember = {
  name: string;
} & MODEL_Member;

export type MODEL_user = {
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

export type MODEL_job = {
  position: string;
  company: string;
  jobLocation: string;
  jobType: MODEL_jobTypeOption;
  status: MODEL_statusOption;
};
