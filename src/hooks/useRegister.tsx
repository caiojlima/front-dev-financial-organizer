import { useMutation } from "@tanstack/react-query"
import { CreateUserBody } from "../types"
import { userRegister } from "../services"

export const useUserRegister = () => {
  const userRegisterMutation = useMutation({
    mutationFn: (data: CreateUserBody) => userRegister(data)
  });

  return { userRegisterMutation }
}