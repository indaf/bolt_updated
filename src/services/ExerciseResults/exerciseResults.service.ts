import API from "../index.service";

export const getAllExerciseResults = () => {
  return API.get("/exercise-results/all");
};

export const getExerciseResultsByExerciseId = (
  exerciseId: number,
  page: number = 1
) => {
  return API.get(`/exercise-results/exercise/${exerciseId}?page=${page}`);
};

export const getAllExerciseResultsByExerciseId = (exerciseId: number) => {
  return API.get(`/exercise-results/exercise/${exerciseId}/all`);
};

export const getExerciseResultsByShooterId = (
  shooterId: number,
  page: number = 1
) => {
  return API.get(`/exercise-results/shooter/${shooterId}`);
};

export const deleteExerciseResult = (exerciseResultId: number) => {
  return API.delete(`/exercise-results/delete/${exerciseResultId}`);
};

export const createExerciseResult = (exerciseResult: any) => {
  return API.post("/exercise-results/", exerciseResult);
};
