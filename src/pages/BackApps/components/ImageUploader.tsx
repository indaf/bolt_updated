import React, { useEffect, useState } from "react";
import { Upload, X, Plus } from "lucide-react";
import { createTag, getTags } from "../../../services/Tags/tags.service";
import { notifyError, notifySuccess } from "../../../helpers/Notify.helper";
import { AxiosResponse } from "axios";
import { addMedia } from "../../../services/GameMedia/gamemedia.service";
import Spinner from "../../../components/Spinner";

export function ImageUploader() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [isThreat, setIsThreat] = useState(false);
  const [tags, setTags] = useState<Array<any>>([]);
  const [newTag, setNewTag] = useState("");
  const [showTagInput, setShowTagInput] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleTagClick = (tagId: string) => {
    setSelectedTags((prev) =>
      prev.includes(tagId) ? prev.filter((t) => t !== tagId) : [...prev, tagId]
    );
  };

  const loadTags = () => {
    getTags()
      .then((response: AxiosResponse) => {
        setTags(response.data);
      })
      .catch((err: any) => {
        console.error(err);
        notifyError("Une erreur s'est produite lors du chargement des tags.");
      });
  };

  const handleAddCustomTag = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTag.trim()) return;

    createTag({ name: newTag, value: newTag, group: "custom" })
      .then((response: AxiosResponse) => {
        setNewTag("");
        setShowTagInput(false);
        loadTags();
      })
      .catch((err: any) => {
        console.error(err);
        notifyError("Une erreur s'est produite lors de la création du tag.");
      });
  };

  const handleUpload = () => {
    if (!selectedFile) return;
    setIsLoading(true);

    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("tags", JSON.stringify(selectedTags));
    formData.append("is_threat", String(isThreat));

    addMedia(formData)
      .then((response: AxiosResponse) => {
        notifySuccess("L'image a été ajoutée avec succès.");
        setSelectedFile(null);
        setPreview("");
        setSelectedTags([]);
        setIsThreat(false);
      })
      .catch((err: any) => {
        console.error(err);
        notifyError("Une erreur s'est produite lors de l'ajout de l'image.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    loadTags();
  }, []);

  return (
    <div className="bg-[#202123] rounded-lg p-6">
      <h2 className="text-xl font-medium text-white mb-6">
        Ajouter une nouvelle image
      </h2>
      <Spinner isLoading={isLoading} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Zone de dépôt */}
        <div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Image
            </label>
            <div className="relative">
              {preview ? (
                <div className="relative aspect-video rounded-lg overflow-hidden">
                  <img
                    src={preview}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                  <button
                    onClick={() => {
                      setSelectedFile(null);
                      setPreview("");
                    }}
                    className="absolute top-2 right-2 p-1 bg-black/50 rounded-full text-white hover:bg-black/70"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <label className="flex flex-col items-center justify-center w-full aspect-video bg-[#2A2B32] border-2 border-dashed border-gray-700 rounded-lg cursor-pointer hover:border-[#009B70] transition-colors">
                  <Upload className="w-8 h-8 text-gray-400 mb-2" />
                  <span className="text-sm text-gray-400">
                    Cliquez ou déposez une image ici
                  </span>
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleFileSelect}
                  />
                </label>
              )}
            </div>
          </div>

          <div className="mb-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={isThreat}
                onChange={(e) => setIsThreat(e.target.checked)}
                className="rounded border-gray-700 text-[#009B70] focus:ring-[#009B70]"
              />
              <span className="text-sm text-gray-300">
                Cette image contient une menace
              </span>
            </label>
          </div>
        </div>

        {/* Tags */}
        <div>
          {[...new Set([...tags.map((tag: any) => tag.group), "custom"])].map(
            (group) => (
              <div key={group} className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-medium text-gray-400 capitalize">
                    {group}
                  </h3>
                  {group === "custom" && (
                    <button
                      onClick={() => setShowTagInput(true)}
                      className="p-1 text-gray-400 hover:text-white transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  )}
                </div>
                <div className="flex flex-wrap gap-2">
                  {tags
                    .filter((tag: any) => tag.group == group)
                    .map((tag) => (
                      <button
                        key={tag.id}
                        onClick={() => handleTagClick(tag.id)}
                        className={`
                      px-3 py-1.5 rounded-lg text-sm transition-colors
                      ${
                        selectedTags.includes(tag.id)
                          ? "bg-[#009B70] text-white"
                          : "bg-[#2A2B32] text-gray-400 hover:text-white"
                      }
                    `}
                      >
                        {tag.name}
                      </button>
                    ))}
                  {group === "custom" && showTagInput && (
                    <form
                      onSubmit={handleAddCustomTag}
                      className="flex-1 min-w-[200px]"
                    >
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={newTag}
                          onChange={(e) => setNewTag(e.target.value)}
                          placeholder="Nouveau tag..."
                          className="flex-1 px-3 py-1.5 bg-[#2A2B32] border border-gray-700 rounded-lg
                                 text-white placeholder-gray-400 focus:outline-none focus:border-[#009B70]"
                          autoFocus
                        />
                        <button
                          type="submit"
                          className="px-3 py-1.5 bg-[#009B70] text-white rounded-lg
                                 hover:bg-[#007B56] transition-colors"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => setShowTagInput(false)}
                          className="px-3 py-1.5 bg-[#343541] text-gray-400 rounded-lg
                                 hover:text-white transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              </div>
            )
          )}
        </div>
      </div>

      <div className="mt-6 pt-6 border-t border-[#343541]">
        <button
          onClick={handleUpload}
          disabled={!selectedFile}
          className="w-full px-4 py-3 bg-[#009B70] text-white rounded-lg
                   hover:bg-[#007B56] transition-colors text-lg font-medium
                   disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Ajouter l'image
        </button>
      </div>
    </div>
  );
}
