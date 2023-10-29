<script setup lang="ts">
interface Option {
  value: string;
  name: string;
}

interface Props {
  modelValue: string;
  options: Option[];
}

withDefaults(defineProps<Props>(), {
  options: () => []
});

const emit = defineEmits<{
  (e: 'update:modelValue', modelValue: string | number): void;
}>();

const changeOptions = (event: Event) => {
  emit('update:modelValue', (event.target as HTMLSelectElement).value);
};
</script>

<template>
  <select :value="modelValue" @change="changeOptions">
    <option disabled value="">Выберите из списка</option>
    <option v-for="option in options" :key="option.value" :value="option.value">
      {{ option.name }}
    </option>
  </select>
</template>
