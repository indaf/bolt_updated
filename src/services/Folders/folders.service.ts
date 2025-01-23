import API from "../index.service";

export const getAllFolders = () => {
  return API.get("/folder/");
};

export const addFolder = (data: any) => {
  return API.post("/folder/add", data);
};

export const updateFolderById = (id: number, data: any) => {
  return API.put(`/folder/edit/${id}`, data);
};

export const deleteFolderById = (id: number) => {
  return API.delete(`/folder/delete/${id}`);
};

export const getFolderById = (id: number) => {
  return API.get(`/folder/get/${id}`);
};
