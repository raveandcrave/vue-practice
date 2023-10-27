<script setup lang="ts">
import { ref } from 'vue';

import PostForm from '@/components/PostForm.vue';
import PostList from '@/components/PostList.vue';
import type { Post } from './types';

const posts = ref([
  { id: 1, title: 'Javascript', body: 'Описание поста' },
  { id: 2, title: 'Javascript 2', body: 'Описание поста 2' },
  { id: 3, title: 'Javascript 3', body: 'Описание поста 3' }
]);

const createPost = (post: Post) => {
  posts.value.push(post);
};
</script>

<template>
  <div class="app">
    <PostForm @create="createPost" />
    <PostList :posts="posts" />
  </div>
</template>

<style>
*,
*::after,
*::before {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.app {
  padding: 20px;
}
</style>
