<script setup lang="ts">
import { ref } from 'vue';
import axios from 'axios';

import PostForm from '@/components/PostForm.vue';
import PostList from '@/components/PostList.vue';
import MyDialog from '@/components/ui/MyDialog.vue';
import MyButton from '@/components/ui/MyButton.vue';
import MySelect from '@/components/ui/MySelect.vue';
import MyInput from '@/components/ui/MyInput.vue';
import usePosts from '@/hooks/usePosts';
import useSortedPosts from '@/hooks/useSortedPosts';
import useSortedAndSearchedPosts from '@/hooks/useSortedAndSearchedPosts';
import type { Post, SortOption } from '@/types';

const dialogVisible = ref(false);
const page = ref<number>(1);
const limit = 10;
const sortOptions: SortOption[] = [
  { value: 'title', name: 'По названию' },
  { value: 'body', name: 'По содержанию' }
];

const { posts, isPostLoading, totalPages } = usePosts(limit, page.value);
const { sortedPosts, selectedSort } = useSortedPosts(posts);
const { sortedAndSearchedPosts, searchQuery } = useSortedAndSearchedPosts(sortedPosts);

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
