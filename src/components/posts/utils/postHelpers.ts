import { Post } from '../types';

export const isTextPost = (post: Post): boolean => {
  return post.medias?.length === 1 && !post.content;
};

export const getPostStats = (post: Post, currentUserId: string) => {
  return {
    isLiked: post.likes.some(like => like.user === currentUserId),
    likesCount: post.likes.length,
    commentsCount: post.comments.length
  };
};

export const formatPostText = (text: string, maxLength: number = 140): string => {
  if (text.length <= maxLength) return text;
  return `${text.substring(0, maxLength)}...`;
};