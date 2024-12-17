import React, { useContext, useEffect, useState } from "react";
import { File, Plus } from "lucide-react";
import { useAuthStore } from "../store/authStore";
import { useCourseStore } from "../store/courseStore";
import { CourseItem } from "../types/course";
import { SEOHelmet } from "../components/SEOHelmet";
import { CourseList } from "../components/CourseList";
import { CourseContent } from "../components/CourseContent";
import { DeleteCourseModal } from "../components/DeleteCourseModal";
import { AddCourseModal } from "../components/AddCourseModal";
import { CourseSections } from "../components/CourseSections";
import Layout from "../components/Layout";
import { AuthContext } from "../context/Auth.context";
import {
  addCourse,
  deleteCourseById,
  getAllCourses,
  updateCourseById,
} from "../services/Course/course.service";
import { AxiosResponse } from "axios";
import { notifyError, notifySuccess } from "../helpers/Notify.helper";

export default function Courses() {
  const { user } = useContext<any>(AuthContext);
  const [selectedItem, setSelectedItem] = useState<any | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [courses, setCourses] = useState<Array<any>>([]);
  const [showDeleteModal, setShowDeleteModal] = useState<number | null>(null);
  const [activeSection, setActiveSection] = useState<"public" | "private">(
    "public"
  );
  const loadAllCourses = () => {
    getAllCourses()
      .then((response: AxiosResponse) => {
        setCourses(response.data);
      })
      .catch((error: any) => {
        console.error(error);
        notifyError(
          "Une erreur s'est produite lors du chargement des articles."
        );
      });
  };

  useEffect(() => {
    loadAllCourses();
  }, []);

  if (!user) return null;

  const isAdmin =
    user.groups.filter((group: any) => group.name === "admin").length > 0;

  const handleAddArticle = (data: { name: string; is_private: boolean }) => {
    const newArticle = {
      name: data.name,
      is_private: data.is_private,
      content: "",
    };
    addCourse(newArticle)
      .then((_: AxiosResponse) => {
        loadAllCourses();
      })
      .catch((error: any) => {
        console.error(error);
        notifyError("Une erreur s'est produite lors de l'ajout de l'article.");
      });
    setShowAddModal(false);
  };

  const handleDeleteArticle = (id: number) => {
    if (selectedItem?.id === id) {
      setSelectedItem(null);
    }
    deleteCourseById(id)
      .then((_: AxiosResponse) => {
        notifySuccess("L'article a été supprimé avec succès.");
        loadAllCourses();
      })
      .catch((error: any) => {
        console.error(error);
        notifyError(
          "Une erreur s'est produite lors de la suppression de l'article."
        );
      });
    setShowDeleteModal(null);
  };

  const handleEditArticle = (id: number, data: Partial<CourseItem>) => {
    updateCourseById(id, data)
      .then((_: AxiosResponse) => {
        notifySuccess("L'article a été mis à jour avec succès.");
        loadAllCourses();
        if (selectedItem) {
          setSelectedItem((prev: any) => ({ ...prev, ...data }));
        }
      })
      .catch((error: any) => {
        console.error(error);
        notifyError(
          "Une erreur s'est produite lors de la mise à jour de l'article."
        );
      });
  };

  return (
    <Layout pageTitle="Cours">
      <div className="flex-1 flex  h-[calc(100vh-8rem)] p-4 md:p-8">
        <SEOHelmet
          title="CDTARGET - Articles"
          description="Accédez à nos articles en ligne sur le tir sportif et militaire."
          path="/courses"
        />

        <div className="flex gap-6 w-full flex-col md:flex-row">
          {/* Liste des articles */}
          <div className="w100 md:w-64 flex-shrink-0 bg-[#202123] rounded-lg overflow-hidden flex flex-col">
            <div className="p-4">
              <div className="flex items-center gap-2 mb-4">
                <File className="w-5 h-5 text-[#009B70]" />
                <h2 className="text-lg font-bebas tracking-wider text-white">
                  Articles
                </h2>
              </div>

              <CourseSections
                activeSection={activeSection}
                onSectionChange={setActiveSection}
              />
            </div>

            <div className="flex-1 overflow-y-auto px-4">
              <CourseList
                items={courses}
                selectedItem={selectedItem}
                onItemSelect={setSelectedItem}
                onDelete={(id) => setShowDeleteModal(id)}
                onEdit={handleEditArticle}
                isAdmin={isAdmin}
                currentUserId={user?.id}
                activeSection={activeSection}
              />
            </div>
            {isAdmin && (
              <div className="p-4 mt-auto">
                <button
                  onClick={() => setShowAddModal(true)}
                  className="w-full px-4 py-2 bg-[#009B70] text-white rounded-lg
                          hover:bg-[#007B56] transition-colors flex items-center justify-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Ajouter un article
                </button>
              </div>
            )}
          </div>

          {/* Contenu de l'article */}
          <div className="flex-1 bg-[#202123] rounded-lg overflow-hidden flex flex-col">
            {selectedItem ? (
              <CourseContent
                item={selectedItem}
                isEditing={isEditing}
                onEdit={() => setIsEditing(true)}
                onSave={(content) => {
                  handleEditArticle(selectedItem.id, { content });
                  setIsEditing(false);
                }}
                isAdmin={isAdmin}
                currentUserId={user?.id}
              />
            ) : (
              <div className="flex-1 flex items-center justify-center text-gray-400">
                <p>Sélectionnez un article dans le menu de gauche</p>
              </div>
            )}
          </div>
        </div>

        {showDeleteModal && (
          <DeleteCourseModal
            isOpen={true}
            onClose={() => setShowDeleteModal(null)}
            onConfirm={() => handleDeleteArticle(showDeleteModal)}
            courseName={
              courses.find((c) => c.id === showDeleteModal)?.name || ""
            }
          />
        )}

        <AddCourseModal
          isOpen={showAddModal}
          onClose={() => setShowAddModal(false)}
          onAdd={handleAddArticle}
          activeSection={activeSection}
        />
      </div>
    </Layout>
  );
}
