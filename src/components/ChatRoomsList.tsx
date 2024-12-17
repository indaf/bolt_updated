import React, { useState } from 'react';
import { Plus, Users, Lock, MessageSquare, Globe, Shield } from 'lucide-react';
import { useChatStore } from '../store/chatStore';
import { useAuthStore } from '../store/authStore';
import { CreateRoomModal } from './CreateRoomModal';
import { JoinRoomModal } from './JoinRoomModal';
import { ADMIN_EMAILS } from '../utils/admin';
import { RoomCategory } from '../types/chat';

export function ChatRoomsList() {
  const { user } = useAuthStore();
  const { rooms, selectedRoomId, setSelectedRoom } = useChatStore();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [selectedPrivateRoom, setSelectedPrivateRoom] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<RoomCategory>('public');

  if (!user) return null;

  const isAdmin = ADMIN_EMAILS.includes(user.email);
  const isInstructor = user.role === 'instructor' || isAdmin;

  const filteredRooms = rooms.filter(room => {
    if (selectedCategory === 'private') {
      return room.isDirectMessage;
    }
    if (!isInstructor) {
      return room.category === 'public' && !room.isDirectMessage;
    }
    return room.category === selectedCategory && !room.isDirectMessage;
  });

  const handleRoomClick = (roomId: string, isPrivate: boolean, hasPassword: boolean) => {
    if (isPrivate && hasPassword) {
      setSelectedPrivateRoom(roomId);
      setShowJoinModal(true);
    } else {
      if (isPrivate) {
        useChatStore.getState().joinRoom(roomId, user.id);
      }
      setSelectedRoom(roomId);
    }
  };

  return (
    <div className="w-64 bg-[#202123] rounded-lg p-4 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-medium text-white">Salons</h2>
        {isInstructor && selectedCategory !== 'private' && (
          <button
            onClick={() => setShowCreateModal(true)}
            className="p-2 text-gray-400 hover:text-white rounded-lg hover:bg-[#2A2B32]"
          >
            <Plus className="w-5 h-5" />
          </button>
        )}
      </div>

      <div className="flex gap-1">
        <button
          onClick={() => setSelectedCategory('public')}
          className={`
            flex-1 p-2 rounded-lg transition-colors
            ${selectedCategory === 'public'
              ? 'bg-[#009B70] text-white'
              : 'bg-[#343541] text-gray-300 hover:bg-[#2A2B32] hover:text-white'
            }
          `}
          title="Salons publics"
        >
          <Globe className="w-4 h-4 mx-auto" />
        </button>
        {isInstructor && (
          <button
            onClick={() => setSelectedCategory('instructor')}
            className={`
              flex-1 p-2 rounded-lg transition-colors
              ${selectedCategory === 'instructor'
                ? 'bg-[#009B70] text-white'
                : 'bg-[#343541] text-gray-300 hover:bg-[#2A2B32] hover:text-white'
              }
            `}
            title="Salons instructeurs"
          >
            <Shield className="w-4 h-4 mx-auto" />
          </button>
        )}
        <button
          onClick={() => setSelectedCategory('private')}
          className={`
            flex-1 p-2 rounded-lg transition-colors
            ${selectedCategory === 'private'
              ? 'bg-[#009B70] text-white'
              : 'bg-[#343541] text-gray-300 hover:bg-[#2A2B32] hover:text-white'
            }
          `}
          title="Messages privés"
        >
          <MessageSquare className="w-4 h-4 mx-auto" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto space-y-2">
        {filteredRooms.map((room) => (
          <button
            key={room.id}
            onClick={() => handleRoomClick(room.id, room.isPrivate, !!room.password)}
            className={`
              w-full flex items-center justify-between px-3 py-2 rounded-lg transition-colors
              ${selectedRoomId === room.id
                ? 'border border-[#009B70] bg-transparent text-white'
                : 'text-gray-400 hover:bg-[#2A2B32] hover:text-white'
              }
            `}
          >
            <div className="flex items-center gap-2 min-w-0">
              {room.isDirectMessage ? (
                <MessageSquare className="w-4 h-4 flex-shrink-0" />
              ) : (
                <Users className="w-4 h-4 flex-shrink-0" />
              )}
              <span className="truncate">{room.name}</span>
            </div>
            <div className="flex items-center gap-2">
              {!room.isDirectMessage && (
                <div className="flex items-center gap-1 text-xs">
                  <Users className="w-3 h-3" />
                  <span>{room.participants.length}</span>
                </div>
              )}
              {room.isPrivate && room.password && <Lock className="w-3 h-3" />}
            </div>
          </button>
        ))}
      </div>

      <CreateRoomModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        initialCategory={selectedCategory}
      />

      <JoinRoomModal
        isOpen={showJoinModal}
        onClose={() => {
          setShowJoinModal(false);
          setSelectedPrivateRoom(null);
        }}
        roomId={selectedPrivateRoom}
      />
    </div>
  );
}