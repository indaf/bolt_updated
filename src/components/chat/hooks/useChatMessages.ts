import { useState, useCallback } from 'react';
import { useChatStore } from '../../../store/chatStore';

export function useChatMessages(roomId: string | null) {
  const addMessage = useChatStore((state) => state.addMessage);
  const messages = useChatStore((state) => 
    state.messages.filter(m => m.roomId === roomId)
  );
  const [newMessage, setNewMessage] = useState('');

  const handleSend = useCallback((e: React.FormEvent, userId: string, userName: string) => {
    e.preventDefault();
    if (!newMessage.trim() || !roomId) return;

    addMessage({
      userId,
      userName,
      content: newMessage.trim(),
      roomId
    });

    setNewMessage('');
  }, [newMessage, roomId, addMessage]);

  return {
    messages,
    newMessage,
    setNewMessage,
    handleSend
  };
}