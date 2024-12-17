import React, { useEffect, useRef, useState } from "react";
import { CheckCircle2, Search } from "lucide-react";
import { Input } from "./common/Input";
import { searchWeapons } from "../services/Weapon/weapon.service";
import { AxiosResponse } from "axios";
import { notifyError } from "../helpers/Notify.helper";

interface AddMaterialModal {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (weapon_id: number) => void;
}

export function AddMaterialModal({
  isOpen,
  onClose,
  onConfirm,
}: AddMaterialModal) {
  const [weaponId, setWeaponId] = useState<number>(-1);
  const [query, setQuery] = useState<string>("");
  const [foundWeapons, setFoundWeapons] = useState<Array<any>>([]);
  const timeout = useRef<any>(null);

  useEffect(() => {
    setWeaponId(-1);
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  const handleSearch = (value: string) => {
    clearTimeout(timeout.current);
    setQuery(value);
    timeout.current = setTimeout(() => {
      if (value.length >= 3) {
        searchWeapons(value)
          .then((response: AxiosResponse) => {
            setFoundWeapons(response.data);
          })
          .catch((error: any) => {
            console.error(error);
            notifyError("Impossible de charger les armes");
          });
      }
      clearTimeout(timeout.current);
    }, 1000);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[9000] ">
      <div className="bg-[#202123] rounded-lg w-full max-w-md p-6 relative">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-white mb-4">
            Rechercher un matériel
          </h2>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Rechercher un matériel..."
            className="w-full pl-10 pr-3 py-2 bg-[#2A2B32] border border-gray-700 rounded-lg
                             text-white placeholder-gray-400 focus:outline-none focus:border-[#009B70]"
          />
        </div>
        <div className="flex flex-col w-full mt-2 max-h-[60vh] overflow-y-scroll">
          {foundWeapons.length > 0 &&
            foundWeapons.map((weapon: any, index: number) => (
              <div
                key={index}
                className="bg-[#202123] rounded-lg p-2 flex justify-between items-center w-full"
              >
                <div className="flex items-center gap-1">
                  <div>
                    <h4 className="text-sm font-medium text-white">
                      {weapon.model}
                    </h4>
                    <p className="text-xs text-gray-400">
                      {weapon.manufacturer}
                    </p>
                  </div>
                </div>
                <input
                  type="checkbox"
                  id="isPrivate"
                  checked={weapon.id === weaponId}
                  onChange={(e) => setWeaponId(weapon.id)}
                  className="rounded border-gray-700 text-[#009B70] focus:ring-[#009B70]"
                />
              </div>
            ))}
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
            onClick={() => onConfirm(weaponId)}
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
