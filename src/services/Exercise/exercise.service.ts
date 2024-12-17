import API from "../index.service";

export const getAllExercises = () => {
  return API.get("/exercise/all/");
};

export const getUserExercises = () => {
  return API.get("/exercise/user/");
};

export const createExercise = (data: any) => {
  return API.post("/exercise/", data);
};

export const updateExerciseById = (id: number, data: any) => {
  return API.put(`/exercise/update/${id}`, data);
};

export const deleteExerciseById = (id: number) => {
  return API.delete(`/exercise/delete/${id}`);
};
