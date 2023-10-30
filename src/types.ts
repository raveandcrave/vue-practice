export interface Post {
  title: string;
  body: string;
  id: number;
}

export interface Option {
  value: string;
  name: string;
}

export type SortOptionValue = 'title' | 'body' | '';

export interface SortOption extends Option {
  value: SortOptionValue;
}
