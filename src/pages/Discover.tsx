import React, { useContext, useEffect, useRef, useState } from "react";
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
import { getUserProfile } from "../services/Profile/profile.service";
import { searchProfile } from "../services/Auth/Auth.service";
import { useNavigate } from "react-router-dom";
import { searchPostTags } from "../services/PostTags/PostTags.service";
import { useLocation } from "react-router-dom";

type FilterType = "all" | "suggestions" | "following" | "achievements";

export function Discover() {
  const { user } = useContext<any>(AuthContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState<FilterType>("all");
  const [activitySubscriber, setActivitySubscriber] = useState<Array<any>>([]);
  const [activityPublic, setActivityPublic] = useState<Array<any>>([]);
  const [allActivities, setAllActivities] = useState<Array<any>>([]);
  const [profile, setProfile] = useState<any>(null);
  const toSearch = useRef<any>(null);
  const [foundProfile, setFoundProfile] = useState<Array<any>>([]);
  const [foundTags, setFoundTags] = useState<Array<any>>([]);
  const navigate = useNavigate();

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const tagParam = queryParams.get("tag");
  const tagParamName = queryParams.get("tagname");

  const loadCurrentUserProfile = () => {
    if (user) {
      getUserProfile(user.id)
        .then((response: AxiosResponse) => {
          setProfile(response.data.profile);
        })
        .catch((error: any) => {
          console.error(error);
          notifyError("Erreur lors de la récupération de votre profil");
        });
    }
  };

  useEffect(() => {
    setFoundProfile([]);
    setFoundTags([]);
    if (searchTerm[0] == "@") {
      if (searchTerm.length > 3) {
        clearTimeout(toSearch.current);
        toSearch.current = setTimeout(() => {
          clearTimeout(toSearch.current);
          searchProfile(searchTerm.slice(1))
            .then((response: AxiosResponse) => {
              setFoundProfile(response.data);
            })
            .catch((error: any) => {
              console.error(error);
              notifyError("Erreur lors de la recherche de profil");
            });
        }, 500);
      }
    } else if (searchTerm[0] == "#") {
      if (searchTerm.length > 3) {
        clearTimeout(toSearch.current);
        toSearch.current = setTimeout(() => {
          clearTimeout(toSearch.current);
          searchPostTags(searchTerm)
            .then((response: AxiosResponse) => {
              setFoundTags(response.data);
            })
            .catch((error: any) => {
              console.error(error);
              notifyError("Erreur lors de la recherche de profil");
            });
        }, 500);
      } else {
        clearTimeout(toSearch.current);
      }
    }
  }, [searchTerm]);

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
              id: pub.id,
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
              id: pub.id,
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
              id: ach.id,
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
              id: ach.id,
              type: "achievement",
              data: ach,
              user: user,
            });
          });
        }
      });
    }

    let uniqueActivities = all.filter(
      (activity, index, self) =>
        index ===
        self.findIndex((a) => a.id === activity.id && a.type === activity.type)
    );
    if (tagParam) {
      uniqueActivities = uniqueActivities.filter(
        (activity) =>
          activity.data?.tags?.filter((tag: any) => tag.id == tagParam).length >
          0
      );
    }
    setAllActivities(uniqueActivities);
  };

  useEffect(() => {
    loadPublicAchievements();
    loadFriendsAchievements();
    loadCurrentUserProfile();
  }, []);

  useEffect(() => {
    setAllActivities([]);
    formatAllActivities();
  }, [activitySubscriber, activityPublic, filter, searchTerm, tagParam]);

  return (
    <Layout pageTitle="Accueil">
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
              {searchTerm.length > 3 && foundProfile.length > 0 && (
                <div className="absolute top-full bg-[#202123] w-full h-[500px] rounded-xl">
                  {foundProfile.map((profile: any) => (
                    <div
                      key={profile.id}
                      onClick={() => navigate(`/profile/${profile.id}`)}
                      className="flex items-center gap-4 p-4 border-b cursor-pointer hover:bg-[#343541] border-b-[#343541]"
                    >
                      <img
                        src={
                          import.meta.env.VITE_SERVICE_API_URL + profile.avatar
                        }
                        alt={`${profile.first_name} ${profile.last_name}`}
                        className="w-12 h-12 rounded-full"
                      />
                      <div>
                        <p className="text-white">
                          <span className="font-medium">
                            {profile.first_name} {profile.last_name}
                          </span>
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {searchTerm.length > 3 && foundTags.length > 0 && (
                <div className="absolute top-full bg-[#202123] w-full h-[500px] rounded-xl">
                  {foundTags.map((tag: any) => (
                    <div
                      key={tag.id}
                      onClick={() => {
                        navigate(
                          `/discover?tag=${tag.id}&tagname=${tag.name.slice(1)}`
                        );
                        setFoundTags([]);
                        setSearchTerm("");
                      }}
                      className="flex items-center gap-4 p-4 border-b cursor-pointer hover:bg-[#343541] border-b-[#343541]"
                    >
                      <div>
                        <p className="text-white">
                          <span className="font-medium">{tag.name}</span>
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Filtres */}
          <DiscoverFilters currentFilter={filter} onFilterChange={setFilter} />
          {tagParam && (
            <div className="flex w-full">
              <div className="flex items-center py-1 px-2 rounded-lg text-xs mb-4 text-white/20 italic gap-10">
                <span className="">
                  Résultats de recherche pour : #{tagParamName}
                </span>
                <span
                  className="underline cursor-pointer hover:text-white/50"
                  onClick={() => navigate("/discover")}
                >
                  Réinitialiser la recherche
                </span>
              </div>
            </div>
          )}
          {/* Feed */}
          <div className="space-y-6">
            {allActivities.length > 0 ? (
              allActivities
                .sort((a, b) =>
                  new Date(a.data.created_at).getTime() <
                  new Date(b.data.created_at).getTime()
                    ? 1
                    : -1
                )
                .map((activity) => (
                  <div
                    key={`${activity.type}-${
                      activity.type === "post"
                        ? activity.data.id
                        : activity.data.id
                    }`}
                  >
                    {activity.type === "post" ? (
                      <PostCard
                        key={activity.id}
                        refreshPublication={() => {
                          loadCurrentUserProfile();
                          loadPublicAchievements();
                          loadFriendsAchievements();
                        }}
                        post={activity.data}
                        currentUserId={user.id}
                        currentUserProfile={profile}
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
            src={import.meta.env.VITE_SERVICE_API_URL + user.avatar}
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
