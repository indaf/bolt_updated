import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt: number;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

interface Post {
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

interface Comment {
  id: string;
  userId: string;
  content: string;
  timestamp: number;
}

interface UserProfile {
  userId: string;
  bio?: string;
  bannerImage?: string;
  location?: string;
  website?: string;
  socialLinks?: {
    twitter?: string;
    linkedin?: string;
    instagram?: string;
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

interface ProfileState {
  profiles: Record<string, UserProfile>;
  addProfile: (userId: string) => void;
  updateProfile: (userId: string, data: Partial<UserProfile>) => void;
  addPost: (userId: string, content: string, media?: { type: 'image' | 'video'; url: string }[]) => void;
  likePost: (userId: string, postId: string, likedBy: string) => void;
  unlikePost: (userId: string, postId: string, unlikedBy: string) => void;
  addComment: (userId: string, postId: string, comment: Omit<Comment, 'id'>) => void;
  sendFriendRequest: (fromUserId: string, toUserId: string) => void;
  acceptFriendRequest: (userId: string, friendId: string) => void;
  rejectFriendRequest: (userId: string, friendId: string) => void;
  removeFriend: (userId: string, friendId: string) => void;
  unlockAchievement: (userId: string, achievement: Omit<Achievement, 'id' | 'unlockedAt'>) => void;
}

const createDefaultProfile = (userId: string): UserProfile => ({
  userId,
  achievements: [],
  posts: [],
  friends: [],
  friendRequests: {
    incoming: [],
    outgoing: []
  },
  stats: {
    exercisesCompleted: 0,
    averageScore: 0,
    bestScore: 0,
    totalTime: 0
  }
});

// Création du store avec persistance
export const useProfileStore = create<ProfileState>()(
  persist(
    (set, get) => ({
      profiles: {},

      addProfile: (userId) => set((state) => ({
        profiles: {
          ...state.profiles,
          [userId]: createDefaultProfile(userId)
        }
      })),

      updateProfile: (userId, data) => set((state) => ({
        profiles: {
          ...state.profiles,
          [userId]: {
            ...state.profiles[userId],
            ...data
          }
        }
      })),

      addPost: (userId, content, media) => set((state) => {
        const profile = state.profiles[userId];
        if (!profile) return state;

        const newPost: Post = {
          id: crypto.randomUUID(),
          userId,
          content,
          media,
          likes: [],
          comments: [],
          timestamp: Date.now()
        };

        return {
          profiles: {
            ...state.profiles,
            [userId]: {
              ...profile,
              posts: [newPost, ...profile.posts]
            }
          }
        };
      }),

      likePost: (userId, postId, likedBy) => set((state) => {
        const profile = state.profiles[userId];
        if (!profile) return state;

        return {
          profiles: {
            ...state.profiles,
            [userId]: {
              ...profile,
              posts: profile.posts.map(post =>
                post.id === postId
                  ? { ...post, likes: [...post.likes, likedBy] }
                  : post
              )
            }
          }
        };
      }),

      unlikePost: (userId, postId, unlikedBy) => set((state) => {
        const profile = state.profiles[userId];
        if (!profile) return state;

        return {
          profiles: {
            ...state.profiles,
            [userId]: {
              ...profile,
              posts: profile.posts.map(post =>
                post.id === postId
                  ? { ...post, likes: post.likes.filter(id => id !== unlikedBy) }
                  : post
              )
            }
          }
        };
      }),

      addComment: (userId, postId, comment) => set((state) => {
        const profile = state.profiles[userId];
        if (!profile) return state;

        const newComment = {
          ...comment,
          id: crypto.randomUUID()
        };

        return {
          profiles: {
            ...state.profiles,
            [userId]: {
              ...profile,
              posts: profile.posts.map(post =>
                post.id === postId
                  ? { ...post, comments: [...post.comments, newComment] }
                  : post
              )
            }
          }
        };
      }),

      sendFriendRequest: (fromUserId, toUserId) => set((state) => {
        const fromProfile = state.profiles[fromUserId];
        const toProfile = state.profiles[toUserId];
        if (!fromProfile || !toProfile) return state;

        return {
          profiles: {
            ...state.profiles,
            [fromUserId]: {
              ...fromProfile,
              friendRequests: {
                ...fromProfile.friendRequests,
                outgoing: [...fromProfile.friendRequests.outgoing, toUserId]
              }
            },
            [toUserId]: {
              ...toProfile,
              friendRequests: {
                ...toProfile.friendRequests,
                incoming: [...toProfile.friendRequests.incoming, fromUserId]
              }
            }
          }
        };
      }),

      acceptFriendRequest: (userId, friendId) => set((state) => {
        const userProfile = state.profiles[userId];
        const friendProfile = state.profiles[friendId];
        if (!userProfile || !friendProfile) return state;

        return {
          profiles: {
            ...state.profiles,
            [userId]: {
              ...userProfile,
              friends: [...userProfile.friends, friendId],
              friendRequests: {
                ...userProfile.friendRequests,
                incoming: userProfile.friendRequests.incoming.filter(id => id !== friendId)
              }
            },
            [friendId]: {
              ...friendProfile,
              friends: [...friendProfile.friends, userId],
              friendRequests: {
                ...friendProfile.friendRequests,
                outgoing: friendProfile.friendRequests.outgoing.filter(id => id !== userId)
              }
            }
          }
        };
      }),

      rejectFriendRequest: (userId, friendId) => set((state) => {
        const userProfile = state.profiles[userId];
        const friendProfile = state.profiles[friendId];
        if (!userProfile || !friendProfile) return state;

        return {
          profiles: {
            ...state.profiles,
            [userId]: {
              ...userProfile,
              friendRequests: {
                ...userProfile.friendRequests,
                incoming: userProfile.friendRequests.incoming.filter(id => id !== friendId)
              }
            },
            [friendId]: {
              ...friendProfile,
              friendRequests: {
                ...friendProfile.friendRequests,
                outgoing: friendProfile.friendRequests.outgoing.filter(id => id !== userId)
              }
            }
          }
        };
      }),

      removeFriend: (userId, friendId) => set((state) => {
        const userProfile = state.profiles[userId];
        const friendProfile = state.profiles[friendId];
        if (!userProfile || !friendProfile) return state;

        return {
          profiles: {
            ...state.profiles,
            [userId]: {
              ...userProfile,
              friends: userProfile.friends.filter(id => id !== friendId)
            },
            [friendId]: {
              ...friendProfile,
              friends: friendProfile.friends.filter(id => id !== userId)
            }
          }
        };
      }),

      unlockAchievement: (userId, achievement) => set((state) => {
        const profile = state.profiles[userId];
        if (!profile) return state;

        const newAchievement = {
          ...achievement,
          id: crypto.randomUUID(),
          unlockedAt: Date.now()
        };

        return {
          profiles: {
            ...state.profiles,
            [userId]: {
              ...profile,
              achievements: [...profile.achievements, newAchievement]
            }
          }
        };
      })
    }),
    {
      name: 'profile-storage'
    }
  )
);