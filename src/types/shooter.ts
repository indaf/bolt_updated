export interface Shooter {
  id: string;
  firstName: string;
  lastName: string;
  birthDate: string;
  birthPlace: string;
  uniqueId: string;
  timestamp: number;
  results: {
    [exerciseId: string]: Array<Record<string, string>>;
  };
  status?: 'active' | 'inactive';
}