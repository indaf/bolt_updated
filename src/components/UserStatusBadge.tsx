import React from 'react';
import { UserStatus } from '../types/chat';

interface UserStatusBadgeProps {
  status: UserStatus;
  className?: string;
}

export function UserStatusBadge({ status, className = '' }: UserStatusBadgeProps) {
  const getStatusColor = () => {
    switch (status) {
      case 'online':
        return 'bg-green-500';
      case 'busy':
        return 'bg-red-500';
      case 'offline':
        return 'bg-gray-500';
    }
  };

  return (
    <div className={`relative ${className}`}>
      <div className={`absolute bottom-0 right-0 w-2.5 h-2.5 ${getStatusColor()} rounded-full`} />
    </div>
  );
}