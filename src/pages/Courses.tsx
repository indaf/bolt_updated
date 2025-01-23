import React, { useContext, useEffect, useState } from "react";
import { File, Plus } from "lucide-react";
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
import {
  addFolder,
  deleteFolderById,
  getAllFolders,
  updateFolderById,
} from "../services/Folders/folders.service";
import { AddFolderModal } from "../components/AddFolderModal";
import { FolderList } from "../components/FolderList";
import { DeleteFolderModal } from "../components/DeleteFolderModal";

export default function Courses() {
  const { user } = useContext<any>(AuthContext);
  const [selectedItem, setSelectedItem] = useState<any | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showAddFolderModal, setShowAddFolderModal] = useState(false);
  const [courses, setCourses] = useState<Array<any>>([]);
  const [showDeleteModal, setShowDeleteModal] = useState<number | null>(null);
  const [showDeleteFolderModal, setShowDeleteFolderModal] = useState<
    number | null
  >(null);
  const [allFolders, setAllFolders] = useState<Array<any>>([]);
  const [currentFolder, setCurrentFolder] = useState<any>(null);
  const [activeSection, setActiveSection] = useState<"public" | "private">(
    "public"
  );
  const [currentCourseDrag, setCurrentCourseDrag] = useState<any>(null);
  const [currentFolderDrag, setCurrentFolderDrag] = useState<any>(null);
  const [depositDrag, setDepositDrag] = useState<any>(null);

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

  const loadAllFolders = () => {
    getAllFolders()
      .then((response: AxiosResponse) => {
        setAllFolders(response.data);
      })
      .catch((error: any) => {
        console.error(error);
        notifyError(
          "Une erreur s'est produite lors du chargement des dossiers."
        );
      });
  };

  const calculateCurrentArbo = (): string => {
    if (!currentFolder) return "";
    let folder = allFolders.find((f) => f.id === currentFolder.id);
    let arbo = `${folder.name}`;
    let hasParent = false;
    if (folder.parent) {
      hasParent = true;
    }
    while (hasParent) {
      let findFolder = allFolders.find((f) => f.id === folder.parent);
      arbo = `${findFolder.name}/${arbo}`;
      folder = findFolder;
      if (!folder.parent) {
        hasParent = false;
      }
    }
    return arbo;
  };

  useEffect(() => {
    loadAllCourses();
    loadAllFolders();
  }, []);

  if (!user) return null;

  const isAdmin =
    user.groups.filter((group: any) => group.name === "admin").length > 0;

  const handleAddArticle = (data: { name: string; is_private: boolean }) => {
    const newArticle = {
      name: data.name,
      is_private: data.is_private,
      content: "",
      folder: currentFolder ? currentFolder.id : null,
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

  const handleAddFolder = (data: any) => {
    addFolder({
      name: data.name,
      is_private: data.is_private,
      parent: currentFolder ? currentFolder.id : null,
    })
      .then((_: AxiosResponse) => {
        notifySuccess("Le dossier a été ajouté avec succès.");
        loadAllFolders();
        setShowAddFolderModal(false);
      })
      .catch((error: any) => {
        console.error(error);
        notifyError("Une erreur s'est produite lors de l'ajout du dossier.");
      });
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

  const handleUpdateFolder = (id: number, name: string) => {
    updateFolderById(id, { name })
      .then((_: AxiosResponse) => {
        notifySuccess("Le dossier a été mis à jour avec succès.");
        loadAllFolders();
        loadAllCourses();
      })
      .catch((error: any) => {
        console.error(error);
        notifyError(
          "Une erreur s'est produite lors de la mise à jour du dossier."
        );
      });
  };

  const handleDeleteFolder = (id: number) => {
    deleteFolderById(id)
      .then((_: AxiosResponse) => {
        notifySuccess("Le dossier a été supprimé avec succès.");
        loadAllCourses();
        loadAllFolders();
        setShowDeleteFolderModal(null);
      })
      .catch((error: any) => {
        console.error(error);
        notifyError(
          "Une erreur s'est produite lors de la suppression du dossier."
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

  const handleMoveCourse = () => {
    if (depositDrag && currentCourseDrag) {
      updateCourseById(currentCourseDrag.id, {
        folder: depositDrag == "root" ? null : depositDrag.id,
      })
        .then((_: AxiosResponse) => {
          notifySuccess("L'article a été déplacé avec succès.");
          loadAllCourses();
          setCurrentCourseDrag(null);
          setDepositDrag(null);
        })
        .catch((error: any) => {
          console.error(error);
          notifyError(
            "Une erreur s'est produite lors du déplacement de l'article."
          );
        });
    }
  };

  const handleMoveFolder = () => {
    console.log(depositDrag, currentFolderDrag);
    if (depositDrag && currentFolderDrag) {
      updateFolderById(currentFolderDrag.id, {
        parent: depositDrag == "root" ? null : depositDrag.id,
      })
        .then((_: AxiosResponse) => {
          notifySuccess("Le dossier a été déplacé avec succès.");
          loadAllCourses();
          loadAllFolders();
          setCurrentFolderDrag(null);
          setDepositDrag(null);
        })
        .catch((error: any) => {
          console.error(error);
          notifyError(
            "Une erreur s'est produite lors du déplacement du dossier."
          );
        });
    }
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

            <div className="flex-1 overflow-y-auto px-4 flex flex-col">
              <FolderList
                allFolders={allFolders}
                items={allFolders.filter((folder) =>
                  currentFolder == null
                    ? folder.parent == null
                    : folder.parent == currentFolder?.id
                )}
                onItemSelect={(folder: any) => setCurrentFolder(folder)}
                onDelete={(id) => setShowDeleteFolderModal(id)}
                onEdit={handleUpdateFolder}
                isAdmin={isAdmin}
                updateDepositDrag={(folder) => setDepositDrag(folder)}
                currentUserId={user?.id}
                activeSection={activeSection}
                currentFolder={currentFolder}
                onDrag={(folder) => setCurrentFolderDrag(folder)}
                onDragEnd={() => handleMoveFolder()}
              />
              <CourseList
                items={courses.filter((course: any) =>
                  currentFolder == null
                    ? course.folder == null
                    : course.folder?.id == currentFolder?.id
                )}
                onDrag={(course) => setCurrentCourseDrag(course)}
                selectedItem={selectedItem}
                onItemSelect={setSelectedItem}
                onDelete={(id) => setShowDeleteModal(id)}
                onEdit={handleEditArticle}
                isAdmin={isAdmin}
                currentUserId={user?.id}
                activeSection={activeSection}
                onDragEnd={() => {
                  handleMoveCourse();
                }}
              />
            </div>
            {isAdmin && (
              <div className="p-4 mt-auto gap-2 flex flex-col">
                <button
                  onClick={() => setShowAddModal(true)}
                  className="w-full px-4 py-2 bg-[#009B70] text-white rounded-lg
                          hover:bg-[#007B56] transition-colors flex items-center justify-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Ajouter un article
                </button>
                <button
                  onClick={() => setShowAddFolderModal(true)}
                  className="w-full px-4 py-2 bg-[#009B70] text-white rounded-lg
                          hover:bg-[#007B56] transition-colors flex items-center justify-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Ajouter un dossier
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

        {showDeleteFolderModal && (
          <DeleteFolderModal
            isOpen={true}
            onClose={() => setShowDeleteFolderModal(null)}
            onConfirm={() => handleDeleteFolder(showDeleteFolderModal)}
            folderName={
              allFolders.find((f) => f.id == showDeleteFolderModal)?.name || ""
            }
          />
        )}

        <AddCourseModal
          isOpen={showAddModal}
          onClose={() => setShowAddModal(false)}
          onAdd={handleAddArticle}
          activeSection={activeSection}
        />

        <AddFolderModal
          currentArborescence={calculateCurrentArbo()}
          isOpen={showAddFolderModal}
          onClose={() => setShowAddFolderModal(false)}
          onAdd={handleAddFolder}
          activeSection={activeSection}
        />
      </div>
    </Layout>
  );
}
