import API from "../index.service";

export const searchWeapons = (query: string) => {
  return API.get(`/weapons/search?query=${query}`);
};
