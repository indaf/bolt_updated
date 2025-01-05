import React, { createContext, useContext, useCallback } from 'react';
import { Post } from '../types';
import { usePost } from '../hooks/usePost';
import { useMediaUpload } from '../hooks/useMediaUpload';
import { usePostValidation } from '../hooks/usePostValidation';

interface PostContextType {
  handleLike: (postId: number) => Promise<void>;
  handleComment: (postId: number, comment: string) => Promise<void>;
  isUploading: boolean;
  createPreview: (file: File) => Promise<string>;
  optimizeImage: (file: File) => Promise<File>;
  validateTextPost: (text: string) => { isValid: boolean; errors: string[] };
  validateMediaPost: (medias: File[], description: string) => { isValid: boolean; errors: string[] };
}

const PostContext = createContext<PostContextType | null>(null);

export function PostProvider({ children, refreshPublication }: { children: React.ReactNode; refreshPublication: () => void }) {
  const { handleLike, handleComment } = usePost(refreshPublication);
  const { isUploading, createPreview, optimizeImage } = useMediaUpload();
  const { validateTextPost, validateMediaPost } = usePostValidation();

  const value = {
    handleLike,
    handleComment,
    isUploading,
    createPreview,
    optimizeImage,
    validateTextPost,
    validateMediaPost
  };

  return (
    <PostContext.Provider value={value}>
      {children}
    </PostContext.Provider>
  );
}

export function usePostContext() {
  const context = useContext(PostContext);
  if (!context) {
    throw new Error('usePostContext must be used within a PostProvider');
  }
  return context;
}