import { useState, useCallback } from 'react';

interface ConfirmationConfig {
  title?: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
}

export function useConfirmation() {
  const [config, setConfig] = useState<ConfirmationConfig | null>(null);
  const [resolve, setResolve] = useState<((value: boolean) => void) | null>(null);

  const confirm = useCallback((config: ConfirmationConfig) => {
    return new Promise<boolean>((res) => {
      setConfig(config);
      setResolve(() => res);
    });
  }, []);

  const handleConfirm = useCallback(() => {
    if (resolve) {
      resolve(true);
      setConfig(null);
      setResolve(null);
    }
  }, [resolve]);

  const handleCancel = useCallback(() => {
    if (resolve) {
      resolve(false);
      setConfig(null);
      setResolve(null);
    }
  }, [resolve]);

  return {
    config,
    confirm,
    handleConfirm,
    handleCancel
  };
}