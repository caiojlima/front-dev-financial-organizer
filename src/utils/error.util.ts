import { AxiosError } from "axios";
import { ErrorMessageCodeEnum } from "../types/error.enum";

export const getErrorMessage = ({ response }: AxiosError<{ statusCode: number; }>): string => {
  const statusCode = response?.data.statusCode ?? 500;
  return ErrorMessageCodeEnum[statusCode]
}