import axios from 'axios';
import { ForgotPasswordInput, LoginFormInput } from '../schemas';
import { ResetPasswordRequest } from '../types';

export const userLogin = async (body: LoginFormInput) =>
  await axios.post(`${process.env.REACT_APP_API_URL}/auth/login`, body);

export const forgotPassword = async (body: ForgotPasswordInput) =>
  await axios.post(`${process.env.REACT_APP_API_URL}/auth/request-reset`, body);

export const resetPassword = async ({
  password,
  authorization,
}: ResetPasswordRequest) =>
  await axios.patch(
    `${process.env.REACT_APP_API_URL}/auth/reset-password`,
    { password },
    { headers: { authorization } },
  );
