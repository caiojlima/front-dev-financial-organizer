import { useMutation } from "@tanstack/react-query"
import { userLogin } from "../services/login.service"
import { toast } from 'react-toastify';
import { LoginFormInput } from "../schemas/loginSchema";

export const useLogin = () => {
  const loginMutation = useMutation({
    mutationFn: (data: LoginFormInput) => userLogin(data)
  });

  return { loginMutation }
}