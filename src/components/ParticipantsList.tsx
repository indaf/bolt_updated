import React from 'react';
import { useChatStore } from '../store/chatStore';
import { useAuthStore } from '../store/authStore';
import { UserStatusBadge } from './UserStatusBadge';
import { Users } from 'lucide-react';

export function ParticipantsList() {
  const { user } = useAuthStore();
  const { rooms, selectedRoomId, userPresence } = useChatStore();
  const allUsers = useAuthStore((state) => state.getAllUsers());

  if (!selectedRoomId || !user) return null;

  const selectedRoom = rooms.find(r => r.id === selectedRoomId);
  if (!selectedRoom) return null;

  const participants = selectedRoom.participants
    .map(participantId => {
      const participant = allUsers.find(u => u.id === participantId);
      const presence = userPresence.find(p => p.userId === participantId);
      return {
        ...participant,
        status: presence?.status || 'offline'
      };
    })
    .filter(Boolean)
    .sort((a, b) => {
      // Trier par statut puis par nom
      if (a.status === 'online' && b.status !== 'online') return -1;
      if (a.status !== 'online' && b.status === 'online') return 1;
      if (a.status === 'busy' && b.status === 'offline') return -1;
      if (a.status === 'offline' && b.status === 'busy') return 1;
      return `${a.firstName} ${a.lastName}`.localeCompare(`${b.firstName} ${b.lastName}`);
    });

  return (
    <div className="w-64 bg-[#202123] rounded-lg p-4 flex flex-col">
      <div className="flex items-center gap-2 mb-4">
        <Users className="w-5 h-5 text-[#009B70]" />
        <h2 className="text-lg font-medium text-white">Participants</h2>
      </div>

      <div className="flex-1 overflow-y-auto space-y-2">
        {participants.map((participant) => (
          <div
            key={participant.id}
            className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-[#2A2B32] group"
          >
            <div className="relative">
              {participant.avatar ? (
                <img
                  src={participant.avatar}
                  alt={`${participant.firstName} ${participant.lastName}`}
                  className="w-8 h-8 rounded-full"
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-[#009B70] flex items-center justify-center">
                  <span className="text-sm font-medium text-white">
                    {participant.firstName[0]}
                    {participant.lastName[0]}
                  </span>
                </div>
              )}
              <UserStatusBadge status={participant.status} className="absolute -bottom-0.5 -right-0.5" />
            </div>
            <div className="min-w-0">
              <div className="text-sm font-medium text-white truncate">
                {participant.firstName} {participant.lastName}
              </div>
              <div className="text-xs text-gray-400 truncate">
                {participant.status === 'online' ? 'En ligne' : 
                 participant.status === 'busy' ? 'Occupé' : 'Hors ligne'}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}