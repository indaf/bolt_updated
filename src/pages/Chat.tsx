import React, { useState, useEffect, useRef } from "react";
import { Send, Smile } from "lucide-react";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";
import { useAuthStore } from "../store/authStore";
import { useChatStore } from "../store/chatStore";
import { ChatRoomsList } from "../components/ChatRoomsList";
import { UserStatusSelector } from "../components/UserStatusSelector";
import { OnlineUsersCounter } from "../components/OnlineUsersCounter";
import { ParticipantsList } from "../components/ParticipantsList";
import Layout from "../components/Layout";

export function Chat() {
  const { user } = useAuthStore();
  const {
    messages,
    selectedRoomId,
    addMessage,
    addReaction,
    removeReaction,
    rooms,
  } = useChatStore();
  const [newMessage, setNewMessage] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showReactionPicker, setShowReactionPicker] = useState<string | null>(
    null
  );
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const selectedRoom = rooms.find((r) => r.id === selectedRoomId);
  const roomMessages = messages.filter((m) => m.roomId === selectedRoomId);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [roomMessages]);

  if (!user) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-white mb-2">
            Connexion requise
          </h2>
          <p className="text-gray-400 text-sm">
            Veuillez vous connecter pour accéder au chat
          </p>
        </div>
      </div>
    );
  }

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedRoomId) return;

    addMessage({
      userId: user.id,
      userName: `${user.firstName} ${user.lastName}`,
      content: newMessage.trim(),
      roomId: selectedRoomId,
    });

    setNewMessage("");
  };

  const onEmojiClick = (emojiData: EmojiClickData, messageId?: string) => {
    if (messageId) {
      addReaction(messageId, emojiData.emoji, user.id);
      setShowReactionPicker(null);
    } else {
      setNewMessage((prev) => prev + emojiData.emoji);
    }
    setShowEmojiPicker(false);
  };

  const handleReactionClick = (messageId: string, emoji: string) => {
    const message = roomMessages.find((m) => m.id === messageId);
    if (!message) return;

    const reaction = message.reactions[emoji];
    if (reaction?.users.includes(user.id)) {
      removeReaction(messageId, emoji, user.id);
    } else {
      addReaction(messageId, emoji, user.id);
    }
  };

  return (
    <Layout pageTitle="Chat">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex gap-6 h-[calc(100vh-12rem)]">
            <ChatRoomsList />

            <div className="flex-1 bg-[#202123] rounded-lg flex flex-col min-h-0">
              {selectedRoom ? (
                <>
                  {/* En-tête */}
                  <div className="flex-none p-4 border-b border-[#343541] flex items-center justify-between">
                    <div>
                      <h2 className="text-lg font-medium text-white">
                        {selectedRoom.name}
                      </h2>
                      <OnlineUsersCounter />
                    </div>
                    <UserStatusSelector />
                  </div>

                  {/* Zone de messages */}
                  <div className="flex-1 overflow-y-auto min-h-0">
                    <div className="p-4 space-y-3">
                      {roomMessages.map((message) => (
                        <div
                          key={message.id}
                          className={`flex flex-col ${
                            message.userId === user.id
                              ? "items-end"
                              : "items-start"
                          }`}
                        >
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-sm font-medium text-gray-300">
                              {message.userName}
                            </span>
                            <span className="text-xs text-gray-500">
                              {new Date(message.timestamp).toLocaleTimeString()}
                            </span>
                          </div>
                          <div className="relative group">
                            <div
                              className={`max-w-[80%] rounded-lg px-3 py-2 text-sm ${
                                message.userId === user.id
                                  ? "bg-[#009B70] text-white"
                                  : "bg-[#343541] text-gray-300"
                              }`}
                            >
                              {message.content}
                            </div>

                            <button
                              onClick={() => setShowReactionPicker(message.id)}
                              className="absolute -right-8 top-1/2 -translate-y-1/2 p-1 text-gray-400 
                                      hover:text-white opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <Smile className="w-4 h-4" />
                            </button>

                            {showReactionPicker === message.id && (
                              <div className="absolute bottom-full mb-2 right-0 z-50">
                                <EmojiPicker
                                  onEmojiClick={(emoji) =>
                                    onEmojiClick(emoji, message.id)
                                  }
                                  autoFocusSearch={false}
                                  theme="dark"
                                  searchPlaceHolder="Rechercher un emoji..."
                                  width={300}
                                  height={400}
                                />
                              </div>
                            )}

                            {Object.entries(message.reactions).length > 0 && (
                              <div className="flex flex-wrap gap-1 mt-1">
                                {Object.entries(message.reactions).map(
                                  ([emoji, reaction]) => (
                                    <button
                                      key={emoji}
                                      onClick={() =>
                                        handleReactionClick(message.id, emoji)
                                      }
                                      className={`
                                      px-2 py-0.5 rounded-full text-sm
                                      ${
                                        reaction.users.includes(user.id)
                                          ? "bg-[#009B70]/20 text-[#009B70]"
                                          : "bg-[#343541] text-gray-400 hover:text-white"
                                      }
                                    `}
                                    >
                                      {emoji} {reaction.users.length}
                                    </button>
                                  )
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                      <div ref={messagesEndRef} />
                    </div>
                  </div>

                  {/* Barre de saisie */}
                  <div className="flex-none p-4 border-t border-[#343541]">
                    <form onSubmit={handleSend} className="flex gap-2 relative">
                      <div className="flex-1 flex">
                        <input
                          type="text"
                          value={newMessage}
                          onChange={(e) => setNewMessage(e.target.value)}
                          placeholder="Écrivez votre message..."
                          className="flex-1 px-3 py-2 bg-[#2A2B32] border border-gray-700 rounded-lg
                                text-sm text-white placeholder-gray-400 focus:outline-none focus:border-[#009B70]"
                        />
                        <button
                          type="button"
                          onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                          className="px-2 text-gray-400 hover:text-white transition-colors"
                        >
                          <Smile className="w-5 h-5" />
                        </button>
                      </div>
                      <button
                        type="submit"
                        className="px-4 py-2 bg-[#009B70] text-white rounded-lg text-sm
                              hover:bg-[#007B56] transition-colors flex items-center gap-2"
                        disabled={!newMessage.trim()}
                      >
                        <Send className="w-4 h-4" />
                        <span className="hidden sm:inline">Envoyer</span>
                      </button>

                      {showEmojiPicker && (
                        <div className="absolute bottom-full right-0 mb-2">
                          <EmojiPicker
                            onEmojiClick={(emoji) => onEmojiClick(emoji)}
                            autoFocusSearch={false}
                            theme="dark"
                            searchPlaceHolder="Rechercher un emoji..."
                            width={300}
                            height={400}
                          />
                        </div>
                      )}
                    </form>
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
    </Layout>
  );
}
