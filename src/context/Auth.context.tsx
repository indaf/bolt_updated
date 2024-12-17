import {
  ContextType,
  createContext,
  useCallback,
  useEffect,
  useState,
} from "react";
import { me } from "../services/Auth/Auth.service";
import { AxiosResponse } from "axios";
import { notifyError } from "../helpers/Notify.helper";
import { UserType } from "../services/Auth/types/User.type";
import {
  checkAccessToken,
  resetLocalStorageAndRedirect,
} from "../helpers/Auth.helper";

const AuthContext = createContext<ContextType<any>>(undefined as any);

function AuthProvider({ children }: any) {
  const [user, setUser] = useState<UserType>();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const retrieveUser = () => {
    me()
      .then((response: AxiosResponse) => {
        setUser(response.data.user);
        setIsAuthenticated(true);
      })
      .catch((error: any) => {
        notifyError(
          `Une erreur est survenue lors de la récupération de vos informations. ${error.response?.data.message}`
        );
      });
  };

  const updateUserInfo = () => {
    me()
      .then((response: AxiosResponse) => {
        setUser(response.data.user);
      })
      .catch((error: any) => {
        notifyError(
          `Une erreur est survenue lors de la récupération de vos informations. ${error.response?.data.message}`
        );
      });
  };

  useEffect(() => {
    checkToken();
  }, []);

  const checkToken = useCallback(() => {
    checkAccessToken()
      .then((isTokenValid: boolean) => {
        if (isTokenValid === true) {
          retrieveUser();
        } else {
          setIsAuthenticated(false);
          resetLocalStorageAndRedirect();
        }
      })
      .catch((error: any) => {
        notifyError(
          `Une erreur est survenue lors de la récupération de vos informations. ${error.response?.data.message}`
        );
        resetLocalStorageAndRedirect();
      });
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser: (value: any) => setUser(value),
        retrieveUser,
        setIsAuthenticated,
        isAuthenticated,
        updateUserInfo,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
export { AuthContext, AuthProvider };
