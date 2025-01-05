export interface Post {
  id: number;
  content: string;
  created_at: number;
  user: {
    id: string;
    first_name: string;
    last_name: string;
    avatar?: string;
  };
  medias: Array<{
    url: string;
    type: string;
  }>;
  likes: Array<{
    user: string;
  }>;
  comments: Array<{
    id: number;
    text: string;
    created_time: number;
    user: {
      id: string;
      first_name: string;
      last_name: string;
      avatar?: string;
    };
  }>;
}

export interface PostActionProps {
  isLiked: boolean;
  likesCount: number;
  onLike: () => void;
  comment: string;
  onCommentChange: (value: string) => void;
  onCommentSubmit: (e: React.FormEvent) => void;
}

export interface PostGridProps {
  posts: Post[];
  currentUserId: string;
  refreshPublication: () => void;
}