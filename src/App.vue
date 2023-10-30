<script setup lang="ts">
import { RouterView } from 'vue-router';

import NavBar from '@/components/NavBar.vue';
</script>

<template>
  <NavBar />
  <div class="app">
    <RouterView></RouterView>
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
