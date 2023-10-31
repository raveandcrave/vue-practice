import { ref, computed } from 'vue';
import type { Ref } from 'vue';

import type { Post, SortOptionValue } from '@/types';

export default function useSortedPosts(posts: Ref<Post[]>) {
  const selectedSort = ref<SortOptionValue>('');

  const sortedPosts = computed(() => {
    if (selectedSort.value === '') {
      return [...posts.value];
    } else {
      return [...posts.value].sort((post1, post2) =>
        //@ts-ignore
        post1[selectedSort.value].localeCompare(post2[selectedSort.value])
      );
    }
  });

  return {
    selectedSort,
    sortedPosts
  };
}
