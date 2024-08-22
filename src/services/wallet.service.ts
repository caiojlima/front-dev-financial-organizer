import axios, { AxiosResponse } from 'axios';
import {
  CreateWalletEntryBody,
  DeleteWalletEntry,
  GetWalletEntriesParams,
  UpdateWalletEntry,
  WalletResponse,
} from '../types/wallet.type';

export const addWalletEntry = async ({
  authorization,
  ...body
}: CreateWalletEntryBody) =>
  await axios.post(
    `${process.env.REACT_APP_API_URL}/wallet`,
    { ...body },
    { headers: { authorization: `Bearer ${authorization}` } },
  );

export const getAllWalletsEntries = async ({
  authorization,
  params,
}: GetWalletEntriesParams): Promise<AxiosResponse<WalletResponse>> =>
  await axios.get(`${process.env.REACT_APP_API_URL}/wallet`, {
    headers: { authorization: `Bearer ${authorization}` },
  });

export const updateEntry = async ({
  id,
  authorization,
  ...body
}: UpdateWalletEntry) =>
  await axios.put(
    `${process.env.REACT_APP_API_URL}/wallet/${id}`,
    { ...body },
    { headers: { authorization: `Bearer ${authorization}` } },
  );

export const deleteEntry = async ({ id, authorization }: DeleteWalletEntry) =>
  await axios.delete(`${process.env.REACT_APP_API_URL}/wallet/${id}`, {
    headers: { authorization: `Bearer ${authorization}` },
  });
