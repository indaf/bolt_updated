import API from "../index.service";

export const addLike = (data: any) => {
  return API.post("/likes/", data);
};

export const addLikeProduct = (data: any) => {
  return API.post("/likes_products/", data);
};
