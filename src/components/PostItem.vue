<script setup lang="ts">
import type { Post } from '@/types';
import MyButton from '@/components/ui/MyButton.vue';

interface Props {
  post: Post;
}

defineProps<Props>();
</script>

<template>
  <div class="post">
    <div>
      <div>{{ post.id }}</div>
      <div><strong>Название:</strong>{{ post.title }}</div>
      <div><strong>Описание:</strong>{{ post.body }}</div>
    </div>
    <div class="post__btns">
      <MyButton @click="$router.push(`/posts/${post.id}`)">Открыть</MyButton>
      <MyButton @click="$emit('remove', post)">Удалить</MyButton>
    </div>
  </div>
</template>

<style scoped>
.post {
  padding: 15px;
  border: 2px solid teal;
  margin-top: 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.post__btns {
  display: flex;
  gap: 20px;
}
</style>
