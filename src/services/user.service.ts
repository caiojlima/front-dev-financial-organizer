import axios from 'axios';
import { CreateUserBody } from '../types';

export const userRegister = async (body: CreateUserBody) =>
  await axios.post(`${process.env.REACT_APP_API_URL}/users`, body);

export const checkEmail = async (email: string) =>
  await axios.get(
    `${process.env.REACT_APP_API_URL}/users/email-validation/${email}`,
  );
