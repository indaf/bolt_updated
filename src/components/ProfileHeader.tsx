import React, { useContext, useState } from "react";
import {
  Edit2,
  Twitter,
  Linkedin,
  Instagram,
  Youtube,
  Camera,
  EyeOff,
  Eye,
  Link2,
} from "lucide-react";
import { ProfileActions } from "./ProfileActions";
import { EditProfileModal } from "./EditProfileModal";
import { AuthContext } from "../context/Auth.context";
import { ExperienceBar } from "./ExperienceBar";
import { updateUserById } from "../services/Auth/Auth.service";
import { AxiosResponse } from "axios";
import { notifyError, notifySuccess } from "../helpers/Notify.helper";
import {
  addFriend,
  removeFriend,
  updateFriendRequest,
} from "../services/Friend/friend.service";

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
  const [editType, setEditType] = useState<"avatar">("avatar");
  const [isOwnProfile, setIsOwnProfile] = useState<boolean>(false);
  const [isFriend, setIsFriend] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);

  if (!user || !profile) return null;

  React.useEffect(() => {
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

  const handleEdit = (type: "avatar") => {
    setEditType(type);
    setShowEditModal(true);
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

  return (
    <div className="bg-[#202123] rounded-lg p-8 relative mb-8">
      <div className="flex flex-col md:flex-row items-center gap-8">
        {/* Avatar */}
        <div className="relative">
          <div className="w-32 h-32 rounded-full overflow-hidden bg-[#009B70] ring-4 ring-[#131415]">
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
          </div>
          {isOwnProfile && (
            <button
              onClick={() => handleEdit("avatar")}
              className="absolute bottom-0 right-0 w-8 h-8 bg-[#009B70] rounded-full flex items-center justify-center
                       hover:bg-[#007B56] transition-colors"
            >
              <Camera className="w-4 h-4 text-white" />
            </button>
          )}
        </div>

        {/* Info */}
        <div className="flex-1">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-4">
            <div className="text-center md:text-left">
              <div className="flex items-center gap-3">
                <h1 className="text-2xl font-bold text-white">
                  {profile.user.first_name} {profile.user.last_name}
                </h1>
                <ExperienceBar level={profile.user?.level} />
              </div>
              <div className="inline-flex items-center px-2 py-1 bg-[#343541] rounded-full mt-1">
                <span className="text-sm text-gray-400">
                  @{profile.user?.tag_name}
                </span>
              </div>
              {profile.bio && (
                <p className="text-gray-400 mt-2 max-w-lg">{profile.bio}</p>
              )}
              {profile.location && (
                <p className="text-gray-500 text-sm mt-1">{profile.location}</p>
              )}
              {profile.website && (
                <a
                  target="_blank"
                  className="text-sm mt-1 flex gap-2 underline text-[#009B70]"
                  href={profile.website}
                >
                  {profile.website}{" "}
                </a>
              )}
            </div>

            <div className="flex-1" />
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
              </>
            ) : (
              <ProfileActions
                isMuted={isMuted}
                isOwnProfile={isOwnProfile}
                isFriend={isFriend}
                hasPendingRequest={false}
                onSourdineAction={handleSourdine}
                onMessage={() => {}}
                onFriendAction={handleFriendAction}
              />
            )}
          </div>

          {/* Stats */}
          <div className="flex items-center gap-8 mt-6 justify-center md:justify-start">
            <div className="text-center">
              <p className="text-lg font-bold text-white">
                {profile.user.publications.length}
              </p>
              <p className="text-sm text-gray-400">Publications</p>
            </div>
            <div className="text-center">
              <p className="text-lg font-bold text-white">
                {
                  profile.user.friend.filter((f: any) => f.subscriber == true)
                    .length
                }
              </p>
              <p className="text-sm text-gray-400">Abonnés</p>
            </div>
            <div className="text-center">
              <p className="text-lg font-bold text-white">
                {
                  profile.user.user_friends.filter(
                    (f: any) => f.subscriber == true
                  ).length
                }
              </p>
              <p className="text-sm text-gray-400">Abonnements</p>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4 mt-6 justify-center md:justify-start">
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
