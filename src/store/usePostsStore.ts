import { defineStore } from 'pinia';
import axios from 'axios';

import type { Post, SortOption, SortOptionValue } from '@/types';

interface PostsState {
  posts: Post[];
  isPostLoading: boolean;
  selectedSort: SortOptionValue;
  searchQuery: string;
  page: number;
  totalPages: number;
  limit: number;
  sortOptions: SortOption[];
}

export const usePostsStore = defineStore('posts', {
  state: (): PostsState => ({
    posts: [],
    isPostLoading: false,
    selectedSort: '',
    searchQuery: '',
    page: 1,
    limit: 10,
    totalPages: 0,
    sortOptions: [
      { value: 'title', name: 'По названию' },
      { value: 'body', name: 'По содержанию' }
    ]
  }),
  getters: {
    sortedPosts(state) {
      if (state.selectedSort === '') {
        return [...state.posts];
      } else {
        return [...state.posts].sort(
          //@ts-ignore
          (post1, post2) => post1[state.selectedSort]?.localeCompare(post2[state.selectedSort])
        );
      }
    },
    sortedAndSearchedPosts(state): Post[] {
      return this.sortedPosts.filter((post) =>
        post.title.toLowerCase().includes(state.searchQuery.toLowerCase())
      );
    }
  },
  actions: {
    async fetchPosts() {
      try {
        this.isPostLoading = true;
        const response = await axios.get<Post[]>('https://jsonplaceholder.typicode.com/posts', {
          params: {
            _page: this.page,
            _limit: this.limit
          }
        });
        this.totalPages = Math.ceil(response.headers['x-total-count'] / this.limit);
        this.posts = response.data;
      } catch (e) {
        console.log(e);
      } finally {
        this.isPostLoading = false;
      }
    },
    async loadMorePosts() {
      try {
        this.page += 1;
        const response = await axios.get<Post[]>('https://jsonplaceholder.typicode.com/posts', {
          params: {
            _page: this.page,
            _limit: this.limit
          }
        });
        this.totalPages = Math.ceil(response.headers['x-total-count'] / this.limit);
        this.posts = [...this.posts, ...response.data];
      } catch (e) {
        console.log(e);
      }
    }
  }
});
