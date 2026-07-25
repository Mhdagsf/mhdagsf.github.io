<script setup lang="ts">
import type { Component } from 'vue';
import { X } from 'lucide-vue-next';

withDefaults(
  defineProps<{
    label: string;
    icon: Component;
    variant?: 'github' | 'linkedin';
    url?: string; // 1. Tambahkan properti url di sini agar bisa menerima link
  }>(),
  {
    variant: 'github',
    url: '#', // Default jika lupa isi link
  },
);
</script>

<template>
  <!-- 2. Ubah <div> paling luar menjadi tag <a> dan tambahkan :href serta target="_blank" -->
  <a
    :href="url"
    target="_blank"
    rel="noopener noreferrer"
    class="hidden sm:block absolute border-4 border-primary shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] rounded-[24px] p-4 md:p-5 hover:rotate-0 hover:-translate-y-1 transition-all cursor-pointer z-20 group text-inherit no-underline block"
    :class="
      variant === 'github'
        ? 'top-4 left-0 md:-left-4 w-32 md:w-36 bg-background rotate-[-6deg]'
        : 'bottom-10 right-0 md:-right-4 w-36 md:w-40 bg-accent-pink rotate-[4deg]'
    "
  >
    <template v-if="variant === 'github'">
      <div class="flex items-center gap-2 mb-2 md:mb-3">
        <div
          class="w-3 h-3 rounded-full bg-accent-pink border-2 border-primary"
        ></div>
        <div
          class="w-2 h-2 md:w-3 md:h-3 rounded-full bg-accent-yellow border-2 border-primary"
        ></div>
      </div>
      <div class="flex justify-center my-2 md:my-3">
        <component
          :is="icon"
          :size="24"
          class="md:hidden group-hover:text-accent-pink transition-colors"
        />
        <component
          :is="icon"
          :size="32"
          class="hidden md:block group-hover:text-accent-pink transition-colors"
        />
      </div>
    </template>

    <template v-else>
      <div
        class="flex justify-between items-center mb-2 md:mb-3 border-b-2 border-primary/20 pb-2"
      >
        <span
          class="text-[9px] md:text-[10px] font-bold tracking-widest uppercase"
          >CONNECT</span
        >
        <X :size="14" />
      </div>
      <div class="flex justify-center my-3 md:my-4">
        <component
          :is="icon"
          :size="32"
          class="md:hidden group-hover:scale-110 transition-transform"
        />
        <component
          :is="icon"
          :size="40"
          class="hidden md:block group-hover:scale-110 transition-transform"
        />
      </div>
    </template>

    <div
      class="text-center text-[9px] md:text-[10px] font-bold tracking-widest uppercase"
    >
      {{ label }}
    </div>
  </a>
</template>
