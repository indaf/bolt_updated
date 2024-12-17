import React, { useRef, useEffect } from 'react';
import { Message } from './Message';

interface MessageListProps {
  messages: any[];
  currentUserId: string;
  onReactionClick: (messageId: string, emoji: string) => void;
}

export function MessageList({ messages, currentUserId, onReactionClick }: MessageListProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto min-h-0">
      <div className="p-4 space-y-3">
        {messages.map((message) => (
          <Message
            key={message.id}
            message={message}
            currentUserId={currentUserId}
            onReactionClick={onReactionClick}
          />
        ))}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
}