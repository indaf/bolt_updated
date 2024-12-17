import { jwtDecode } from "jwt-decode";
import { convertStringAsBoolean } from "./TextFormat.helper";
import { refreshUserToken } from "../services/Auth/Auth.service";
import { AxiosResponse } from "axios";
import { notifyError } from "./Notify.helper";
import { DISABLE_REDIRECT } from "../const/DISABLE_REDIRECT.const";

export const checkAccessToken = async () => {
  const token = localStorage.getItem("token");
  const keep_alive = convertStringAsBoolean(localStorage.getItem("keep_alive"));

  if (!token || !keep_alive) {
    // If no token or keep_alive is false, reset local storage and redirect
    resetLocalStorageAndRedirect();
    return false;
  }

  const decodedToken = jwtDecode(token);
  if (checkTokenExpirationDate(decodedToken)) {
    // If token is still valid, return true
    return true;
  } else {
    const refreshToken = localStorage.getItem("refresh_token");
    if (!refreshToken || refreshToken === "undefined") {
      // If no refresh token, reset local storage and redirect
      resetLocalStorageAndRedirect();
    } else {
      // Refresh token if expired
      localStorage.removeItem("token");
      const response: AxiosResponse = await refreshUserToken(refreshToken);

      if (response?.data?.access && response?.status == 200) {
        localStorage.setItem("token", response.data.access);
        localStorage.setItem("refresh_token", response.data.refresh);
        return true;
      } else {
        // If refresh token is expired, reset local storage and redirect
        notifyError(
          "Une erreur est survenue lors de la récupération de vos informations. Veuillez vous reconnecter."
        );
        resetLocalStorageAndRedirect();
      }
    }
  }
};

export const resetLocalStorageAndRedirect = () => {
  localStorage.clear();
  if (DISABLE_REDIRECT.indexOf(window.location.pathname) === -1) {
    window.location.assign("/");
  }
};

export const checkTokenExpirationDate = (decodedToken: any) => {
  const expirationDate = new Date(decodedToken.exp * 1000);
  const currentDate = new Date();
  return currentDate < expirationDate;
};
