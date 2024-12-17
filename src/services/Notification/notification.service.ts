import API from "../index.service";

export const getUserNotifications = () => {
  return API.get("/notifications/");
};

export const updateNotificationStatus = (notificationId: number) => {
  return API.patch(`/notifications/${notificationId}`);
};
