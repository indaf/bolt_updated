import React, { useEffect, useState } from "react";
import {
  Pencil,
  Trash2,
  ChevronLeft,
  ChevronRight,
  Upload,
  Filter,
  X,
} from "lucide-react";
import {
  deleteMedia,
  getAllGameMedia,
} from "../../../services/GameMedia/gamemedia.service";
import { AxiosResponse } from "axios";
import { notifyError } from "../../../helpers/Notify.helper";
import { getTags } from "../../../services/Tags/tags.service";
import { DeleteConfirmationModal } from "../../../components/DeleteConfirmationModal";

interface Filters {
  tags: string[];
  threat: "all" | "yes" | "no";
  clicks: {
    min: number | null;
    max: number | null;
  };
  reactionTime: {
    min: number | null;
    max: number | null;
  };
  date: {
    start: string | null;
    end: string | null;
  };
}

type ImageTableProps = {
  results: Array<any>;
};

const ITEMS_PER_PAGE = 10;

export function ImageTable({ results }: ImageTableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedImage, setSelectedImage] = useState<any | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [showFilters, setShowFilters] = useState<Record<string, boolean>>({});
  const [filters, setFilters] = useState<Filters>({
    tags: [],
    threat: "all",
    clicks: { min: null, max: null },
    reactionTime: { min: null, max: null },
    date: { start: null, end: null },
  });
  const [tags, setTags] = useState<Array<any>>([]);
  const [allImages, setAllImages] = useState<Array<any>>([]);

  console.log(results);

  useEffect(() => {
    loadAllImages();
    loadAllTags();
  }, []);

  const loadAllImages = () => {
    getAllGameMedia()
      .then((response: AxiosResponse) => {
        setAllImages(response.data);
      })
      .catch((error: any) => {
        console.error(error);
        notifyError("Erreur lors du chargement des images");
      });
  };

  const retrieveImageClick = (imageId: number) => {
    let nb_clicked = 0;
    results.forEach((result: any) => {
      if (result.data.images) {
        if (
          result.data.images.filter(
            (image: any) => image.image && image.image == imageId
          ).length > 0
        ) {
          let current = result.data.images.filter(
            (image: any) => image.image && image.image == imageId
          )[0];
          if (
            allImages.filter((image: any) => image.id == imageId)[0]
              .is_threat == true &&
            current.missed == false
          ) {
            nb_clicked += 1;
          }
          if (
            allImages.filter((image: any) => image.id == imageId)[0]
              .is_threat == false &&
            current.missed == true
          ) {
            nb_clicked += 1;
          }
        }
      }
    });
    return nb_clicked;
  };

  const retrieveImageTimeReaction = (imageId: number) => {
    let nb_clicked = 0;
    let avgTime = 0;
    results.forEach((result: any) => {
      if (result.data.images) {
        if (
          result.data.images.filter(
            (image: any) => image.image && image.image == imageId
          ).length > 0
        ) {
          let current = result.data.images.filter(
            (image: any) => image.image && image.image == imageId
          )[0];
          if (
            allImages.filter((image: any) => image.id == imageId)[0]
              .is_threat == true &&
            current.missed == false
          ) {
            nb_clicked += 1;
            avgTime += current.time;
          }
          if (
            allImages.filter((image: any) => image.id == imageId)[0]
              .is_threat == false &&
            current.missed == true
          ) {
            nb_clicked += 1;
            avgTime += current.time;
          }
        }
      }
    });
    if (nb_clicked == 0) {
      return 0;
    }
    return avgTime / nb_clicked;
  };

  const loadAllTags = () => {
    getTags()
      .then((response: AxiosResponse) => {
        setTags(response.data);
        console.log(response.data);
      })
      .catch((error: any) => {
        console.error(error);
        notifyError("Erreur lors du chargement des tags");
      });
  };

  const filteredImages = allImages.filter((image) => {
    // Filtre par tags
    if (
      filters.tags.length > 0 &&
      !filters.tags.some(
        (tag) => image.tags.filter((t: any) => t.id == tag).length > 0
      )
    ) {
      return false;
    }

    // Filtre par menace
    if (
      filters.threat !== "all" &&
      (filters.threat === "yes") !== image.is_threat
    ) {
      return false;
    }

    // Filtre par clics
    let click = retrieveImageClick(image.id);
    if (filters.clicks.min !== null && click < filters.clicks.min) return false;
    if (filters.clicks.max !== null && click > filters.clicks.max) return false;

    let react = retrieveImageTimeReaction(image.id);

    if (filters.reactionTime.min !== null && react < filters.reactionTime.min)
      return false;
    if (filters.reactionTime.max !== null && react > filters.reactionTime.max)
      return false;

    return true;
  });

  const totalPages = Math.ceil(filteredImages.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedImages = filteredImages.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  const handleDelete = (imageId: string) => {
    setIsDeleteModalOpen(true);
    setSelectedImage(allImages.filter((image) => image.id == imageId)[0]);
  };

  const confirmDelete = () => {
    if (selectedImage) {
      deleteMedia(selectedImage?.id)
        .then((_: AxiosResponse) => {
          setSelectedImage(null);
          notifyError("Image supprimée avec succès");
          loadAllImages();
        })
        .catch((error: any) => {
          console.error(error);
          notifyError("Erreur lors de la suppression de l'image");
        });
    }
    setIsDeleteModalOpen(false);
  };

  const toggleFilter = (column: string) => {
    setShowFilters((prev) => ({
      ...prev,
      [column]: !prev[column],
    }));
  };

  const renderFilter = (column: string) => {
    if (!showFilters[column]) return null;

    switch (column) {
      case "tags":
        return (
          <div className="absolute top-full left-0 mt-2 w-64 bg-[#2A2B32] rounded-lg shadow-lg p-4 z-10">
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <button
                  key={tag}
                  onClick={() =>
                    setFilters((prev) => ({
                      ...prev,
                      tags: prev.tags.includes(tag.id)
                        ? prev.tags.filter((t) => t !== tag.id)
                        : [...prev.tags, tag.id],
                    }))
                  }
                  className={`
                    px-2 py-1 text-xs rounded-lg transition-colors
                    ${
                      filters.tags.includes(tag.id)
                        ? "bg-[#009B70] text-white"
                        : "bg-[#343541] text-gray-400 hover:text-white"
                    }
                  `}
                >
                  {tag.name}
                </button>
              ))}
            </div>
          </div>
        );

      case "threat":
        return (
          <div className="absolute top-full left-0 mt-2 w-48 bg-[#2A2B32] rounded-lg shadow-lg p-4 z-10">
            <div className="space-y-2">
              {["all", "yes", "no"].map((value) => (
                <button
                  key={value}
                  onClick={() =>
                    setFilters((prev) => ({
                      ...prev,
                      threat: value as "all" | "yes" | "no",
                    }))
                  }
                  className={`
                    w-full px-3 py-1.5 text-sm rounded-lg text-left transition-colors
                    ${
                      filters.threat === value
                        ? "bg-[#009B70] text-white"
                        : "bg-[#343541] text-gray-400 hover:text-white"
                    }
                  `}
                >
                  {value === "all" ? "Tous" : value === "yes" ? "Oui" : "Non"}
                </button>
              ))}
            </div>
          </div>
        );

      case "clicks":
      case "reactionTime":
        return (
          <div className="absolute top-full left-0 mt-2 w-64 bg-[#2A2B32] rounded-lg shadow-lg p-4 z-10">
            <div className="space-y-4">
              <div>
                <label className="block text-xs text-gray-400 mb-1">
                  Minimum
                </label>
                <input
                  type="number"
                  value={filters[column].min || ""}
                  onChange={(e) =>
                    setFilters((prev) => ({
                      ...prev,
                      [column]: {
                        ...prev[column],
                        min: e.target.value ? Number(e.target.value) : null,
                      },
                    }))
                  }
                  className="w-full px-3 py-1.5 bg-[#343541] border border-gray-700 rounded-lg
                           text-white text-sm focus:outline-none focus:border-[#009B70]"
                  placeholder="Min"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-400 mb-1">
                  Maximum
                </label>
                <input
                  type="number"
                  value={filters[column].max || ""}
                  onChange={(e) =>
                    setFilters((prev) => ({
                      ...prev,
                      [column]: {
                        ...prev[column],
                        max: e.target.value ? Number(e.target.value) : null,
                      },
                    }))
                  }
                  className="w-full px-3 py-1.5 bg-[#343541] border border-gray-700 rounded-lg
                           text-white text-sm focus:outline-none focus:border-[#009B70]"
                  placeholder="Max"
                />
              </div>
            </div>
          </div>
        );
        return (
          <div className="absolute top-full left-0 mt-2 w-64 bg-[#2A2B32] rounded-lg shadow-lg p-4 z-10">
            <div className="space-y-4">
              <div>
                <label className="block text-xs text-gray-400 mb-1">
                  Date de début
                </label>
                <input
                  type="date"
                  value={filters.date.start || ""}
                  onChange={(e) =>
                    setFilters((prev) => ({
                      ...prev,
                      date: { ...prev.date, start: e.target.value || null },
                    }))
                  }
                  className="w-full px-3 py-1.5 bg-[#343541] border border-gray-700 rounded-lg
                           text-white text-sm focus:outline-none focus:border-[#009B70]"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-400 mb-1">
                  Date de fin
                </label>
                <input
                  type="date"
                  value={filters.date.end || ""}
                  onChange={(e) =>
                    setFilters((prev) => ({
                      ...prev,
                      date: { ...prev.date, end: e.target.value || null },
                    }))
                  }
                  className="w-full px-3 py-1.5 bg-[#343541] border border-gray-700 rounded-lg
                           text-white text-sm focus:outline-none focus:border-[#009B70]"
                />
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="bg-[#202123] rounded-lg p-6">
      <h2 className="text-xl font-medium text-white mb-6">
        Gestion des images
      </h2>

      <div className="overflow-x-auto">
        <table className="w-full min-h-[300px]">
          <thead>
            <tr className="border-b border-[#343541]">
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-400">
                Image
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-400">
                <div className="flex items-center gap-2 relative">
                  <span>Tags</span>
                  <button
                    onClick={() => toggleFilter("tags")}
                    className={`p-1 rounded transition-colors ${
                      filters.tags.length > 0
                        ? "text-[#009B70]"
                        : "text-gray-400 hover:text-white"
                    }`}
                  >
                    <Filter className="w-4 h-4" />
                  </button>
                  {renderFilter("tags")}
                </div>
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-400">
                <div className="flex items-center gap-2 relative">
                  <span>Menace</span>
                  <button
                    onClick={() => toggleFilter("threat")}
                    className={`p-1 rounded transition-colors ${
                      filters.threat !== "all"
                        ? "text-[#009B70]"
                        : "text-gray-400 hover:text-white"
                    }`}
                  >
                    <Filter className="w-4 h-4" />
                  </button>
                  {renderFilter("threat")}
                </div>
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-400">
                <div className="flex items-center gap-2 relative">
                  <span>Clics</span>
                  <button
                    onClick={() => toggleFilter("clicks")}
                    className={`p-1 rounded transition-colors ${
                      filters.clicks.min !== null || filters.clicks.max !== null
                        ? "text-[#009B70]"
                        : "text-gray-400 hover:text-white"
                    }`}
                  >
                    <Filter className="w-4 h-4" />
                  </button>
                  {renderFilter("clicks")}
                </div>
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-400">
                <div className="flex items-center gap-2 relative">
                  <span>Temps moyen</span>
                  <button
                    onClick={() => toggleFilter("reactionTime")}
                    className={`p-1 rounded transition-colors ${
                      filters.reactionTime.min !== null ||
                      filters.reactionTime.max !== null
                        ? "text-[#009B70]"
                        : "text-gray-400 hover:text-white"
                    }`}
                  >
                    <Filter className="w-4 h-4" />
                  </button>
                  {renderFilter("reactionTime")}
                </div>
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-400">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {paginatedImages.map((image) => (
              <tr key={image.id} className="border-b border-[#343541]">
                <td className="px-4 py-3">
                  <div className="w-20 h-12 rounded-lg overflow-hidden">
                    <img
                      src={import.meta.env.VITE_SERVICE_API_URL + image.url}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div className="flex flex-wrap gap-1">
                    {image.tags.map((tag: any) => (
                      <span
                        key={tag.id}
                        className="px-2 py-1 text-xs bg-[#2A2B32] text-gray-300 rounded"
                      >
                        {tag.name}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`px-2 py-1 text-xs rounded ${
                      image.is_threat
                        ? "bg-red-500/20 text-red-500"
                        : "bg-green-500/20 text-green-500"
                    }`}
                  >
                    {image.is_threat ? "Oui" : "Non"}
                  </span>
                </td>
                <td className="px-4 py-3 text-white">
                  {retrieveImageClick(image.id)}
                </td>
                <td className="px-4 py-3 text-white">
                  {retrieveImageTimeReaction(image.id)}s
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleDelete(image.id)}
                      className="p-1 text-red-500 hover:text-red-400 transition-colors"
                      title="Supprimer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-4 mt-6">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="p-2 text-gray-400 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <span className="text-sm text-gray-400">
            Page {currentPage} sur {totalPages}
          </span>

          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="p-2 text-gray-400 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      )}
      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={confirmDelete}
        message="Êtes-vous sûr de vouloir supprimer cette image ?"
        title="Suppression d'une image"
      />
    </div>
  );
}
