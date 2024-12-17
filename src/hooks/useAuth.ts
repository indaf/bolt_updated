import { useCallback } from 'react';
import { useAuthStore } from '../store/authStore';
import { useNavigate } from './useNavigate';

export function useAuth() {
  const { user, login, logout, isAuthenticated } = useAuthStore();
  const { navigateTo } = useNavigate();

  const handleLogin = useCallback(async (email: string, password: string) => {
    const result = login(email, password);
    if (result.success) {
      navigateTo('dashboard');
    }
    return result;
  }, [login, navigateTo]);

  const handleLogout = useCallback(() => {
    logout();
    navigateTo('home');
  }, [logout, navigateTo]);

  return {
    user,
    isAuthenticated,
    login: handleLogin,
    logout: handleLogout
  };
}