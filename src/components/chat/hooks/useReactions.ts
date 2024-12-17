import { useCallback } from 'react';
import { useChatStore } from '../../../store/chatStore';

export function useReactions() {
  const { addReaction, removeReaction } = useChatStore();

  const handleReactionClick = useCallback((messageId: string, emoji: string, userId: string) => {
    const message = useChatStore.getState().messages.find(m => m.id === messageId);
    if (!message) return;

    const reaction = message.reactions[emoji];
    if (reaction?.users.includes(userId)) {
      removeReaction(messageId, emoji, userId);
    } else {
      addReaction(messageId, emoji, userId);
    }
  }, []);

  return { handleReactionClick };
}