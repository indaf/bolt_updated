import API from "../index.service";

export const getTags = () => {
  return API.get("/tags/all");
};

export const createTag = (data: any) => {
  return API.post("/tags/", data);
};
