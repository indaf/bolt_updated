import React, { useContext, useEffect, useState } from "react";
import { useAuthStore } from "../store/authStore";
import { useProfileStore } from "../store/profileStore";
import { PostCard } from "../components/PostCard";
import { Search } from "lucide-react";
import { DiscoverFilters } from "../components/DiscoverFilters";
import Layout from "../components/Layout";
import { AuthContext } from "../context/Auth.context";
import {
  getFriendsAchievements,
  getPublicAchievements,
} from "../services/Achievement/achievement.service";
import { AxiosResponse } from "axios";
import { notifyError } from "../helpers/Notify.helper";
import { ICON_ACHIEVEMENTS } from "../const/ACHIEVEMENT.const";

type FilterType = "all" | "suggestions" | "following" | "achievements";

export function Discover() {
  const { user } = useContext<any>(AuthContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState<FilterType>("all");
  const [activitySubscriber, setActivitySubscriber] = useState<Array<any>>([]);
  const [activityPublic, setActivityPublic] = useState<Array<any>>([]);
  const [allActivities, setAllActivities] = useState<Array<any>>([]);

  const loadPublicAchievements = () => {
    getPublicAchievements()
      .then((response: AxiosResponse) => {
        setActivityPublic(response.data);
      })
      .catch((error: any) => {
        console.error(error);
        notifyError("Erreur lors du chargement des récompenses publiques");
      });
  };

  const loadFriendsAchievements = () => {
    getFriendsAchievements()
      .then((response: AxiosResponse) => {
        setActivitySubscriber(response.data);
      })
      .catch((error: any) => {
        console.error(error);
        notifyError("Erreur lors du chargement des récompenses des abonnés");
      });
  };

  const formatAllActivities = () => {
    let all: Array<any> = [];
    if (filter === "all" || filter === "suggestions") {
      (searchTerm.length > 2
        ? activityPublic.filter(
            (activity) =>
              activity.first_name.toLowerCase().includes(searchTerm) ||
              activity.last_name.toLowerCase().includes(searchTerm)
          )
        : activityPublic
      ).forEach((post) => {
        let user = JSON.parse(JSON.stringify(post));
        delete user.achievements;
        delete user.publications;
        delete user.weapons;
        if (post.publications.length > 0) {
          post.publications.forEach((pub: any) => {
            all.push({
              type: "post",
              data: pub,
              user: user,
            });
          });
        }
      });
    }
    if (filter === "all" || filter === "following") {
      (searchTerm.length > 2
        ? activitySubscriber.filter(
            (activity) =>
              activity.first_name.toLowerCase().includes(searchTerm) ||
              activity.last_name.toLowerCase().includes(searchTerm)
          )
        : activitySubscriber
      ).forEach((post) => {
        let user = JSON.parse(JSON.stringify(post));
        delete user.achievements;
        delete user.publications;
        delete user.weapons;
        if (post.publications.length > 0) {
          post.publications.forEach((pub: any) => {
            all.push({
              type: "post",
              data: pub,
              user: user,
            });
          });
        }
      });
    }
    if (
      filter === "all" ||
      filter === "suggestions" ||
      filter === "achievements"
    ) {
      (searchTerm.length > 2
        ? activityPublic.filter(
            (activity) =>
              activity.first_name.toLowerCase().includes(searchTerm) ||
              activity.last_name.toLowerCase().includes(searchTerm)
          )
        : activityPublic
      ).forEach((achievement) => {
        let user = JSON.parse(JSON.stringify(achievement));
        delete user.achievements;
        delete user.publications;
        delete user.weapons;
        if (achievement.achievements.length > 0) {
          achievement.achievements.forEach((ach: any) => {
            all.push({
              type: "achievement",
              data: ach,
              user: user,
            });
          });
        }
      });
    }
    if (
      filter === "all" ||
      filter === "following" ||
      filter === "achievements"
    ) {
      (searchTerm.length > 2
        ? activitySubscriber.filter(
            (activity) =>
              activity.first_name.toLowerCase().includes(searchTerm) ||
              activity.last_name.toLowerCase().includes(searchTerm)
          )
        : activitySubscriber
      ).forEach((achievement) => {
        let user = JSON.parse(JSON.stringify(achievement));
        delete user.achievements;
        delete user.publications;
        delete user.weapons;
        if (achievement.achievements.length > 0) {
          achievement.achievements.forEach((ach: any) => {
            all.push({
              type: "achievement",
              data: ach,
              user: user,
            });
          });
        }
      });
    }
    setAllActivities(all);
  };

  useEffect(() => {
    loadPublicAchievements();
    loadFriendsAchievements();
  }, []);

  useEffect(() => {
    formatAllActivities();
  }, [activitySubscriber, activityPublic, filter, searchTerm]);

  return (
    <Layout pageTitle="Découvrir">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Barre de recherche */}
          <div className="flex justify-center mb-8">
            <div className="relative w-96">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Rechercher..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-[#202123] border border-gray-700 rounded-lg
                        text-sm text-white placeholder-gray-400 focus:outline-none focus:border-[#009B70]"
              />
            </div>
          </div>

          {/* Filtres */}
          <DiscoverFilters currentFilter={filter} onFilterChange={setFilter} />

          {/* Feed */}
          <div className="space-y-6">
            {allActivities.length > 0 ? (
              allActivities.map((activity) => (
                <div
                  key={`${activity.type}-${
                    activity.type === "post"
                      ? activity.data.id
                      : activity.data.id
                  }`}
                >
                  {activity.type === "post" ? (
                    <PostCard
                      refreshPublication={() => {}}
                      post={activity.data}
                      currentUserId={user.id}
                    />
                  ) : (
                    <AchievementCard
                      achievement={activity.data}
                      user={activity.user}
                    />
                  )}
                </div>
              ))
            ) : (
              <div className="bg-[#202123] rounded-lg p-8 text-center">
                <p className="text-gray-400">
                  Aucun contenu trouvé pour ce filtre
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}

function AchievementCard({
  achievement,
  user,
}: {
  achievement: any;
  user: any;
}) {
  if (!user) return null;

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "legendary":
        return "bg-yellow-500/20 text-yellow-500";
      case "epic":
        return "bg-purple-500/20 text-purple-500";
      case "rare":
        return "bg-blue-500/20 text-blue-500";
      default:
        return "bg-gray-500/20 text-gray-400";
    }
  };

  return (
    <div className="bg-[#202123] rounded-lg p-6">
      <div className="flex items-center gap-4 mb-4">
        {user.avatar ? (
          <img
            src={user.avatar}
            alt={`${user.first_name} ${user.last_name}`}
            className="w-12 h-12 rounded-full"
          />
        ) : (
          <div className="w-12 h-12 rounded-full bg-[#009B70] flex items-center justify-center">
            <span className="text-lg font-medium text-white">
              {user.first_name[0]}
              {user.last_name[0]}
            </span>
          </div>
        )}
        <div>
          <p className="text-white">
            <span className="font-medium">
              {user.first_name} {user.last_name}
            </span>{" "}
            a obtenu une nouvelle récompense
          </p>
        </div>
      </div>

      <div className={`p-4 rounded-lg ${getRarityColor(achievement.rarity)}`}>
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-lg bg-[#343541]/50 flex items-center justify-center">
            <span className="text-3xl">
              {
                ICON_ACHIEVEMENTS.filter(
                  (icon: any) => icon.type == achievement.icon
                )[0].icon
              }
            </span>
          </div>
          <div>
            <h4 className="text-lg font-medium">{achievement.title}</h4>
            <p className="text-sm opacity-80">{achievement.description}</p>
            <p className="text-xs mt-1">
              {achievement.rarity.charAt(0).toUpperCase() +
                achievement.rarity.slice(1)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
