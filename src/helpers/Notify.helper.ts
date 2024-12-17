import toast from "react-hot-toast";

export const notifySuccess = (message: string) => {
  toast.success(message, {
    duration: 3000,
    position: "top-center",
  });
};

export const notifyError = (message: string) => {
  toast.error(message, {
    duration: 3000,
    position: "top-center",
  });
};

export const notifyCustom = (component: JSX.Element) => {
  toast.custom(component, {
    duration: 3000,
    position: "top-center",
  });
};
