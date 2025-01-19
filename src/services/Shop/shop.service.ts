import API from "../index.service";

export const getAllProducts = () => {
  return API.get("/shop/");
};

export const createProduct = (data: any) => {
  return API.post("/shop/create", data);
};

export const updateProduct = (id: number, data: any) => {
  return API.put(`/shop/update/${id}`, data);
};

export const deleteProduct = (id: number) => {
  return API.delete(`/shop/delete/${id}`);
};

export const handleClickProduct = (id: number) => {
  return API.get(`/shop/click/${id}`);
};
