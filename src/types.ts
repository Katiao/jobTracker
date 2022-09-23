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
