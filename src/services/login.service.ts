import axios from "axios";
import { LoginFormInput } from "../schemas";

export const userLogin = async (body: LoginFormInput) =>
  await axios.post(`${process.env.REACT_APP_API_URL}/auth/login`, body)