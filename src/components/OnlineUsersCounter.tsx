import React from 'react';
import { Users } from 'lucide-react';
import { useChatStore } from '../store/chatStore';

export function OnlineUsersCounter() {
  const { online, busy } = useChatStore((state) => state.getOnlineUsers());

  return (
    <div className="flex items-center gap-2">
      <Users className="w-4 h-4 text-gray-400" />
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 rounded-full bg-green-500" />
          <span className="text-gray-400">{online}</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 rounded-full bg-red-500" />
          <span className="text-gray-400">{busy}</span>
        </div>
      </div>
    </div>
  );
}