import API from "../index.service";

export const addMedia = (data: any) => {
  return API.post("/media/", data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};
