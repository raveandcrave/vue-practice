<script setup lang="ts">
import type { Post } from '@/types';

interface Props {
  post: Post;
}

defineProps<Props>();
</script>

<template>
  <div class="post">
    <div><strong>Название:</strong>{{ post.title }}</div>
    <div><strong>Описание:</strong>{{ post.body }}</div>
  </div>
</template>

<style scoped>
.post {
  padding: 15px;
  border: 2px solid teal;
  margin-top: 15px;
}
</style>
