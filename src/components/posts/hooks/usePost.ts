import { useState } from 'react';
import { addLike } from '../../../services/Like/like.service';
import { addComment } from '../../../services/Comment/comment.service';
import { notifyError } from '../../../helpers/Notify.helper';

export function usePost(refreshPublication: () => void) {
  const [comment, setComment] = useState('');

  const handleLike = async (postId: number) => {
    try {
      await addLike({ publication_id: postId });
      refreshPublication();
    } catch (error) {
      console.error(error);
      notifyError("Erreur lors de l'ajout du like");
    }
  };

  const handleComment = async (postId: number, commentText: string) => {
    if (!commentText.trim()) return;

    try {
      await addComment({ publication_id: postId, text: commentText });
      setComment('');
      refreshPublication();
    } catch (error) {
      console.error(error);
      notifyError("Erreur lors de l'ajout du commentaire");
    }
  };

  return {
    comment,
    setComment,
    handleLike,
    handleComment
  };
}