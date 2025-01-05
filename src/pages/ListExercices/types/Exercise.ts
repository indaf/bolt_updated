export type ModuleType = 
  | "Module initial ⭐" 
  | "Module avancé ⭐⭐" 
  | "Module expert ⭐⭐⭐";

export type ExerciseCategory = "modèles" | "semaines" | "mois";

export type WeaponType = "PA" | "FA" | "PA & FA";

export interface Exercise {
  id: number;
  name: string;
  module: {
    name: string;
    difficulty: ModuleType;
  };
  categories: ExerciseCategory[];
  target: {
    name: string;
    count: number;
  };
  weapon: {
    type: WeaponType;
    transition: boolean;
    starting: string;
    position: string;
  };
  objective?: string;
  direction?: string;
  images?: {
    drill?: string;
    target?: string;
  };
  ammunition: {
    withoutConstraints: number;
    withConstraints: number;
    magazineChangesPA: boolean;
    magazineChangesFA: boolean;
    magazine1PA: number;
    magazine2PA: number;
    magazine1FA: number;
    magazine2FA: number;
    distance?: number;
  };
  constraints: Array<{
    name: string;
    description: string;
    icon?: string;
  }>;
  skills: Array<{
    name: string;
    description: string;
    icon?: string;
  }>;
  audio?: {
    soundcloud?: string;
    embed?: string;
  };
}