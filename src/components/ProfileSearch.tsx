import React, { useState, useRef, useEffect } from 'react';
import { Search, User } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { useNavigate } from '../hooks/useNavigate';
import { UserCard } from './UserCard';

export function ProfileSearch() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const { users } = useAuthStore();
  const { goToProfile } = useNavigate();
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredUsers = users
    .filter(user => {
      const searchValue = searchTerm.toLowerCase();
      return (
        user.firstName.toLowerCase().includes(searchValue) ||
        user.lastName.toLowerCase().includes(searchValue) ||
        user.uniqueId.toLowerCase().includes(searchValue)
      );
    })
    .slice(0, 5);

  const handleSelect = (userId: string) => {
    goToProfile(userId);
    setIsOpen(false);
    setSearchTerm('');
  };

  return (
    <div ref={searchRef} className="relative w-full">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          placeholder="Rechercher un profil..."
          className="w-full pl-9 pr-3 py-1.5 bg-[#2A2B32] border border-gray-700 rounded-lg
                   text-sm text-white placeholder-gray-400 focus:outline-none focus:border-[#009B70]"
        />
      </div>

      {isOpen && searchTerm && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-[#202123] rounded-lg shadow-lg border border-[#343541] overflow-hidden z-50">
          {filteredUsers.length > 0 ? (
            <div className="py-2">
              {filteredUsers.map(user => (
                <div key={user.id} onClick={() => handleSelect(user.id)}>
                  <UserCard userId={user.id} compact />
                </div>
              ))}
            </div>
          ) : (
            <div className="p-4 text-center">
              <User className="w-5 h-5 mx-auto mb-2 text-gray-400" />
              <p className="text-sm text-gray-400">Aucun utilisateur trouvé</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}