import React, { useContext, useEffect, useState } from "react";
import { useAuthStore } from "../store/authStore";
import { useProfileStore } from "../store/profileStore";
import {
  Edit2,
  Twitter,
  Linkedin,
  Instagram,
  Youtube,
  Camera,
  EyeOff,
  Eye,
} from "lucide-react";
import { EditProfileModal } from "./EditProfileModal";
import { ProfileActions } from "./ProfileActions";
import { AuthContext } from "../context/Auth.context";
import {
  addFriend,
  removeFriend,
  updateFriendRequest,
} from "../services/Friend/friend.service";
import { AxiosResponse } from "axios";
import { notifyError, notifySuccess } from "../helpers/Notify.helper";
import { updateUser, updateUserById } from "../services/Auth/Auth.service";

interface ProfileHeaderProps {
  userId: number;
  profile: any;
  loadUserProfile: () => void;
}

export function ProfileHeader({
  userId,
  profile,
  loadUserProfile,
}: ProfileHeaderProps) {
  const { user, retrieveUser } = useContext<any>(AuthContext);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editType, setEditType] = useState<"banner" | "avatar">("banner");
  const [isOwnProfile, setIsOwnProfile] = useState<boolean>(false);
  const [isFriend, setIsFriend] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);

  if (!user || !profile) return null;
  useEffect(() => {
    setIsOwnProfile(profile.user.id == user.id);
    setIsFriend(
      user.id != userId &&
        profile.user.friend.filter((u: any) => u.user == user.id).length > 0
    );
    setIsMuted(
      user.id != userId &&
        profile.user.friend.filter(
          (u: any) => u.user == user.id && u.is_sourdine == true
        ).length > 0
    );
  }, [profile]);

  const handleMessage = () => {
    // Implémenter la logique de messagerie
    //TODO
  };

  const handleFriendAction = () => {
    if (isFriend) {
      removeFriend(userId)
        .then((_: AxiosResponse) => {
          loadUserProfile();
          notifySuccess("Abonnement supprimé");
        })
        .catch((error: any) => {
          console.error(error);
          notifyError("Impossible de supprimer cet ami");
        });
    } else {
      addFriend({ friend: userId })
        .then((_: AxiosResponse) => {
          loadUserProfile();
        })
        .catch((error: any) => {
          console.error(error);
          notifyError("Impossible d'ajouter cet utilisateur en ami");
        });
    }
  };

  const handleSourdine = () => {
    let friend_item = profile.user.friend.filter((u: any) => u.user == user.id);

    if (friend_item.length > 0) {
      updateFriendRequest(friend_item[0].id, {
        is_sourdine: !friend_item[0].is_sourdine,
      })
        .then((response: AxiosResponse) => {
          loadUserProfile();
        })
        .catch((error: any) => {
          console.error(error);
          notifyError("Impossible de modifier la sourdine.");
        });
    }
  };

  const updateProfileStatus = () => {
    updateUserById(user.id, { is_public: !user.is_public })
      .then((response: AxiosResponse) => {
        retrieveUser();
        notifySuccess("Visibilité du profil modifiée avec succès.");
      })
      .catch((error: any) => {
        console.error(error);
        notifyError("Impossible de modifier la visibilité.");
      });
  };

  const handleEdit = (type: "banner" | "avatar") => {
    setEditType(type);
    setShowEditModal(true);
  };

  return (
    <div className="relative mb-8">
      {/* Bannière */}
      <div className="h-64 rounded-lg overflow-hidden">
        {profile.banner_image ? (
          <img
            src={import.meta.env.VITE_SERVICE_API_URL + profile.banner_image}
            alt="Bannière"
            className="w-full h-full object-cover"
            style={
              profile.banner_position_x && profile.banner_position_y
                ? {
                    objectPosition: `${profile.banner_position_x}% ${profile.banner_position_y}%`,
                  }
                : undefined
            }
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-r from-[#009B70] to-[#DC002B]" />
        )}
      </div>

      {/* Photo de profil et informations */}
      <div className="absolute left-12 top-1/2 -translate-y-1/2 flex flex-col items-center">
        <div className="relative">
          <div className="relative w-32 h-32 rounded-full border-2 border-black overflow-hidden bg-[#009B70]">
            {profile.user.avatar ? (
              <img
                src={import.meta.env.VITE_SERVICE_API_URL + profile.user.avatar}
                alt={`${profile.user.first_name} ${profile.user.last_name}`}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <span className="text-3xl font-medium text-white">
                  {profile.user.first_name[0]}
                  {profile.user.last_name[0]}
                </span>
              </div>
            )}
            {isOwnProfile && (
              <button
                onClick={() => handleEdit("avatar")}
                className="absolute bottom-0 inset-x-0 h-8 bg-black/60 flex items-center justify-center
                         hover:bg-black/80 transition-colors group"
              >
                <Camera className="w-4 h-4 text-white" />
              </button>
            )}
          </div>
          <div className="text-center mt-2">
            <h2 className="text-xl font-bold text-white drop-shadow-lg">
              {profile.user.first_name} {profile.user.last_name}
            </h2>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="absolute right-8 top-8 flex items-center gap-3">
        {isOwnProfile ? (
          <>
            <button
              title={
                user.is_public == true
                  ? "Rendre le profil privé"
                  : "Rendre le profil public"
              }
              onClick={updateProfileStatus}
              className={`
          p-2 rounded-lg transition-colors
          ${
            user.is_public == true
              ? "bg-red-500 text-white hover:bg-red-600"
              : "bg-[#343541] text-white hover:bg-[#2A2B32]"
          }
        `}
            >
              {user.is_public == true ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </button>{" "}
            <button
              onClick={() => handleEdit("banner")}
              className="flex items-center gap-2 px-4 py-2 bg-[#343541] text-white rounded-lg
                      hover:bg-[#2A2B32] transition-colors"
            >
              <Edit2 className="w-4 h-4" />
              Modifier la bannière
            </button>
          </>
        ) : (
          <ProfileActions
            isMuted={isMuted}
            isOwnProfile={isOwnProfile}
            isFriend={isFriend}
            hasPendingRequest={false}
            onSourdineAction={handleSourdine}
            onMessage={handleMessage}
            onFriendAction={handleFriendAction}
          />
        )}
      </div>

      {/* Statistiques et réseaux sociaux */}
      <div className="flex items-center justify-between mt-4 px-8">
        <div className="flex items-center gap-8">
          <div className="text-center">
            <p className="text-lg font-bold text-white">
              {profile.user.publications.length}
            </p>
            <p className="text-sm text-gray-300 font-bebas tracking-wider">
              Publications
            </p>
          </div>
          <div className="text-center">
            <p className="text-lg font-bold text-white">
              {
                profile.user.friend.filter((f: any) => f.subscriber == true)
                  .length
              }
            </p>
            <p className="text-sm text-gray-300 font-bebas tracking-wider">
              Abonnés
            </p>
          </div>
          <div className="text-center">
            <p className="text-lg font-bold text-white">
              {
                profile.user.user_friends.filter(
                  (f: any) => f.subscriber == true
                ).length
              }
            </p>
            <p className="text-sm text-gray-300 font-bebas tracking-wider">
              Abonnements
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {profile.twitter && (
            <a
              href={profile.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
            >
              <Twitter className="w-5 h-5" />
            </a>
          )}
          {profile.linkedin && (
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
            >
              <Linkedin className="w-5 h-5" />
            </a>
          )}
          {profile.instagram && (
            <a
              href={profile.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
            >
              <Instagram className="w-5 h-5" />
            </a>
          )}
          {profile.youtube && (
            <a
              href={profile.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
            >
              <Youtube className="w-5 h-5" />
            </a>
          )}
        </div>
      </div>

      <EditProfileModal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        userId={profile.user.id}
        profile={profile}
        editType={editType}
        loadUserProfile={loadUserProfile}
      />
    </div>
  );
}
