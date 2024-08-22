import { User } from './user.type';

export type CreateWalletEntryBody = {
  description: string;
  value: number;
  paymentMethod: string;
  authorization: string;
};

type WalletQueryParams = {
  start?: string;
  end?: string;
};

export type GetWalletEntriesParams = {
  authorization: string;
  params?: WalletQueryParams;
};

export type Wallet = {
  id: number;
  description: string;
  value: string;
  paymentMethod: string;
  user: User;
  createdAt: string;
  updatedAt: string;
};

export type WalletResponse = {
  entries: Wallet[];
  total: number;
};

export type UpdateWalletEntry = CreateWalletEntryBody & { id: string };

export type UpdateWalletEdit = {
  id: number;
  description: string;
  value: string;
  paymentMethod: string;
};

export type DeleteWalletEntry = {
  authorization: string;
  id: string;
};
