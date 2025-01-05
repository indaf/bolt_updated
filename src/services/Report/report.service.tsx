import API from "../index.service";

export const getAllReports = () => {
  return API.get("/report/");
};

export const getAllActiveReports = () => {
  return API.get("/report/active");
};

export const createReport = (data: any) => {
  return API.post("/report/create", data);
};

export const updateReport = (id: number, data: any) => {
  return API.put(`/report/update/${id}`, data);
};
