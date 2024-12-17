import API from "../index.service";

export const addFriend = (data: any) => {
  return API.post("/friend/", data);
};

export const removeFriend = (id_friend: any) => {
  return API.delete("/friend/" + id_friend);
};

export const updateFriendRequest = (id: number, data: any) => {
  return API.put("/friend/update/" + id, data);
};
