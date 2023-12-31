<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import axios from 'axios';

import PostForm from '@/components/PostForm.vue';
import PostList from '@/components/PostList.vue';
import MyDialog from '@/components/ui/MyDialog.vue';
import MyButton from '@/components/ui/MyButton.vue';
import MySelect from '@/components/ui/MySelect.vue';
import MyInput from '@/components/ui/MyInput.vue';
// import MyPagination from '@/components/ui/MyPagination.vue';
import type { Post, SortOption, SortOptionValue } from '@/types';

const posts = ref<Post[]>([]);
const dialogVisible = ref(false);
const isPostLoading = ref(false);
const selectedSort = ref<SortOptionValue>('');
const searchQuery = ref<string>('');
const page = ref<number>(1);
const totalPages = ref<number>(0);
// const refObserver = ref<HTMLInputElement | null>(null);
const limit = 10;
const sortOptions: SortOption[] = [
  { value: 'title', name: 'По названию' },
  { value: 'body', name: 'По содержанию' }
];

onMounted(() => {
  fetchPosts();

  // const options = {
  //   rootMargin: '0px',
  //   threshold: 1.0
  // };

  // const callback = (entries: IntersectionObserverEntry[]) => {
  //   if (entries[0].isIntersecting && page.value < totalPages.value) {
  //     loadMorePosts();
  //   }
  // };

  // const observer = new IntersectionObserver(callback, options);

  // if (refObserver.value) {
  //   observer.observe(refObserver.value);
  // }
});

// watch(page, () => {
//   fetchPosts();
// });

//Вариант сортировки с watcher и мутацией исходного массива
// watch(selectedSort, (newSelectedSort) => {
//   if (newSelectedSort !== '') {
//     posts.value.sort((post1, post2) => {
//       return post1[newSelectedSort].localeCompare(post2[newSelectedSort]);
//     });
//   }
// });

//Вариант сортировки с computed и созданием нового массива
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

const sortedAndSearchedPosts = computed(() => {
  return sortedPosts.value.filter((post) =>
    post.title.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

const fetchPosts = async () => {
  try {
    isPostLoading.value = true;
    const response = await axios.get<Post[]>('https://jsonplaceholder.typicode.com/posts', {
      params: {
        _page: page.value,
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

const loadMorePosts = async () => {
  try {
    page.value += 1;
    const response = await axios.get<Post[]>('https://jsonplaceholder.typicode.com/posts', {
      params: {
        _page: page.value,
        _limit: limit
      }
    });

    totalPages.value = Math.ceil(response.headers['x-total-count'] / limit);
    posts.value = [...posts.value, ...response.data];
  } catch (error) {
    alert('Ошибка');
  }
};

const createPost = (post: Post) => {
  posts.value.push(post);
  dialogVisible.value = false;
};

const removePost = (post: Post) => {
  posts.value = posts.value.filter((item) => item.id !== post.id);
};

const showDialog = () => {
  dialogVisible.value = true;
};
</script>

<template>
  <div>
    <h1>Страница с постами</h1>
    <MyInput v-model="searchQuery" placeholder="Поиск..." />
    <div class="app__btns">
      <MyButton @click="showDialog">Создать пост</MyButton>
      <MySelect v-model="selectedSort" :options="sortOptions" />
    </div>
    <MyDialog v-model:show="dialogVisible">
      <PostForm @create="createPost" />
    </MyDialog>
    <PostList v-if="!isPostLoading" @remove="removePost" :posts="sortedAndSearchedPosts" />
    <div v-else>Идет загрузка...</div>
    <div v-intersection="loadMorePosts" class="observer"></div>
    <!-- <MyPagination :total-pages="totalPages" v-model:current-page="page" /> -->
  </div>
</template>

<style>
.app__btns {
  display: flex;
  justify-content: space-between;
  margin: 15px 0;
}

.observer {
  height: 30px;
  background: green;
}
</style>
