import React, { useContext, useEffect, useState } from "react";
import { ImageIcon, Video, Send } from "lucide-react";
import { useProfileStore } from "../store/profileStore";
import { UserAvatar } from "./UserAvatar";
import { AuthContext } from "../context/Auth.context";
import { UploadMediaModal } from "./UploadMediaModal";
import { Cross } from "../pages/Game/components/shapes/Cross";
import { addMedia } from "../services/Media/media.service";
import { createPublication } from "../services/Publication/publication.service";
import { AxiosResponse } from "axios";
import { notifyError, notifySuccess } from "../helpers/Notify.helper";
import { useLocation } from "react-router-dom";
import Spinner from "./Spinner";

interface NewPostProps {
  userId: string;
  refreshPublication: () => void;
}

export function NewPost({ userId, refreshPublication }: NewPostProps) {
  const [content, setContent] = useState("");
  const [modalUploadIsOpen, setModalUploadIsOpen] = useState<boolean>(false);
  const [type, setType] = useState<string>("");
  const { user } = useContext<any>(AuthContext);
  const [file, setFile] = useState<Array<any>>([]);
  const [readedFile, setReadedFile] = useState<Array<any>>([]);
  const location = useLocation();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [tags, setTags] = useState<Array<any>>([]);

  if (!user) return null;

  useEffect(() => {
    setContent(location.state?.content);
  }, []);

  useEffect(() => {
    if (content) {
      const hashtagRegex = /#[\S]+/g;
      const foundTags = content.match(hashtagRegex);
      setTags(foundTags || []);
    }
  }, [content]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;
    setIsLoading(true);
    let medias: Array<any> = [];

    if (file.length > 0) {
      await new Promise(async (resolve) => {
        for (const f of file) {
          const data = new FormData();
          data.append("file", f.file);
          data.append("type", f.type);
          try {
            const response = await addMedia(data);
            medias.push(response.data.media);
          } catch (error) {
            setIsLoading(false);
            notifyError("Erreur lors du téléchargement du média");
            return;
          }
        }
        resolve(medias);
      });
    }
    createPublication({ content, medias: medias.map((m: any) => m.id), tags })
      .then((response: AxiosResponse) => {
        setFile([]);
        setContent("");
        setTags([]);
        setReadedFile([]);
        notifySuccess("Publication créée.");
        refreshPublication();
      })
      .catch((error: any) => {
        console.error(error);
        notifyError("Erreur lors de la publication");
        setIsLoading(false);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleUpload = (type: string) => {
    setType(type);
    setModalUploadIsOpen(true);
  };

  const deleteMedia = (idx: number) => {
    const newFile = file.filter((f, index) => index !== idx);
    const newReadedFile = readedFile.filter((f, index) => index !== idx);
    setFile(newFile);
    setReadedFile(newReadedFile);
  };

  const handleUploadConfirm = (unreadedFile: any, rf: any) => {
    setFile([...file, { file: unreadedFile, type: type }]);
    setReadedFile([...readedFile, { file: rf, type: type }]);
    setModalUploadIsOpen(false);
  };

  return (
    <div className="bg-[#202123] rounded-lg p-3.5">
      <Spinner isLoading={isLoading} isMedia={true} />

      <div className="flex flex-col md:flex-row gap-4 mb-4">
        <UserAvatar user={user} size="lg" />
        <div className="flex-1">
          <form onSubmit={handleSubmit}>
            <textarea
              rows={4}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Partagez votre expérience..."
              className="w-full px-4 py-3 bg-[#2A2B32] border border-gray-700 rounded-lg
                       text-white placeholder-gray-400 focus:outline-none focus:border-[#009B70]
                       resize-none"
            />
            <div className="flex justify-start items-center gap-2">
              {tags.map((tag: any, idx: number) => (
                <span key={idx} className="text-[#009B70] text-sm">
                  {tag}
                </span>
              ))}
            </div>
            <div className="flex flex-wrap gap-5">
              {readedFile.map((f: any, idx: number) => {
                if (f.type === "image") {
                  return (
                    <div className="w-[75px] h-[75px] relative">
                      <div
                        className="absolute top-1 right-1"
                        onClick={() => deleteMedia(idx)}
                      >
                        <Cross color="red" size={"xs"}></Cross>
                      </div>
                      <img
                        key={f.file}
                        src={f.file}
                        alt=""
                        className="w-full h-full rounded-lg"
                      />
                    </div>
                  );
                } else {
                  return (
                    <div className="w-[75px] h-[75px] relative">
                      <div className="absolute top-1 right-1 z-50">
                        <Cross color="red" size={"xs"}></Cross>
                      </div>
                      <video
                        key={f.file}
                        src={f.file}
                        controls
                        className="w-full h-full rounded-lg"
                      />
                    </div>
                  );
                }
              })}
            </div>
            <div className="flex items-center justify-between mt-3">
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => handleUpload("image")}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-[#343541] text-gray-400 rounded-lg
                           hover:text-white transition-colors text-sm"
                >
                  <ImageIcon className="w-4 h-4" />
                  Photo
                </button>
                <button
                  type="button"
                  onClick={() => handleUpload("video")}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-[#343541] text-gray-400 rounded-lg
                           hover:text-white transition-colors text-sm"
                >
                  <Video className="w-4 h-4" />
                  Vidéo
                </button>
              </div>
              <button
                type="submit"
                disabled={!content?.trim()}
                className="px-4 py-1.5 bg-[#009B70] text-white rounded-lg hover:bg-[#007B56]
                         transition-colors disabled:opacity-50 disabled:cursor-not-allowed
                         flex items-center gap-1.5 text-sm"
              >
                <Send className="w-4 h-4" />
                Publier
              </button>
            </div>
          </form>
        </div>
      </div>
      <UploadMediaModal
        isOpen={modalUploadIsOpen}
        onClose={() => setModalUploadIsOpen(false)}
        type={type}
        onConfirm={handleUploadConfirm}
      />
    </div>
  );
}
