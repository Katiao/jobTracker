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

export type MODEL_jobEntry = MODEL_job & {
  createdBy: string;
  _id: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

type DefaultStats = {
  pending: number;
  interview: number;
  declined: number;
};

type MonthlyApplicationData = {
  date: "string";
  count: number;
};

type MonthlyApplications = MonthlyApplicationData[];

export type MODEL_Stats = {
  defaultStats: DefaultStats;
  monthlyApplications: MonthlyApplications;
};

export type RegisterAndLoginRequestResponse = {
  user: MODEL_user;
  token: string;
  location?: string;
};
