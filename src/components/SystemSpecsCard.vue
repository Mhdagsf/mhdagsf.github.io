<script setup lang="ts">
import { Cpu } from 'lucide-vue-next';
import type { SystemSpec } from '../data/portfolio';

defineProps<{
  specs: SystemSpec[];
}>();
</script>

<template>
  <div class="brutalist-card bg-surface-container-highest flex flex-col">
    <div class="bg-surface-variant border-b-4 border-primary px-4 py-2 flex items-center gap-2">
      <span class="text-[10px] font-bold uppercase tracking-widest">BIOS_INFO.txt</span>
    </div>
    <div class="p-8 space-y-8">
      <div class="flex items-center gap-3">
        <Cpu class="text-accent-orange" :size="32" stroke-width="2.5" />
        <h2 class="text-2xl font-display font-bold uppercase">System Specs</h2>
      </div>

      <div class="space-y-4">
        <div v-for="item in specs" :key="item.label" class="bg-surface-container p-4 border-2 border-primary space-y-1">
          <span class="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">{{ item.label }}</span>
          <p class="text-sm font-bold">{{ item.value }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
