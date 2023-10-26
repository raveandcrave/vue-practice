<script setup lang="ts">
import { ref } from 'vue';
import { RouterLink, RouterView } from 'vue-router';
import HelloWorld from './components/HelloWorld.vue';

// const likes = ref(0)
// const dislikes = ref(5)
// function addLike() {
//   likes.value++
// }

const posts = ref([
  { id: 1, title: 'Javascript', body: 'Описание поста' },
  { id: 2, title: 'Javascript 2', body: 'Описание поста 2' },
  { id: 3, title: 'Javascript 3', body: 'Описание поста 3' }
]);

const title = ref<string>('');
const body = ref<string>('');

const inputTitle = (event: Event) => {
  title.value = (event.target as HTMLInputElement).value;
};

const createPost = () => {
  const newPost = {
    id: Date.now(),
    title: title.value,
    body: body.value
  };

  posts.value.push(newPost);
  title.value = '';
  body.value = '';
};
</script>

<template>
  <div class="app">
    <form @submit.prevent class="form">
      <h4>Создание поста</h4>
      <input
        v-bind:value="title"
        @input="inputTitle"
        class="input"
        type="text"
        placeholder="Название"
      />
      <!-- Сокращенная запись -->
      <input
        :value="body"
        @input="body = ($event.target as HTMLInputElement).value"
        class="input"
        type="text"
        placeholder="Описание"
      />
      <button class="btn" @click="createPost">Создать</button>
    </form>
    <div class="post" v-for="post in posts" v-bind:key="post.id">
      <div><strong>Название:</strong>{{ post.title }}</div>
      <div><strong>Описание:</strong>{{ post.body }}</div>
    </div>
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

.form {
  display: flex;
  flex-direction: column;
}

.input {
  width: 100%;
  border: 1px solid teal;
  padding: 10px 15px;
  margin-top: 15px;
}

.btn {
  margin-top: 15px;
  align-self: flex-end;
  padding: 10px 15px;
  background: none;
  color: teal;
  border: 1px solid teal;
}

.post {
  padding: 15px;
  border: 2px solid teal;
  margin-top: 15px;
}
</style>
