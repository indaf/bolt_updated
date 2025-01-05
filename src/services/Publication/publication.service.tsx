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

export const getPublicationById = (id: number) => {
  return API.get(`/publication/${id}`);
};

export const updatePublicationById = (id: number, data: any) => {
  return API.put(`/publication/update/${id}`, data);
};

export const deletePublication = (id: number) => {
  return API.delete(`/publication/delete/${id}`);
};

export const getSavedByUser = () => {
  return API.get("/publication/saved/");
};
