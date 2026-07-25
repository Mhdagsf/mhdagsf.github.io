<template>
  <div class="flex gap-2">
    <span
      v-for="dot in renderedDots"
      :key="dot.key"
      :class="[sizeClass, dot.color]"
      class="rounded-full border-2 border-primary"
    ></span>
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    size?: 'sm' | 'md';
    colorClass?: string;
    traffic?: boolean;
  }>(),
  {
    size: 'sm',
    colorClass: 'bg-background',
    traffic: false,
  },
);

const sizeClass = props.size === 'md' ? 'w-4 h-4' : 'w-3 h-3';
const renderedDots = props.traffic
  ? [
      { key: 'pink', color: 'bg-accent-pink shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]' },
      { key: 'yellow', color: 'bg-accent-yellow shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]' },
      { key: 'green', color: 'bg-accent-green shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]' },
    ]
  : [1, 2, 3].map((key) => ({ key: String(key), color: props.colorClass }));
</script>
