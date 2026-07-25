<script setup lang="ts">
import { Wrench } from 'lucide-vue-next';
import type { Skill } from '../data/portfolio';

defineProps<{
  skills: Skill[];
}>();
</script>

<template>
  <div class="flex flex-col gap-6">
    <div class="brutalist-card bg-surface-container p-4 py-3 flex items-center gap-2">
      <Wrench :size="18" />
      <span class="text-[10px] font-bold uppercase tracking-widest">LOADED_MODULES</span>
    </div>

    <div class="grid grid-cols-2 gap-4">
      <div
        v-for="skill in skills"
        :key="skill.name"
        class="brutalist-card bg-surface-container-highest p-6 flex flex-col items-center justify-center gap-3 group cursor-pointer hover:shadow-[4px_4px_0px_0px_var(--shadow-color)] transition-all"
      >
        <div
          class="w-12 h-12 rounded-full border-2 border-primary flex items-center justify-center transition-colors group-hover:text-white"
          :class="skill.accent"
        >
          <component :is="skill.icon" :size="24" />
        </div>
        <span class="text-[10px] font-bold uppercase tracking-widest">{{ skill.name }}</span>
      </div>
    </div>
  </div>
</template>
