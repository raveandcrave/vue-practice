<script setup lang="ts">
import { ref } from 'vue';

import PostForm from '@/components/PostForm.vue';
import PostList from '@/components/PostList.vue';
import MyDialog from './components/ui/MyDialog.vue';
import type { Post } from './types';
import MyButton from './components/ui/MyButton.vue';

const posts = ref<Post[]>([
  { id: 1, title: 'Javascript', body: 'Описание поста' },
  { id: 2, title: 'Javascript 2', body: 'Описание поста 2' },
  { id: 3, title: 'Javascript 3', body: 'Описание поста 3' }
]);

const dialogVisible = ref(false);

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
  <div class="app">
    <h1>Страница с постами</h1>
    <MyButton @click="showDialog" style="margin: 15px 0">Создать пост</MyButton>
    <MyDialog v-model:show="dialogVisible">
      <PostForm @create="createPost" />
    </MyDialog>
    <PostList @remove="removePost" :posts="posts" />
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
