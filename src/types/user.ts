export interface User {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  birthDate?: string;
  birthPlace?: string;
  mobile?: string;
  avatar?: string;
  role: "instructor" | "shooter" | "admin";
  status: "pending" | "active" | "inactive";
  validationCode?: string;
  regiment?: string;
  military_id?: string;
  createdAt: number;
  xp: number;
  level: number;
  nextLevelXp: number;
}

export type UserStatus = "online" | "busy" | "offline";
