export type CreateUserBody = {
  name: string;
  password: string;
  email: string;
};

export type User = {
  id: number;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
};

export type UserToken = {
  sub: number;
  name: string;
  email: string;
  role: string;
};
