<script setup lang="ts">
interface Props {
  show: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  show: true
});

const emit = defineEmits<{
  (e: 'update:show', show: boolean): void;
}>();

const hideDialog = () => {
  emit('update:show', false);
};
</script>

<template>
  <div class="dialog" v-if="show" @click="hideDialog">
    <div @click.stop class="dialog__content">
      <slot></slot>
    </div>
  </div>
</template>

<style scoped>
.dialog {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  display: flex;
}

.dialog__content {
  margin: auto;
  background: white;
  border-radius: 12px;
  min-height: 50px;
  min-width: 300px;
  padding: 20px;
}
</style>
