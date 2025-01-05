import React, { useContext, useEffect, useState } from "react";
import { PostCard } from "../components/PostCard";
import Layout from "../components/Layout";
import { AuthContext } from "../context/Auth.context";
import { AxiosResponse } from "axios";
import { notifyError } from "../helpers/Notify.helper";
import { getUserProfile } from "../services/Profile/profile.service";
import { useParams } from "react-router-dom";
import { getPublicationById } from "../services/Publication/publication.service";

export function DetailPost() {
  const { user } = useContext<any>(AuthContext);
  const [profile, setProfile] = useState<any>(null);
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<any>(null);

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

  const loadPublication = () => {
    if (id) {
      getPublicationById(+id)
        .then((response: AxiosResponse) => {
          setPost(response.data);
        })
        .catch((error: any) => {
          console.error(error);
          notifyError("Erreur lors de la récupération de la publication");
        });
    }
  };

  useEffect(() => {
    loadCurrentUserProfile();
  }, []);

  useEffect(() => {
    loadPublication();
  }, [id]);

  return (
    <Layout pageTitle="Accueil">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {post ? (
            <div className="space-y-6">
              <PostCard
                key={post.id}
                refreshPublication={() => {
                  loadCurrentUserProfile();
                  loadPublication();
                }}
                post={post}
                currentUserId={user.id}
                currentUserProfile={profile}
              />
            </div>
          ) : (
            <div className="bg-[#202123] rounded-lg p-8 text-center">
              <p className="text-gray-400">
                La publication est introuvable ou a été supprimée
              </p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
