import API from "../index.service";

export const addOrUpdateProfile = (id: number, data: any) => {
  return API.post(`/profile/${id}`, data);
};

export const getUserProfile = (id: number) => {
  return API.get(`/profile/user/${id}`);
};
