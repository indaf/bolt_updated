import React from 'react';
import { UserStatus } from '../types/chat';
import { useChatStore } from '../store/chatStore';
import { useAuthStore } from '../store/authStore';

export function UserStatusSelector() {
  const { user } = useAuthStore();
  const updateUserStatus = useChatStore((state) => state.updateUserStatus);
  const userPresence = useChatStore((state) => 
    state.userPresence.find(p => p.userId === user?.id)
  );

  if (!user) return null;

  const currentStatus = userPresence?.status || 'online';

  const handleStatusChange = (status: UserStatus) => {
    updateUserStatus(user.id, status);
  };

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => handleStatusChange('online')}
        className={`
          flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm transition-colors
          ${currentStatus === 'online'
            ? 'bg-green-500/20 text-green-500'
            : 'text-gray-400 hover:text-white hover:bg-[#2A2B32]'
          }
        `}
      >
        <div className="w-2 h-2 rounded-full bg-green-500" />
        En ligne
      </button>

      <button
        onClick={() => handleStatusChange('busy')}
        className={`
          flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm transition-colors
          ${currentStatus === 'busy'
            ? 'bg-red-500/20 text-red-500'
            : 'text-gray-400 hover:text-white hover:bg-[#2A2B32]'
          }
        `}
      >
        <div className="w-2 h-2 rounded-full bg-red-500" />
        Occupé
      </button>

      <button
        onClick={() => handleStatusChange('offline')}
        className={`
          flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm transition-colors
          ${currentStatus === 'offline'
            ? 'bg-gray-500/20 text-gray-500'
            : 'text-gray-400 hover:text-white hover:bg-[#2A2B32]'
          }
        `}
      >
        <div className="w-2 h-2 rounded-full bg-gray-500" />
        Hors ligne
      </button>
    </div>
  );
}