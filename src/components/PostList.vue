<script setup lang="ts">
import PostItem from '@/components/PostItem.vue';
import type { Post } from '@/types';

interface Props {
  posts: Post[];
}

defineProps<Props>();
</script>

<template>
  <div>
    <h3>Список постов</h3>
    <PostItem v-for="post in posts" v-bind:key="post.id" :post="post" />
  </div>
</template>
