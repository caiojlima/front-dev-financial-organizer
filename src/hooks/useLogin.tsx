import { useMutation } from "@tanstack/react-query"
import { forgotPassword, resetPassword, userLogin } from "../services"
import { ForgotPasswordInput, LoginFormInput } from "../schemas";
import { ResetPasswordRequest } from "../types";

export const useLogin = () => {
  const loginMutation = useMutation({
    mutationFn: (data: LoginFormInput) => userLogin(data)
  });

  const forgotPasswordMutation = useMutation({
    mutationFn: (data: ForgotPasswordInput) => forgotPassword(data)
  });

  const resetPasswordMutation = useMutation({
    mutationFn: (data: ResetPasswordRequest) => resetPassword(data)
  })

  return { loginMutation, forgotPasswordMutation, resetPasswordMutation }
}