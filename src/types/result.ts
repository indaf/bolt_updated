export interface ResultKey {
  id: string;
  exerciseId: string;
  shooterId: string;
  key: string;
  createdAt: number;
  createdBy: string;
}

export interface ShooterResult {
  id: string;
  exerciseId: string;
  shooterId: string;
  data: Record<string, string>;
  timestamp: number;
  instructorId: string;
  claimed: boolean;
  claimedBy?: string;
  claimedAt?: number;
}
