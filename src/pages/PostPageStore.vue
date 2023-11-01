<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

import PostForm from '@/components/PostForm.vue';
import PostList from '@/components/PostList.vue';
import MyDialog from '@/components/ui/MyDialog.vue';
import MyButton from '@/components/ui/MyButton.vue';
import MySelect from '@/components/ui/MySelect.vue';
import MyInput from '@/components/ui/MyInput.vue';
import { usePostsStore } from '@/store/usePostsStore';
import type { Post } from '@/types';

const store = usePostsStore();

const dialogVisible = ref(false);

onMounted(() => {
  store.fetchPosts();
});

onUnmounted(() => {
  store.$reset();
});

const createPost = (post: Post) => {
  store.posts.push(post);
  dialogVisible.value = false;
};

const removePost = (post: Post) => {
  store.posts = store.posts.filter((item) => item.id !== post.id);
};

const showDialog = () => {
  dialogVisible.value = true;
};
</script>

<template>
  <div>
    <h1>Страница с постами</h1>
    <MyInput v-model="store.searchQuery" placeholder="Поиск..." />
    <div class="app__btns">
      <MyButton @click="showDialog">Создать пост</MyButton>
      <MySelect v-model="store.selectedSort" :options="store.sortOptions" />
    </div>
    <MyDialog v-model:show="dialogVisible">
      <PostForm @create="createPost" />
    </MyDialog>
    <PostList
      v-if="!store.isPostLoading"
      @remove="removePost"
      :posts="store.sortedAndSearchedPosts"
    />
    <div v-else>Идет загрузка...</div>
    <div v-intersection="store.loadMorePosts" class="observer"></div>
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
