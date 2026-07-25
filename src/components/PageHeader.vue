<script setup lang="ts">
withDefaults(
  defineProps<{
    title: string;
    subtitle: string;
    badge?: string;
    showDots?: boolean;
  }>(),
  {
    badge: '',
    showDots: false,
  },
);
</script>

<template>
  <header class="border-b-4 border-primary pb-8 md:pb-10 flex flex-col md:flex-row md:items-end justify-between gap-4 md:gap-6">
    <div class="space-y-3 md:space-y-4">
      <div v-if="badge" class="inline-block bg-primary text-white px-3 py-1 text-[10px] font-bold tracking-widest hard-shadow">
        {{ badge }}
      </div>
      <h1 class="text-4xl md:text-6xl font-display font-bold text-primary uppercase tracking-tighter">{{ title }}</h1>
      <p class="text-sm font-medium text-on-surface-variant max-w-2xl leading-relaxed">{{ subtitle }}</p>
    </div>

    <div v-if="showDots" class="hidden md:flex gap-3 pb-2">
      <span class="w-5 h-5 bg-accent-pink border-2 border-primary rounded-full shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"></span>
      <span class="w-5 h-5 bg-accent-yellow border-2 border-primary rounded-full shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"></span>
      <span class="w-5 h-5 bg-accent-green border-2 border-primary rounded-full shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"></span>
    </div>
  </header>
</template>
