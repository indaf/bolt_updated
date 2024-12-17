import API from "../index.service";

export const getFriendsAchievements = () => {
  return API.get("/achievement/friends");
};

export const getPublicAchievements = () => {
  return API.get("/achievement/public");
};
