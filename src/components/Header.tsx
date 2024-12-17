import React, { useContext, useEffect, useState } from "react";
import { Menu, Bell } from "lucide-react";
import { UserMenu } from "./UserMenu";
import { LoginModal } from "./LoginModal";
import { NotificationsMenu } from "./NotificationsMenu";
import { AuthContext } from "../context/Auth.context";
import { getUserNotifications } from "../services/Notification/notification.service";
import { notifyError } from "../helpers/Notify.helper";
import { AxiosResponse } from "axios";
import { useLocation } from "react-router-dom";

interface HeaderProps {
  onMenuClick: () => void;
}

export function Header({ onMenuClick }: HeaderProps) {
  const { user, isAuthenticated } = useContext<any>(AuthContext);
  const [isLoginModalOpen, setIsLoginModalOpen] = React.useState(false);
  const [notifications, setNotifications] = useState<Array<any>>([]);
  const location = useLocation();

  useEffect(() => {
    loadUserNotifications();
  }, [location.pathname]);

  const loadUserNotifications = () => {
    getUserNotifications()
      .then((response: AxiosResponse) => {
        setNotifications(response.data);
      })
      .catch((error: any) => {
        console.error(error);
        notifyError("Impossible de charger les notifications");
      });
  };

  return (
    <header className="bg-[#101010] border-b border-[#242424] w-full">
      <div className="container mx-auto px-4 py-4 lg:py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={onMenuClick} className="btn-icon btn-ghost -ml-2">
              <Menu className="w-5 h-5" />
            </button>
            <img
              src="/cdtarget-logo.svg"
              alt="CDTARGET Logo"
              className="w-8 h-8 text-[#DC002B]"
            />
            <h1 className="text-xl lg:text-2xl text-[#FE0032] font-bebas tracking-wider">
              CDTARGET
            </h1>
          </div>

          <div className="flex items-center gap-4">
            {isAuthenticated ? (
              <>
                <NotificationsMenu
                  refreshNotifications={loadUserNotifications}
                  notifications={notifications}
                />
                <UserMenu user={user} />
              </>
            ) : (
              <button
                onClick={() => setIsLoginModalOpen(true)}
                className="btn btn-secondary flex items-center gap-2"
              >
                <img src="/cdtarget-logo.svg" alt="" className="w-4 h-4" />
                <span>Se connecter</span>
              </button>
            )}
          </div>
        </div>
      </div>

      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
      />
    </header>
  );
}
