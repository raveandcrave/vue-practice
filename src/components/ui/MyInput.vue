<script setup lang="ts">
interface Props {
  modelValue: string | number;
}

defineProps<Props>();

const emit = defineEmits<{
  (e: 'update:modelValue', modelValue: string | number): void;
}>();

const updateInput = (event: Event) => {
  emit('update:modelValue', (event.target as HTMLInputElement).value);
};
</script>

<template>
  <input
    :value="modelValue"
    @input="updateInput"
    class="input"
    type="text"
    placeholder="Название"
  />
</template>

<style scoped>
.input {
  width: 100%;
  border: 1px solid teal;
  padding: 10px 15px;
  margin-top: 15px;
}
</style>
