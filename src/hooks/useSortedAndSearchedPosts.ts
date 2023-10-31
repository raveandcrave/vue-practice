import { ref, computed } from 'vue';
import type { Ref } from 'vue';

import type { Post } from '@/types';

export default function useSortedAndSearchedPosts(sortedPosts: Ref<Post[]>) {
  const searchQuery = ref('');

  const sortedAndSearchedPosts = computed(() => {
    return sortedPosts.value.filter((post) =>
      post.title.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
  });

  return {
    searchQuery,
    sortedAndSearchedPosts
  };
}
