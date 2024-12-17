export type UserStatus = 'online' | 'busy' | 'offline';
export type RoomCategory = 'public' | 'instructor' | 'private';

export interface ChatRoom {
  id: string;
  name: string;
  category: RoomCategory;
  isPrivate: boolean;
  password?: string;
  createdBy: string;
  createdAt: number;
  participants: string[];
  isDirectMessage?: boolean;
  lastMessage?: {
    content: string;
    timestamp: number;
  };
}

export interface UserProfile {
  id: string;
  userId: string;
  bio?: string;
  bannerImage?: string;
  bannerPosition?: {
    x: number;
    y: number;
  };
  location?: string;
  website?: string;
  socialLinks?: {
    twitter?: string;
    linkedin?: string;
    instagram?: string;
    youtube?: string;
  };
  achievements: Achievement[];
  posts: Post[];
  friends: string[];
  friendRequests: {
    incoming: string[];
    outgoing: string[];
  };
  stats: {
    exercisesCompleted: number;
    averageScore: number;
    bestScore: number;
    totalTime: number;
  };
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt: number;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

export interface Post {
  id: string;
  userId: string;
  content: string;
  media?: {
    type: 'image' | 'video';
    url: string;
  }[];
  likes: string[];
  comments: Comment[];
  timestamp: number;
  exerciseId?: string;
}