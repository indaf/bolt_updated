import React, { useContext } from "react";
import {
  MessageCircle,
  BookOpen,
  Users,
  User,
  Compass,
  LayoutGrid,
  Settings,
  Link2,
} from "lucide-react";
import { AuthContext } from "../context/Auth.context";
import { useLocation, useNavigate } from "react-router-dom";
import { CiWarning } from "react-icons/ci";
import { BiCart } from "react-icons/bi";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onToggle: () => void;
  onToggleMobile?: () => void;
  isOpenMobile?: boolean;
}

export function Sidebar({
  isOpen,
  onClose,
  onToggle,
  isOpenMobile,
  onToggleMobile,
}: SidebarProps) {
  const navigate = useNavigate();
  const { user } = useContext<any>(AuthContext);
  const location = useLocation();
  if (!user) return null;

  const isAdmin =
    user.groups.findIndex((group: any) => group.name == "admin") > -1;
  const isInstructor =
    user.groups.findIndex((group: any) => group.name == "instructor") > -1 ||
    isAdmin;
  const isValidatedInstructor = isInstructor && user.instructor_activated;
  const hasInstructorAccess = isValidatedInstructor || isAdmin;

  const commonMenuItems = [
    {
      id: "discover",
      label: "Accueil",
      icon: <Compass className="w-5 h-5" />,
    },
    {
      id: "profile/" + user.id,
      label: "Mon profil",
      icon: <User className="w-5 h-5" />,
    },
    {
      id: "courses",
      label: "Cours en ligne",
      icon: <BookOpen className="w-5 h-5" />,
    },
    // {
    //   id: "chat",
    //   label: "Tchat",
    //   icon: <MessageCircle className="w-5 h-5" />,
    // },
    {
      id: "shop",
      label: "Boutique",
      icon: <BiCart className="w-5 h-5" />,
    },
    {
      id: "apps",
      label: "Applications",
      icon: <LayoutGrid className="w-5 h-5" />,
    },
    {
      id: "links",
      label: "Liens",
      icon: <Link2 className="w-5 h-5" />,
    },
  ];

  const instructorMenuItems: Array<any> = [];

  const adminMenuItems = [
    {
      id: "shooters",
      label: "Mes contacts",
      icon: <Users className="w-5 h-5" />,
    },
    {
      id: "moderation",
      label: "Modération",
      icon: <CiWarning className="w-5 h-5" />,
    },
    {
      id: "back-apps",
      label: "Back Apps",
      icon: <Settings className="w-5 h-5" />,
    },
  ];

  const handleNavigateMobile = (id: string) => {
    if (onToggleMobile) {
      onToggleMobile();
    }
    navigate("/" + id);
  };

  const menuItems = [
    ...commonMenuItems,
    ...(hasInstructorAccess ? instructorMenuItems : []),
    ...(isAdmin ? adminMenuItems : []),
  ];

  return (
    <>
      <div className="h-full flex flex-col bg-[#202123] border-r border-[#343541] pc">
        <div className="flex-1 p-2 space-y-1">
          {menuItems.map((item: any) => (
            <button
              key={item.id}
              onClick={() => navigate("/" + item.id)}
              className={`
                w-full flex items-center gap-2 px-3 py-2 rounded-lg transition-colors
                ${
                  location.pathname === "/" + item.id
                    ? "bg-[#009B70] text-white"
                    : "text-gray-400 hover:bg-[#2A2B32] hover:text-white"
                }
                ${item.restricted ? "opacity-50" : ""}
                relative group
              `}
            >
              {item.icon}
              {isOpen && <span className="text-sm">{item.label}</span>}
              {item.restricted && (
                <div
                  className="absolute left-full ml-2 top-1/2 -translate-y-1/2 w-64 bg-[#202123] p-3 rounded-lg
                              border border-[#343541] shadow-lg opacity-0 group-hover:opacity-100 transition-opacity
                              pointer-events-none z-50"
                >
                  <p className="text-sm text-gray-300">
                    Cette fonctionnalité sera disponible après la validation de
                    votre compte instructeur.
                  </p>
                </div>
              )}
            </button>
          ))}
        </div>
      </div>
      {isOpenMobile && (
        <div className="h-full  absolute right-0 left-0 z-[999] flex flex-col bg-[#202123] border-r border-[#343541] mobile">
          <div className="flex-1 p-2 space-y-1">
            {menuItems.map((item: any) => (
              <button
                key={item.id}
                onClick={() => handleNavigateMobile(item.id)}
                className={`
                  w-full flex items-center gap-2 px-3 py-2 rounded-lg transition-colors
                  ${
                    location.pathname === item.id
                      ? "bg-[#009B70] text-white"
                      : "text-gray-400 hover:bg-[#2A2B32] hover:text-white"
                  }
                  ${item.restricted ? "opacity-50" : ""}
                  relative group
                `}
              >
                {item.icon}
                {isOpenMobile && <span className="text-sm">{item.label}</span>}
                {item.restricted && (
                  <div
                    className="absolute left-full ml-2 top-1/2 -translate-y-1/2 w-64 bg-[#202123] p-3 rounded-lg
                                border border-[#343541] shadow-lg opacity-0 group-hover:opacity-100 transition-opacity
                                pointer-events-none z-50"
                  >
                    <p className="text-sm text-gray-300">
                      Cette fonctionnalité sera disponible après la validation
                      de votre compte instructeur.
                    </p>
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
