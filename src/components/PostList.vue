<script setup lang="ts">
import PostItem from '@/components/PostItem.vue';
import type { Post } from '@/types';

interface Props {
  posts: Post[];
}

defineProps<Props>();
</script>

<template>
  <div v-if="posts.length > 0">
    <h3>Список постов</h3>
    <TransitionGroup name="post-list">
      <PostItem
        v-for="post in posts"
        v-bind:key="post.id"
        :post="post"
        @remove="$emit('remove', post)"
      />
    </TransitionGroup>
  </div>
  <h2 v-else style="color: red">Список постов пуст</h2>
</template>

<style scoped>
.post-list-move,
.post-list-enter-active,
.post-list-leave-active {
  transition: all 0.5s ease;
}

.post-list-enter-from,
.post-list-leave-to {
  opacity: 0;
  transform: translateX(130px);
}
.post-list-leave-active {
  position: absolute;
}
</style>
