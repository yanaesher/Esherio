export type Post = {
  id: string;
  author_id: string | null;
  title: string | null;
  content: string | null;
  image_url: string | null;
  created_at: string;
};

export type UserProfile = {
  id: string;
  nickname: string;
  avatar_url: string;
};
