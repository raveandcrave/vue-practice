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
    <PostItem
      v-for="post in posts"
      v-bind:key="post.id"
      :post="post"
      @remove="$emit('remove', post)"
    />
  </div>
  <h2 v-else style="color: red">Список постов пуст</h2>
</template>
