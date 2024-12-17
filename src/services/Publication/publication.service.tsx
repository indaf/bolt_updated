import API from "../index.service";

export const getAllPublications = () => {
  return API.get("/publication/all/");
};

export const createPublication = (data: any) => {
  return API.post("/publication/", data);
};

export const getFriendsPublications = () => {
  return API.get("/publication/friends/");
};

export const getPublicPublications = () => {
  return API.get("/publication/public/");
};
