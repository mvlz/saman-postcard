import { toast } from "react-toastify";

export const successToast = (message: string) => {
    toast.success(message, {
      position: "top-right",
      autoClose: 8000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      style: { fontFamily: "IRANSansWeb", fontSize:"12px"}
    });
  };
  