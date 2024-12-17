export interface Exercise {
  id: string;
  name: string;
  timestamp: number;
  data: Record<string, string>;
  archived: boolean;
  userId: string;
}