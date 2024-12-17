export interface AdminStats {
  totalUsers: number;
  activeUsers: number;
  totalExercises: number;
  exercisesThisMonth: number;
  totalShooters: number;
  averageExercisesPerUser: number;
  pendingInstructors: number;
  lastRegistrations: Array<{
    id: string;
    name: string;
    date: string;
  }>;
  popularCriteria: Array<{
    name: string;
    count: number;
  }>;
}

export interface AdminUser extends User {
  isAdmin: boolean;
  lastLogin: Date;
  exerciseCount: number;
  shooterCount: number;
  createdAt: Date;
  status: 'active' | 'inactive' | 'pending';
  role: 'instructor' | 'shooter';
  regiment?: string;
  militaryId?: string;
  validationCode?: string;
}