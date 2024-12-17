import React, { useContext, useRef, useState } from "react";
import {
  Edit2,
  MapPin,
  Globe,
  Twitter,
  Linkedin,
  Instagram,
  Youtube,
} from "lucide-react";
import { AuthContext } from "../context/Auth.context";
import { addOrUpdateProfile } from "../services/Profile/profile.service";
import { AxiosResponse } from "axios";
import { notifyError, notifySuccess } from "../helpers/Notify.helper";

interface ProfileSettingsProps {
  profile: any;
  loadUserProfile: () => void;
}

export function ProfileSettings({
  profile,
  loadUserProfile,
}: ProfileSettingsProps) {
  const { user } = useContext<any>(AuthContext);
  const [bio, setBio] = useState<string>(profile.bio);
  const [website, setWebsite] = useState<string>(profile.website);
  const [location, setLocation] = useState<string>(profile.location);
  const [twitter, setTwitter] = useState<string>("");
  const [facebook, setFacebook] = useState<string>("");
  const [linkedin, setLinkedin] = useState<string>("");
  const [youtube, setYoutube] = useState<string>("");
  const [instagram, setInstagram] = useState<string>("");
  if (!user || !profile) return null;

  const isOwner = user.id === profile.user.id;

  const handleSave = () => {
    addOrUpdateProfile(profile.user.id, {
      bio,
      website,
      location,
      twitter,
      facebook,
      linkedin,
      youtube,
      instagram,
    })
      .then((response: AxiosResponse) => {
        loadUserProfile();
        notifySuccess("Profil mis à jour avec succès");
      })
      .catch((error: any) => {
        console.error(error);
        notifyError("Impossible de mettre à jour le profil");
      });
  };

  return (
    <div className="space-y-6">
      <div className="bg-[#202123] rounded-lg p-6">
        <h3 className="text-lg font-medium text-white mb-4">Bio</h3>
        <textarea
          readOnly={!isOwner}
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          placeholder="Parlez de vous..."
          className="w-full px-4 py-3 bg-[#2A2B32] border border-gray-700 rounded-lg
                   text-white placeholder-gray-400 focus:outline-none focus:border-[#009B70]
                   resize-none h-32"
        />
      </div>
      {/* Localisation */}
      <div className="bg-[#202123] rounded-lg p-6">
        <h3 className="text-lg font-medium text-white mb-4">Localisation</h3>
        <div className="flex items-center gap-3">
          <MapPin className="w-5 h-5 text-gray-400" />
          <input
            readOnly={!isOwner}
            type="text"
            value={location || ""}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Votre localisation"
            className="flex-1 px-4 py-2 bg-[#2A2B32] border border-gray-700 rounded-lg
                     text-white placeholder-gray-400 focus:outline-none focus:border-[#009B70]"
          />
        </div>
      </div>

      {/* Site web */}
      <div className="bg-[#202123] rounded-lg p-6">
        <h3 className="text-lg font-medium text-white mb-4">Site web</h3>
        <div className="flex items-center gap-3">
          <Globe className="w-5 h-5 text-gray-400" />
          <input
            readOnly={!isOwner}
            type="url"
            value={website || ""}
            onChange={(e) => setWebsite(e.target.value)}
            placeholder="https://votre-site.com"
            className="flex-1 px-4 py-2 bg-[#2A2B32] border border-gray-700 rounded-lg
                     text-white placeholder-gray-400 focus:outline-none focus:border-[#009B70]"
          />
        </div>
      </div>

      {/* Réseaux sociaux */}
      <div className="bg-[#202123] rounded-lg p-6">
        <h3 className="text-lg font-medium text-white mb-4">Réseaux sociaux</h3>
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Twitter className="w-5 h-5 text-gray-400" />
            <input
              readOnly={!isOwner}
              type="url"
              value={twitter || ""}
              onChange={(e) => setTwitter(e.target.value)}
              placeholder="URL Twitter"
              className="flex-1 px-4 py-2 bg-[#2A2B32] border border-gray-700 rounded-lg
                       text-white placeholder-gray-400 focus:outline-none focus:border-[#009B70]"
            />
          </div>
          <div className="flex items-center gap-3">
            <Linkedin className="w-5 h-5 text-gray-400" />
            <input
              readOnly={!isOwner}
              type="url"
              value={linkedin || ""}
              onChange={(e) => setLinkedin(e.target.value)}
              placeholder="URL LinkedIn"
              className="flex-1 px-4 py-2 bg-[#2A2B32] border border-gray-700 rounded-lg
                       text-white placeholder-gray-400 focus:outline-none focus:border-[#009B70]"
            />
          </div>
          <div className="flex items-center gap-3">
            <Instagram className="w-5 h-5 text-gray-400" />
            <input
              readOnly={!isOwner}
              type="url"
              value={instagram || ""}
              onChange={(e) => setInstagram(e.target.value)}
              placeholder="URL Instagram"
              className="flex-1 px-4 py-2 bg-[#2A2B32] border border-gray-700 rounded-lg
                       text-white placeholder-gray-400 focus:outline-none focus:border-[#009B70]"
            />
          </div>
          <div className="flex items-center gap-3">
            <Youtube className="w-5 h-5 text-gray-400" />
            <input
              readOnly={!isOwner}
              type="url"
              value={youtube || ""}
              onChange={(e) => setYoutube(e.target.value)}
              placeholder="URL YouTube"
              className="flex-1 px-4 py-2 bg-[#2A2B32] border border-gray-700 rounded-lg
                       text-white placeholder-gray-400 focus:outline-none focus:border-[#009B70]"
            />
          </div>
        </div>
      </div>
      {isOwner && (
        <button
          onClick={() => handleSave()}
          className={`
                  flex items-center gap-2 px-4 py-1.5 rounded-lg transition-colors text-sm bg-[#009B70]`}
        >
          Enregistrer
        </button>
      )}
    </div>
  );
}
