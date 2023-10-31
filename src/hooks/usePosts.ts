import { ref, onMounted } from 'vue';
import axios from 'axios';

import type { Post } from '@/types';

export default function usePosts(limit: number, page: number) {
  const posts = ref<Post[]>([]);
  const totalPages = ref(0);
  const isPostLoading = ref(true);

  const fetching = async () => {
    try {
      const response = await axios.get<Post[]>('https://jsonplaceholder.typicode.com/posts', {
        params: {
          _page: page,
          _limit: limit
        }
      });

      totalPages.value = Math.ceil(response.headers['x-total-count'] / limit);
      posts.value = response.data;
    } catch (error) {
      alert('Ошибка');
    } finally {
      isPostLoading.value = false;
    }
  };

  onMounted(fetching);

  return {
    posts,
    isPostLoading,
    totalPages
  };
}
