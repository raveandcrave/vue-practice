<script setup lang="ts">
interface Props {
  totalPages: number;
  currentPage: number;
}

defineProps<Props>();

defineEmits<{
  (e: 'update:currentPage', currentPage: number): void;
}>();
</script>

<template>
  <div class="page__wrapper">
    <div
      v-for="pageNumber in totalPages"
      :key="pageNumber"
      class="page"
      :class="{
        'current-page': pageNumber === currentPage
      }"
      @click="$emit('update:currentPage', pageNumber)"
    >
      {{ pageNumber }}
    </div>
  </div>
</template>

<style scoped>
.page__wrapper {
  display: flex;
  gap: 10px;
  margin-top: 15px;
}

.page {
  border: 1px solid black;
  padding: 10px;
  cursor: pointer;
}

.current-page {
  border: 2px solid teal;
}
</style>
