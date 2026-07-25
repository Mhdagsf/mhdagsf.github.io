<script setup lang="ts">
import { X } from 'lucide-vue-next';
import MacDots from './MacDots.vue';

withDefaults(
  defineProps<{
    title: string;
    variant?: 'primary' | 'light';
    showClose?: boolean;
  }>(),
  {
    variant: 'primary',
    showClose: true,
  },
);
</script>

<template>
  <div
    class="border-b-4 border-primary px-4 py-2 flex items-center justify-between transition-colors duration-200"
    :class="variant === 'primary' ? 'bg-primary text-on-primary' : 'bg-background text-primary'"
  >
    <MacDots :color-class="variant === 'primary' ? 'bg-background' : 'bg-white'" />
    <span class="text-[10px] font-bold tracking-widest uppercase">{{ title }}</span>
    <button
      v-if="showClose"
      class="w-4 h-4 border border-primary bg-primary cursor-pointer hover:bg-accent-pink transition-colors flex items-center justify-center"
      aria-label="Close window"
    >
      <X :size="10" class="text-white" />
    </button>
    <span v-else class="w-4 h-4"></span>
  </div>
</template>
