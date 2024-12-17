import React, { useState, useRef, useContext } from "react";
import { X, Upload, Move, Check, Trash2 } from "lucide-react";
import { useAuthStore } from "../store/authStore";
import { useProfileStore } from "../store/profileStore";
import { AuthContext } from "../context/Auth.context";
import { addOrUpdateProfile } from "../services/Profile/profile.service";
import { addMedia } from "../services/Media/media.service";
import { AxiosResponse } from "axios";
import { notifyError, notifySuccess } from "../helpers/Notify.helper";
import {
  updateUserById,
  updateUserPassword,
} from "../services/Auth/Auth.service";
import Spinner from "./Spinner";

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  userId: number;
  profile: any;
  loadUserProfile: () => void;
}

export function EditProfileModal({
  isOpen,
  onClose,
  userId,
  loadUserProfile,
  profile,
}: EditProfileModalProps) {
  const [bannerFile, setBannerFile] = useState<File | null>(null);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [bannerPreview, setBannerPreview] = useState<string>("");
  const [avatarPreview, setAvatarPreview] = useState<string>("");
  const [isDraggingBanner, setIsDraggingBanner] = useState(false);
  const [bannerPosition, setBannerPosition] = useState({ x: 50, y: 50 }); // en pourcentage
  const bannerRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  if (!isOpen || !profile.user || !profile) return null;

  const handleBannerUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setBannerFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setBannerPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatarFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleBannerDrag = (e: React.MouseEvent) => {
    if (!isDraggingBanner || !bannerRef.current) return;

    const rect = bannerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    setBannerPosition({
      x: Math.max(0, Math.min(100, x)),
      y: Math.max(0, Math.min(100, y)),
    });
  };

  const handleSave = async () => {
    // Dans une vraie application, vous devriez uploader les fichiers vers un serveur
    // et obtenir les URLs des images avant de mettre à jour le profil
    setIsLoading(true);
    let bannerResp;
    let avatarResp;
    if (bannerFile) {
      let fm = new FormData();
      fm.append("file", bannerFile);
      fm.append("type", "image");
      const banner = await addMedia(fm);
      bannerResp = await addOrUpdateProfile(profile.user.id, {
        banner_image: banner.data.media.url,
        banner_position_x: bannerPosition.x,
        banner_position_y: bannerPosition.y,
      });
    }
    if (avatarFile) {
      let fm = new FormData();
      fm.append("file", avatarFile);
      fm.append("type", "image");
      const avatar = await addMedia(fm);
      avatarResp = await updateUserById(profile.user.id, {
        avatar: avatar.data.media.url,
      });
    }
    let hasError = false;
    if (avatarResp && avatarResp.status !== 201) {
      hasError = true;
    }
    if (bannerResp && bannerResp.status !== 200) {
      hasError = true;
    }
    setIsLoading(false);
    if (hasError) {
      notifyError("Erreur lors de la mise à jour des images");
      return;
    } else {
      notifySuccess("Images mises à jour avec succès");
    }
    onClose();
    loadUserProfile();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[100] p-4 overflow-y-auto">
      <Spinner isLoading={isLoading} />
      <div className="bg-[#202123] rounded-lg w-full max-w-4xl my-auto relative">
        <div className="p-6 max-h-[90vh] overflow-y-auto">
          <button
            onClick={onClose}
            className="absolute right-4 top-4 text-gray-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>

          <h2 className="text-xl font-semibold text-white mb-6">
            Modifier les photos
          </h2>

          <div className="space-y-8">
            {/* Bannière */}
            <div>
              <h3 className="text-lg font-medium text-white mb-2">
                Photo de bannière
              </h3>
              <p className="text-sm text-gray-400 mb-4">
                Taille recommandée : 1500x500 pixels
              </p>

              <div
                ref={bannerRef}
                className="relative h-64 rounded-lg overflow-hidden bg-[#2A2B32] mb-4"
                onMouseMove={handleBannerDrag}
                onMouseDown={() => setIsDraggingBanner(true)}
                onMouseUp={() => setIsDraggingBanner(false)}
                onMouseLeave={() => setIsDraggingBanner(false)}
              >
                {bannerPreview || profile.banner_image ? (
                  <img
                    src={
                      bannerPreview ||
                      import.meta.env.VITE_SERVICE_API_URL +
                        profile.banner_image
                    }
                    alt="Bannière"
                    className="w-full h-full object-cover"
                    style={{
                      objectPosition: `${bannerPosition.x}% ${bannerPosition.y}%`,
                    }}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Upload className="w-8 h-8 text-gray-400" />
                  </div>
                )}

                {(bannerPreview ||
                  import.meta.env.VITE_SERVICE_API_URL +
                    profile.bannerImage) && (
                  <div className="absolute inset-0 bg-black/50 opacity-0 hover:opacity-100 transition-opacity">
                    <div className="absolute inset-0 flex items-center justify-center gap-4">
                      <Move className="w-8 h-8 text-white" />
                      <span className="text-white">
                        Déplacez l'image pour ajuster la position
                      </span>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex gap-4">
                <label className="flex-1">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleBannerUpload}
                    className="hidden"
                  />
                  <div
                    className="flex items-center justify-center gap-2 px-4 py-2 bg-[#343541] text-white rounded-lg
                               hover:bg-[#3E3F4B] transition-colors cursor-pointer"
                  >
                    <Upload className="w-4 h-4" />
                    {bannerPreview
                      ? "Changer la bannière"
                      : "Ajouter une bannière"}
                  </div>
                </label>
                {(bannerPreview ||
                  import.meta.env.VITE_SERVICE_API_URL +
                    profile.banner_image) && (
                  <button
                    onClick={() => {
                      setBannerPreview("");
                      setBannerFile(null);
                    }}
                    className="px-4 py-2 text-red-500 hover:text-red-400 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

            {/* Avatar */}
            <div>
              <h3 className="text-lg font-medium text-white mb-2">
                Photo de profil
              </h3>
              <p className="text-sm text-gray-400 mb-4">
                Taille recommandée : 400x400 pixels
              </p>

              <div className="flex items-center gap-6 mb-4">
                <div className="relative">
                  <div className="w-32 h-32 rounded-full overflow-hidden bg-[#2A2B32]">
                    {avatarPreview || profile.user.avatar ? (
                      <img
                        src={
                          avatarPreview ||
                          import.meta.env.VITE_SERVICE_API_URL +
                            profile.user.avatar
                        }
                        alt="Avatar"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Upload className="w-8 h-8 text-gray-400" />
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex-1">
                  <label className="flex-1">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleAvatarUpload}
                      className="hidden"
                    />
                    <div
                      className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-[#343541] text-white rounded-lg
                                 hover:bg-[#3E3F4B] transition-colors cursor-pointer"
                    >
                      <Upload className="w-4 h-4" />
                      {avatarPreview ? "Changer la photo" : "Ajouter une photo"}
                    </div>
                  </label>
                  {(avatarPreview ||
                    import.meta.env.VITE_SERVICE_API_URL +
                      profile.user.avatar) && (
                    <button
                      onClick={() => {
                        setAvatarPreview("");
                        setAvatarFile(null);
                      }}
                      className="ml-4 px-4 py-2 text-red-500 hover:text-red-400 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-8">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm text-gray-400 hover:text-white transition-colors"
            >
              Annuler
            </button>
            <button
              onClick={handleSave}
              className="flex items-center gap-2 px-4 py-2 text-sm bg-[#009B70] text-white rounded-lg
                       hover:bg-[#007B56] transition-colors"
            >
              <Check className="w-4 h-4" />
              Enregistrer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
