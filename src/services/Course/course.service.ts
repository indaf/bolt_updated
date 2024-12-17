import API from "../index.service";

export const addCourse = (data: any) => {
  return API.post("/course/", data);
};

export const getAllCourses = () => {
  return API.get("/course/all");
};

export const getCourseById = (id: number) => {
  return API.get(`/course/${id}`);
};

export const updateCourseById = (id: number, data: any) => {
  return API.put(`/course/update/${id}`, data);
};

export const deleteCourseById = (id: number) => {
  return API.delete(`/course/delete/${id}`);
};
