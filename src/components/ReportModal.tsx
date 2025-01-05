import React, { useEffect, useState } from "react";
import { Textarea } from "./common/Textarea";

interface ReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (reason: string) => void;
}

export function ReportModal({ isOpen, onClose, onConfirm }: ReportModalProps) {
  const [reason, setReason] = useState<string>("");

  useEffect(() => {
    setReason("");
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-100 ">
      <div className="bg-[#202123] rounded-lg w-full max-w-md p-6 relative">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-white mb-4">
            Signalez ce contenu
          </h2>
          <Textarea
            value={reason}
            onChange={(event) => setReason(event.target.value)}
            placeholder="Raison du signalement.."
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
            onClick={() => onConfirm(reason)}
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
