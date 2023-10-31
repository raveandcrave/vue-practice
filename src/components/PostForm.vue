<script setup lang="ts">
import { ref } from 'vue';
import type { Post } from '@/types';
import MyButton from '@/components/ui/MyButton.vue';
import MyInput from '@/components/ui/MyInput.vue';

const emit = defineEmits<{
  (e: 'create', post: Post): void;
}>();

const post = ref<Post>({
  title: '',
  body: '',
  id: 0
});

const createPost = () => {
  post.value.id = Date.now();

  emit('create', post.value);

  post.value = {
    title: '',
    body: '',
    id: 0
  };
};
</script>

<template>
  <form @submit.prevent class="form">
    <h4>Создание поста</h4>
    <MyInput v-focus v-model="post.title" placeholder="Название" />
    <MyInput v-model="post.body" placeholder="Описание" />
    <MyButton @click="createPost" style="align-self: flex-end; margin-top: 15px">Создать</MyButton>
  </form>
</template>

<style scoped>
.form {
  display: flex;
  flex-direction: column;
}
</style>
