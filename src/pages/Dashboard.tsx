import React, { useContext, useEffect, useState } from "react";
import { NewPost } from "../components/NewPost";
import { PostCard } from "../components/PostCard";
import { AuthContext } from "../context/Auth.context";
import Layout from "../components/Layout";
import { getAllPublications } from "../services/Publication/publication.service";
import { AxiosResponse } from "axios";
import { notifyError } from "../helpers/Notify.helper";

export function Dashboard() {
  const { user } = useContext<any>(AuthContext);
  const [allPosts, setAllPosts] = useState<any>([]);

  useEffect(() => {
    if (user) {
      loadPublications();
    }
  }, [user]);

  const loadPublications = () => {
    getAllPublications()
      .then((response: AxiosResponse) => {
        setAllPosts(response.data);
      })
      .catch((error: any) => {
        console.error(error);
        notifyError("Erreur lors du chargement des publications");
      });
  };

  if (!user) {
    return (
      <Layout pageTitle="Dashboard">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h2 className="text-xl font-semibold text-white mb-2">
              Connexion requise
            </h2>
            <p className="text-gray-400 text-sm">
              Veuillez vous connecter pour accéder au fil d'actualités
            </p>
          </div>
        </div>
      </Layout>
    );
  }

  // Récupérer tous les posts de tous les utilisateurs

  // Trier les posts par date (plus récents en premier)
  const sortedPosts = allPosts.sort(
    (a: any, b: any) => b.created_at - a.created_at
  );

  return (
    <Layout pageTitle="Dashboard">
      <div className="container mx-auto px-4 py-8 ">
        <div className="mx-auto ">
          {/* Zone de création de post */}
          <div className="mb-8">
            <NewPost refreshPublication={loadPublications} userId={user.id} />
          </div>
          {/* Fil d'actualités */}
          <div className="space-y-6">
            {sortedPosts.length > 0 ? (
              sortedPosts.map((post: any) => (
                <PostCard
                  refreshPublication={loadPublications}
                  key={post.id}
                  post={post}
                  currentUserId={user.id}
                />
              ))
            ) : (
              <div className="bg-[#202123] rounded-lg p-8 text-center">
                <p className="text-gray-400">
                  Aucune publication pour le moment
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
