import API from "../index.service";

export const addComment = (data: any) => {
  return API.post("/comments/", data);
};
