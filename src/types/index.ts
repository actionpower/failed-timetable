export interface Image {
  id: string;
  url: string;
  email: string;
  created_at: string;
  likes_count: number;
}

export type SortOrder = 'likes' | 'recent';