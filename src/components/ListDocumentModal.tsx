import React, { useEffect, useState } from "react";
import { CheckCircle2, Link2 } from "lucide-react";
import { Input } from "./common/Input";
import { notifyError } from "../helpers/Notify.helper";
import { GrDocument } from "react-icons/gr";

interface ListDocumentModal {
  isOpen: boolean;
  onClose: () => void;
  instructor: any;
}

export function ListDocumentModal({
  isOpen,
  onClose,
  instructor,
}: ListDocumentModal) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[999] ">
      <div className="bg-[#202123] rounded-lg w-full max-w-md p-6 relative">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-white mb-4">
            Liste des documents
          </h2>
          <div className="flex flex-col mt-2 gap-2">
            {instructor.instructor_doc?.map((doc: any, index: number) => (
              <div
                key={index}
                className="bg-[#2A2B32] p-3 rounded-lg flex items-center justify-between"
              >
                <div className="flex items-center gap-2">
                  <GrDocument className="w-5 h-5 text-[#009B70]" />
                  <span className="text-xs text-gray-400">
                    {doc.url.split("/").pop()}
                  </span>
                  <a
                    href={import.meta.env.VITE_SERVICE_API_URL + doc.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Link2 className="w-4 h-4 text-[#009B70] cursor-pointer" />
                  </a>
                </div>
              </div>
            ))}
          </div>
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
        </div>
      </div>
    </div>
  );
}
