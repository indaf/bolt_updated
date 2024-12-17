import React, { useContext, useState } from "react";
import { MdAdd } from "react-icons/md";

import { Target, Shield, Crosshair } from "lucide-react";
import { AuthContext } from "../context/Auth.context";
import { AddMaterialModal } from "./AddMaterialModal";
import { addWeaponToUser } from "../services/Auth/Auth.service";
import { notifyError, notifySuccess } from "../helpers/Notify.helper";

interface ProfileSetupProps {
  profile: any;
  loadUserProfile: () => void;
}

export function ProfileSetup({ profile, loadUserProfile }: ProfileSetupProps) {
  const { user } = useContext<any>(AuthContext);
  const [modalAddMaterialIsOpen, setModalAddMaterialIsOpen] =
    useState<boolean>(false);

  if (!profile) return null;

  const isOwner = profile.user.id === user.id;

  const handleAddWeapon = (weaponId: number) => {
    addWeaponToUser(profile.user.id, weaponId)
      .then(() => {
        notifySuccess("Matériel ajouté avec succès.");
        loadUserProfile();
        setModalAddMaterialIsOpen(false);
      })
      .catch(() => {
        console.error("Error while adding weapon to user");
        notifyError("Impossible d'ajouter le matériel.");
      });
  };

  return (
    <div className=" gap-2 flex flex-col">
      {isOwner && (
        <button
          onClick={() => setModalAddMaterialIsOpen(true)}
          className={`
                    flex justify-center items-center gap-1 text-center px-4 py-1.5 rounded-lg transition-colors text-sm bg-[#009B70] w-[200px]`}
        >
          <span>Ajouter un matériel</span>
          <span className="">
            <MdAdd />
          </span>
        </button>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {profile.user.weapons.map((weapon: any, index: number) => (
          <div key={index} className="bg-[#202123] rounded-lg p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-[#343541] flex items-center justify-center">
                <Crosshair className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-lg font-medium text-white">
                  {weapon.model}
                </h4>
                <p className="text-sm text-gray-400">{weapon.manufacturer}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <AddMaterialModal
        isOpen={modalAddMaterialIsOpen}
        onClose={() => setModalAddMaterialIsOpen(false)}
        onConfirm={(weaponId: number) => handleAddWeapon(weaponId)}
      ></AddMaterialModal>
    </div>
  );
}
