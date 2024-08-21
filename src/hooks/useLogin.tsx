import { useMutation } from "@tanstack/react-query"
import { userLogin } from "../services"
import { LoginFormInput } from "../schemas";

export const useLogin = () => {
  const loginMutation = useMutation({
    mutationFn: (data: LoginFormInput) => userLogin(data)
  });

  return { loginMutation }
}