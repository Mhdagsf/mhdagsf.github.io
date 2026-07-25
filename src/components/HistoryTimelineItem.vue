<script setup lang="ts">
import type { HistoryItem } from '../data/portfolio';
import MacDots from './MacDots.vue';

defineProps<{
  item: HistoryItem;
  isLast: boolean;
}>();
</script>

<template>
  <div class="flex flex-col md:flex-row relative mb-16 last:mb-0">
    <div class="md:w-1/4 pt-6 pb-2 md:pr-12 text-left md:text-right space-y-2">
      <span
        class="inline-block px-3 py-1 text-[10px] font-bold tracking-widest border-2 border-primary hard-shadow"
        :class="item.active ? 'bg-accent-orange' : 'bg-surface-container text-on-surface-variant opacity-60'"
      >
        {{ item.duration }}
      </span>
      <div class="text-sm font-bold text-primary">{{ item.period }}</div>
    </div>

    <div class="hidden md:flex flex-col items-center w-16 relative">
      <div
        class="w-5 h-5 border-4 border-primary rounded-full z-10 bg-background shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
        :class="item.active ? 'bg-accent-orange' : 'bg-surface-container'"
      ></div>
      <div v-if="!isLast" class="absolute top-8 bottom-[-4rem] left-1/2 -translate-x-1/2 w-1 border-l-4 border-dotted border-primary opacity-30"></div>
    </div>

    <div class="md:w-3/4 md:pl-8 mt-4 md:mt-0">
      <div class="brutalist-card flex flex-col group bg-background overflow-hidden">
        <div class="h-10 border-b-4 border-primary px-4 flex items-center justify-between" :class="item.active ? 'bg-accent-orange' : 'bg-surface-container-highest'">
          <MacDots color-class="bg-white" />
          <span class="text-[9px] font-bold tracking-[0.2em] text-primary uppercase">{{ item.status }}</span>
        </div>

        <div class="p-8 space-y-6">
          <div>
            <h3 class="text-2xl font-display font-bold text-primary">{{ item.title }}</h3>
            <div class="flex items-center gap-2 mt-2 text-xs font-bold uppercase tracking-widest" :class="item.active ? 'text-accent-orange' : 'text-on-surface-variant opacity-60'">
              <component :is="item.icon" :size="14" />
              {{ item.company }}
            </div>
          </div>

          <p class="text-sm font-medium leading-relaxed opacity-90">{{ item.desc }}</p>

          <div class="flex flex-wrap gap-2.5 pt-4">
            <span
              v-for="tag in item.tags"
              :key="tag"
              class="px-3 py-1 border-2 border-primary rounded-full text-[9px] font-bold tracking-[0.15em] bg-surface-container uppercase"
            >
              {{ tag }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
