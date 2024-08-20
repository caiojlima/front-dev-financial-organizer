import { Bounce, ToastOptions } from "react-toastify";

export const warning: ToastOptions = {
  position: "bottom-right",
  autoClose: 7000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "colored",
  transition: Bounce,
}