import React from 'react';
import { X } from 'lucide-react';
import { Button } from './Button';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const Modal = React.memo(({
  isOpen,
  onClose,
  title,
  children,
  footer,
  size = 'md'
}: ModalProps) => {
  if (!isOpen) return null;

  const sizeClasses = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl'
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className={`bg-[#202123] rounded-lg w-full ${sizeClasses[size]} relative max-h-[90vh] flex flex-col`}>
        <div className="flex-none p-6 border-b border-[#343541]">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-white">{title}</h2>
            <Button
              variant="ghost"
              size="sm"
              icon={X}
              onClick={onClose}
              aria-label="Fermer"
            />
          </div>
        </div>

        <div className="flex-1 p-6 overflow-y-auto">
          {children}
        </div>

        {footer && (
          <div className="flex-none p-6 border-t border-[#343541]">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
});

Modal.displayName = 'Modal';