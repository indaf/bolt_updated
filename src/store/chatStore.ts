import { create } from "zustand";
import { persist } from "zustand/middleware";
import { ChatRoom, UserStatus } from "../types/chat";

interface Message {
  id: string;
  userId: string;
  userName: string;
  content: string;
  reactions: Record<string, { emoji: string; users: string[] }>;
  timestamp: number;
  roomId: string;
}

interface UserPresence {
  userId: string;
  status: UserStatus;
  lastSeen: number;
}

interface ChatStore {
  messages: Message[];
  rooms: ChatRoom[];
  selectedRoomId: string | null;
  userPresence: UserPresence[];
  addMessage: (
    message: Omit<Message, "id" | "timestamp" | "reactions">
  ) => void;
  addReaction: (messageId: string, emoji: string, userId: string) => void;
  removeReaction: (messageId: string, emoji: string, userId: string) => void;
  createRoom: (room: Omit<ChatRoom, "id">) => void;
  joinRoom: (roomId: string, userId: string, password?: string) => boolean;
  leaveRoom: (roomId: string, userId: string) => void;
  setSelectedRoom: (roomId: string | null) => void;
  updateUserStatus: (userId: string, status: UserStatus) => void;
  getOnlineUsers: () => { online: number; busy: number };
}

// Salons de démonstration
const demoRooms: ChatRoom[] = [
  {
    id: "1",
    name: "Général - Instruction",
    category: "public",
    isPrivate: false,
    createdBy: "admin",
    createdAt: Date.now(),
    participants: [],
  },
  {
    id: "2",
    name: "🔒 Instructeurs IST-C",
    category: "instructor",
    isPrivate: false,
    createdBy: "admin",
    createdAt: Date.now(),
    participants: [],
  },
  {
    id: "3",
    name: "📋 Retours d'expérience",
    category: "instructor",
    isPrivate: false,
    createdBy: "admin",
    createdAt: Date.now(),
    participants: [],
  },
];

export const useChatStore = create<ChatStore>()(
  persist(
    (set, get) => ({
      messages: [],
      rooms: demoRooms,
      selectedRoomId: null,
      userPresence: [],

      addMessage: (message) =>
        set((state) => ({
          messages: [
            ...state.messages,
            {
              ...message,
              id: crypto.randomUUID(),
              timestamp: Date.now(),
              reactions: {},
            },
          ],
        })),

      addReaction: (messageId, emoji, userId) =>
        set((state) => ({
          messages: state.messages.map((message) => {
            if (message.id !== messageId) return message;

            const existingReaction = message.reactions[emoji] || {
              emoji,
              users: [],
            };
            if (!existingReaction.users.includes(userId)) {
              return {
                ...message,
                reactions: {
                  ...message.reactions,
                  [emoji]: {
                    emoji,
                    users: [...existingReaction.users, userId],
                  },
                },
              };
            }
            return message;
          }),
        })),

      removeReaction: (messageId, emoji, userId) =>
        set((state) => ({
          messages: state.messages.map((message) => {
            if (message.id !== messageId) return message;

            const existingReaction = message.reactions[emoji];
            if (existingReaction) {
              const updatedUsers = existingReaction.users.filter(
                (id) => id !== userId
              );
              const updatedReactions = { ...message.reactions };

              if (updatedUsers.length === 0) {
                delete updatedReactions[emoji];
              } else {
                updatedReactions[emoji] = {
                  emoji,
                  users: updatedUsers,
                };
              }

              return {
                ...message,
                reactions: updatedReactions,
              };
            }
            return message;
          }),
        })),

      createRoom: (room) =>
        set((state) => ({
          rooms: [
            ...state.rooms,
            {
              ...room,
              id: crypto.randomUUID(),
            },
          ],
        })),

      joinRoom: (roomId, userId, password) => {
        const room = get().rooms.find((r) => r.id === roomId);
        if (!room) return false;

        if (room.isPrivate && room.password && room.password !== password) {
          return false;
        }

        set((state) => ({
          rooms: state.rooms.map((r) =>
            r.id === roomId
              ? {
                  ...r,
                  participants: [...new Set([...r.participants, userId])],
                }
              : r
          ),
        }));

        return true;
      },

      leaveRoom: (roomId, userId) =>
        set((state) => ({
          rooms: state.rooms.map((r) =>
            r.id === roomId
              ? {
                  ...r,
                  participants: r.participants.filter((id) => id !== userId),
                }
              : r
          ),
        })),

      setSelectedRoom: (roomId) => set({ selectedRoomId: roomId }),

      updateUserStatus: (userId, status) =>
        set((state) => {
          const existingPresence = state.userPresence.find(
            (p) => p.userId === userId
          );
          const newPresence = {
            userId,
            status,
            lastSeen: Date.now(),
          };

          return {
            userPresence: existingPresence
              ? state.userPresence.map((p) =>
                  p.userId === userId ? newPresence : p
                )
              : [...state.userPresence, newPresence],
          };
        }),

      getOnlineUsers: () => {
        const presence = get().userPresence;
        return {
          online: presence.filter((p) => p.status === "online").length,
          busy: presence.filter((p) => p.status === "busy").length,
        };
      },
    }),
    {
      name: "chat-storage",
    }
  )
);
