import API from "../index.service";
import { ChangePasswordType } from "./types/ChangePassword.type";
import { CreateAccountType } from "./types/CreateAccount.type";
import { LoginUserType } from "./types/LoginUserType.type";

export const createAccount = (data: CreateAccountType | any) => {
  return API.post("/user/", data);
};

export const getAllShooters = () => {
  return API.get("/user/all");
};

export const loginUser = (data: LoginUserType) => {
  return API.post("/user/login", data);
};

export const activateAccount = (token: string) => {
  return API.patch(`/user/activate?token=${token}`);
};

export const checkAccountExist = (email: string) => {
  return API.post(`/user/check-exist`, { email });
};

export const loginSSOUser = (credential: string) => {
  return API.post(`/user/login-sso`, { credential });
};

export const me = () => {
  return API.get(`/user/me`);
};

export const updateUser = (data: any) => {
  return API.put(`/user/update`, data);
};

export const updateUserPassword = (data: any) => {
  return API.put(`/user/update-password`, data);
};

export const refreshUserToken = (refreshToken: string) => {
  return API.post(`/user/refresh-token`, { refreshToken });
};

export const askForResetPassword = (email: string) => {
  return API.post(`/user/reset-password`, { email });
};

export const checkResetTokenExist = (token: string) => {
  return API.get(`/user/reset-token-exist?token=${token}`);
};

export const changePassword = (data: ChangePasswordType) => {
  return API.post(`/user/change-password`, data);
};

export const deleteAccount = () => {
  return API.delete(`/user/delete`);
};

export const updateUserById = (id: number, data: any) => {
  return API.put(`/user/update/${id}`, data);
};

export const addWeaponToUser = (userId: number, weaponId: number) => {
  return API.put(`/user/${userId}/add/weapon`, { weapon_id: weaponId });
};

export const deleteWeaponFromUser = (userId: number, weaponId: number) => {
  return API.put(`/user/${userId}/delete/weapon`, { weapon_id: weaponId });
};

export const searchShooter = (search: string) => {
  return API.get(`/user/search-shooter?query=${search}`);
};
