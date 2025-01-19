import React, { useEffect, useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { Input } from "./common/Input";
import { notifyError } from "../helpers/Notify.helper";

interface UploadDocumentModal {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (file: File, readedFile: any) => void;
}

export function UploadDocumentModal({
  isOpen,
  onClose,
  onConfirm,
}: UploadDocumentModal) {
  const [file, setFile] = useState<any>(null);
  const [unreadFile, setUnreadFile] = useState<any>(null);

  useEffect(() => {
    setFile(null);
    setUnreadFile(null);
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  const handleUploadFile = (event: any) => {
    const file = event.target.files[0];
    // Limitation to 100Mo files
    if (file.size / 1000000 > 100) {
      notifyError(
        "Le fichier est trop volumineux. La limite est de 100Mo. Le fichier actuel fait " +
          (file.size / 1000000).toFixed(2) +
          "Mo"
      );
      return;
    }
    setUnreadFile(file);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setFile(reader.result);
    };
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[999] ">
      <div className="bg-[#202123] rounded-lg w-full max-w-md p-6 relative">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-white mb-4">
            Uploadez votre document
          </h2>

          <Input
            type="file"
            onChange={handleUploadFile}
            accept=".png,.jpg,.jpeg,.webp,.pdf,.docx,.doc"
          />
        </div>
        <div className="flex justify-end items-center gap-4 w-full mt-4">
          <button
            type="button"
            onClick={onClose}
            className="flex items-center gap-2 px-4 py-2 text-sm text-gray-400 hover:text-white transition-colors"
          >
            Fermer
          </button>
          <div className="flex-1" />
          <button
            type="submit"
            onClick={() => (file ? onConfirm(unreadFile, file) : onClose())}
            className="flex items-center gap-2 px-4 py-2 text-sm bg-[#009B70] text-white rounded-lg
                       hover:bg-[#007B56] transition-colors"
          >
            Confirmer
          </button>
        </div>
      </div>
    </div>
  );
}
