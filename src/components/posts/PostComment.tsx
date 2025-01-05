import React, { memo } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';
import { UserAvatar } from '../UserAvatar';

interface PostCommentProps {
  comment: any;
}

export const PostComment = memo(function PostComment({ comment }: PostCommentProps) {
  return (
    <div className="flex gap-3">
      <UserAvatar user={comment.user} size="sm" />
      <div>
        <span className="font-medium text-white">
          {comment.user.first_name} {comment.user.last_name}
        </span>
        <p className="text-gray-300 mt-1">{comment.text}</p>
        <p className="text-xs text-gray-500 mt-1">
          {formatDistanceToNow(comment.created_time, {
            addSuffix: true,
            locale: fr,
          })}
        </p>
      </div>
    </div>
  );
});