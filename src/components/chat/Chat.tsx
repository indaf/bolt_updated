import React from 'react';
import { useAuthStore } from '../../store/authStore';
import { useChatStore } from '../../store/chatStore';
import { ChatRoomsList } from '../ChatRoomsList';
import { UserStatusSelector } from '../UserStatusSelector';
import { OnlineUsersCounter } from '../OnlineUsersCounter';
import { ParticipantsList } from '../ParticipantsList';
import { MessageList } from './components/MessageList';
import { MessageInput } from './components/MessageInput';
import { useChatMessages } from './hooks/useChatMessages';
import { useReactions } from './hooks/useReactions';

export function Chat() {
  const { user } = useAuthStore();
  const { selectedRoomId, rooms } = useChatStore();
  const { messages, newMessage, setNewMessage, handleSend } = useChatMessages(selectedRoomId);
  const { handleReactionClick } = useReactions();

  const selectedRoom = rooms.find(r => r.id === selectedRoomId);

  if (!user) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-white mb-2">Connexion requise</h2>
          <p className="text-gray-400 text-sm">
            Veuillez vous connecter pour accéder au chat
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex gap-6 h-[calc(100vh-12rem)]">
          <ChatRoomsList />

          <div className="flex-1 bg-[#202123] rounded-lg flex flex-col min-h-0">
            {selectedRoom ? (
              <>
                <div className="flex-none p-4 border-b border-[#343541] flex items-center justify-between">
                  <div>
                    <h2 className="text-lg font-medium text-white">{selectedRoom.name}</h2>
                    <OnlineUsersCounter />
                  </div>
                  <UserStatusSelector />
                </div>

                <MessageList
                  messages={messages}
                  currentUserId={user.id}
                  onReactionClick={(messageId, emoji) => handleReactionClick(messageId, emoji, user.id)}
                />

                <div className="flex-none p-4 border-t border-[#343541]">
                  <MessageInput
                    value={newMessage}
                    onChange={setNewMessage}
                    onSubmit={(e) => handleSend(e, user.id, `${user.firstName} ${user.lastName}`)}
                  />
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center text-gray-400">
                <p>Sélectionnez un salon pour commencer à discuter</p>
              </div>
            )}
          </div>

          <ParticipantsList />
        </div>
      </div>
    </div>
  );
}