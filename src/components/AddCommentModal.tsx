import React, { useEffect, useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { Input } from "./common/Input";
import { Textarea } from "./common/Textarea";

interface AddCommentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (text: string) => void;
}

export function AddCommentModal({
  isOpen,
  onClose,
  onConfirm,
}: AddCommentModalProps) {
  const [text, setText] = useState<string>("");

  useEffect(() => {
    setText("");
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-100 ">
      <div className="bg-[#202123] rounded-lg w-full max-w-md p-6 relative">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-white mb-4">
            Ajouter un commentaire
          </h2>
        </div>
        <Textarea
          value={text}
          onChange={(event) => setText(event.target.value)}
          placeholder="Votre commentaire"
        />
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
            onClick={() => onConfirm(text)}
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
