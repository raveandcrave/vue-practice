<script setup lang="ts">
import MyButton from '@/components/ui/MyButton.vue';
</script>

<template>
  <nav class="navbar">
    <div>Vue 3</div>
    <div class="navbar__btns">
      <MyButton @click="$router.push('/posts')">Посты</MyButton>
      <MyButton @click="$router.push('/hook')">Hooks</MyButton>
      <MyButton @click="$router.push('/about')">О сайте</MyButton>
    </div>
  </nav>
</template>

<style scoped>
.navbar {
  height: 50px;
  background-color: lightgray;
  box-shadow: 2px 2px 4px gray;
  display: flex;
  align-items: center;
  padding: 15px;
}

.navbar__btns {
  margin-left: auto;
  display: flex;
  gap: 20px;
}
</style>
