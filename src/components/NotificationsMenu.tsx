import React, { useState, useEffect, useContext } from "react";
import { Bell, X, Trash2, Target, Key } from "lucide-react";
import { updateNotificationStatus } from "../services/Notification/notification.service";
import { AxiosResponse } from "axios";
import { notifyError } from "../helpers/Notify.helper";
import { updateFriendRequest } from "../services/Friend/friend.service";

type NotificationProps = {
  notifications: Array<any>;
  refreshNotifications: () => void;
};

export function NotificationsMenu({
  notifications,
  refreshNotifications,
}: NotificationProps) {
  const [isOpen, setIsOpen] = useState(false);

  const unreadCount = notifications.filter((n) => !n.is_read).length;

  const handleNotificationClick = (notification: any) => {
    if (notification.friend_request == null) {
      updateNotificationStatus(notification.id)
        .then((_: AxiosResponse) => {
          refreshNotifications();
        })
        .catch((error: any) => {
          console.error(error);
          notifyError("Impossible de marquer les notifications comme lues");
        });
    }
  };

  const handleUpdateFriendRequest = (notification: any, accept: boolean) => {
    updateFriendRequest(notification.friend_request, {
      status: accept ? "accepted" : "rejected",
    })
      .then((_: AxiosResponse) => {
        updateNotificationStatus(notification.id)
          .then((_: AxiosResponse) => {
            refreshNotifications();
          })
          .catch((error: any) => {
            console.error(error);
          });
      })
      .catch((error: any) => {
        console.error(error);
        notifyError("Impossible de mettre à jour la demande d'abonnement");
      });
  };

  const markAllAsRead = () => {
    notifications.forEach((n) => {
      if (n.friend_request == null && !n.is_read) {
        updateNotificationStatus(n.id)
          .then((_: AxiosResponse) => {
            refreshNotifications();
          })
          .catch((error: any) => {
            console.error(error);
            notifyError("Impossible de marquer les notifications comme lues");
          });
      }
    });
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-gray-400 hover:text-white transition-colors"
      >
        <Bell className="w-5 h-5" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#DC002B] rounded-full text-[10px] flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <>
          <div className="absolute right-full mt-2 w-96 bg-[#202123] rounded-lg shadow-lg py-2 z-50 pc">
            <div className="px-4 py-2 border-b border-[#343541] flex items-center justify-between">
              <h3 className="text-sm font-medium text-white">Notifications</h3>
              {notifications.length > 0 && (
                <button
                  onClick={markAllAsRead}
                  className="flex items-center gap-1 px-2 py-1 text-xs text-gray-400 hover:text-white
                          hover:bg-[#2A2B32] rounded transition-colors"
                >
                  <Trash2 className="w-3 h-3" />
                  Marquer tout comme lu
                </button>
              )}
            </div>

            {notifications.length > 0 ? (
              <div className="max-h-96 overflow-y-auto">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`group px-4 py-3 hover:bg-[#2A2B32] cursor-pointer transition-colors
                      ${notification.is_read ? "opacity-60" : ""}`}
                    onClick={() => handleNotificationClick(notification)}
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <p className="text-sm text-gray-300">
                            {notification.message}
                          </p>
                          {notification.friend_request && (
                            <div className="flex items-center gap-2">
                              <button
                                onClick={(e) =>
                                  handleUpdateFriendRequest(notification, true)
                                }
                                className="p-1 text-gray-500 text-[10px] hover:text-white rounded transition-colors
                                        opacity-0 group-hover:opacity-100 flex-shrink-0"
                              >
                                Accepter
                              </button>
                              <button
                                onClick={(e) =>
                                  handleUpdateFriendRequest(notification, false)
                                }
                                className="p-1 text-gray-500  text-[10px] hover:text-white rounded transition-colors
                                      opacity-0 group-hover:opacity-100 flex-shrink-0"
                              >
                                Refuser
                              </button>
                            </div>
                          )}
                        </div>
                        <p className="text-xs text-gray-500 mt-1">
                          {new Date(
                            notification.created_at
                          ).toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="px-4 py-6 text-center">
                <p className="text-sm text-gray-400">Aucune notification</p>
              </div>
            )}
          </div>
          <div className=" mobile absolute right-[-27vw] mt-2 w-[95vw] bg-[#202123] rounded-lg shadow-lg py-2 z-50">
            <div className="px-4 py-2 border-b border-[#343541] flex items-center justify-between">
              <h3 className="text-sm font-medium text-white">Notifications</h3>
              {notifications.length > 0 && (
                <button
                  onClick={markAllAsRead}
                  className="flex items-center gap-1 px-2 py-1 text-xs text-gray-400 hover:text-white
                        hover:bg-[#2A2B32] rounded transition-colors"
                >
                  <Trash2 className="w-3 h-3" />
                  Marquer tout comme lu
                </button>
              )}
            </div>

            {notifications.length > 0 ? (
              <div className="max-h-96 overflow-y-auto">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`group px-4 py-3 hover:bg-[#2A2B32] cursor-pointer transition-colors
                    ${notification.is_read ? "opacity-60" : ""}`}
                    onClick={() => handleNotificationClick(notification)}
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <p className="text-sm text-gray-300">
                            {notification.message}
                          </p>
                          {notification.friend_request && (
                            <div className="flex items-center gap-2">
                              <button
                                onClick={(e) =>
                                  handleUpdateFriendRequest(notification, true)
                                }
                                className="p-1 text-gray-500 text-[10px] hover:text-white rounded transition-colors
                                      opacity-0 group-hover:opacity-100 flex-shrink-0"
                              >
                                Accepter
                              </button>
                              <button
                                onClick={(e) =>
                                  handleUpdateFriendRequest(notification, false)
                                }
                                className="p-1 text-gray-500  text-[10px] hover:text-white rounded transition-colors
                                    opacity-0 group-hover:opacity-100 flex-shrink-0"
                              >
                                Refuser
                              </button>
                            </div>
                          )}
                        </div>
                        <p className="text-xs text-gray-500 mt-1">
                          {new Date(
                            notification.created_at
                          ).toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="px-4 py-6 text-center">
                <p className="text-sm text-gray-400">Aucune notification</p>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
