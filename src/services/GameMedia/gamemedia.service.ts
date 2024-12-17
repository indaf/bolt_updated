import { BsTags } from "react-icons/bs";
import API from "../index.service";

export const getGameMedia = (
  tags: Array<any>,
  menace_ratio: number,
  number: number
) => {
  return API.get(
    `/game-media/tags?tags=${tags.join(
      ","
    )}&menace_ratio=${menace_ratio}&number=${number}`
  );
};

export const getAllGameMedia = () => {
  return API.get(`/game-media/all`);
};

export const addMedia = (data: any) => {
  return API.post(`/game-media/`, data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const deleteMedia = (id: number) => {
  return API.delete(`/game-media/delete/${id}`);
};
