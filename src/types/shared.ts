export type Post = {
  id: string;
  author_id: string;
  title: string;
  content: string;
};

export type UserProfile = {
  id: string;
  nickname: string;
  avatar_url: string;
};

export type Message = {
  id: string;
  sender_id: string;
  receiver_id: string;
  content: string;
  created_at: string;
};
