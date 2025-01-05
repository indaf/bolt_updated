import React, { useState, useEffect, useContext } from "react";
import { ProfileHeader } from "../components/ProfileHeader";
import { ProfileTabs } from "../components/ProfileTabs";
import { AchievementsCarousel } from "../components/AchievementsCarousel";
import { ProfilePosts } from "../components/ProfilePosts";
import { ProfileAchievements } from "../components/ProfileAchievements";
import { ProfileSetup } from "../components/ProfileSetup";
import { ProfileSettings } from "../components/ProfileSettings";
import Layout from "../components/Layout";
import { AuthContext } from "../context/Auth.context";
import { useParams } from "react-router-dom";
import { getUserProfile } from "../services/Profile/profile.service";
import { notifyError } from "../helpers/Notify.helper";
import { AxiosResponse } from "axios";
import { ProfileSavedPosts } from "../components/ProfileSavedPosts";

export function UserProfile() {
  const { user } = useContext<any>(AuthContext);
  const [profile, setProfile] = useState<any>(null);
  const [userId, setUserId] = useState<number>(-1);
  const params = useParams();
  const [isFriendOrPublic, setIsFriendOrPublic] = useState<boolean>(false);

  const [activeTab, setActiveTab] = useState<
    "posts" | "achievements" | "setup" | "settings" | "bookmark"
  >("posts");

  useEffect(() => {
    if (params.id) {
      setUserId(+params.id);
    }
  }, [params]);

  useEffect(() => {
    if (userId === -1) return;
    loadUserProfile();
  }, [userId]);

  const loadUserProfile = () => {
    getUserProfile(userId)
      .then((response: AxiosResponse) => {
        setProfile(response.data.profile);
      })
      .catch((error: any) => {
        console.error(error);
        notifyError("Impossible de charger le profil");
      });
  };

  useEffect(() => {
    if (!profile || !user) return;
    setIsFriendOrPublic(
      (user.id != userId &&
        profile.user.friend.filter(
          (u: any) => u.user == user.id && u.status == "accepted"
        ).length > 0) ||
        profile.user.is_public ||
        user.id == userId
    );
  }, [profile, userId, user]);

  if (!user || !profile) return null;

  const renderTabContent = () => {
    switch (activeTab) {
      case "posts":
        return (
          <ProfilePosts profile={profile} loadUserProfile={loadUserProfile} />
        );
      case "achievements":
        return <ProfileAchievements profile={profile} />;
      case "setup":
        return (
          <ProfileSetup profile={profile} loadUserProfile={loadUserProfile} />
        );
      case "settings":
        return (
          <ProfileSettings
            profile={profile}
            loadUserProfile={loadUserProfile}
          />
        );
      case "bookmark":
        return (
          <ProfileSavedPosts
            profile={profile}
            currentUserId={user.id}
            refreshPublication={loadUserProfile}
          />
        );
    }
  };

  return (
    <Layout pageTitle={`Profil de ${user.first_name} ${user.last_name}`}>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <ProfileHeader
            userId={userId}
            profile={profile}
            loadUserProfile={loadUserProfile}
          />

          {profile.user.achievements?.length > 0 && (
            <AchievementsCarousel achievements={profile.user.achievements} />
          )}
          {isFriendOrPublic == true ? (
            <>
              <ProfileTabs activeTab={activeTab} onTabChange={setActiveTab} />

              {renderTabContent()}
            </>
          ) : (
            <div className="w-full flex justify-center items-center h-[100px] text-white">
              <p>Ce profil est privé.</p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
