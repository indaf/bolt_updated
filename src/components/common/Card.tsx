import React from 'react';
import { LucideIcon } from 'lucide-react';

interface CardProps {
  title?: string;
  description?: string;
  icon?: LucideIcon;
  iconColor?: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export const Card = React.memo(({
  title,
  description,
  icon: Icon,
  iconColor = '#009B70',
  children,
  className = '',
  onClick
}: CardProps) => {
  return (
    <div 
      className={`bg-[#202123] rounded-lg p-6 ${onClick ? 'cursor-pointer hover:bg-[#2A2B32] transition-colors' : ''} ${className}`}
      onClick={onClick}
    >
      {(Icon || title || description) && (
        <div className="mb-4">
          {Icon && (
            <div className={`w-12 h-12 rounded-lg bg-[${iconColor}]/20 flex items-center justify-center mb-4`}>
              <Icon className={`w-6 h-6 text-[${iconColor}]`} />
            </div>
          )}
          {title && (
            <h3 className="text-lg font-medium text-white mb-1">{title}</h3>
          )}
          {description && (
            <p className="text-sm text-gray-400">{description}</p>
          )}
        </div>
      )}
      {children}
    </div>
  );
});

Card.displayName = 'Card';