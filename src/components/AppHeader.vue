<script setup lang="ts">
import { Moon, Power, Sun } from 'lucide-vue-next';

defineProps<{
  isDark: boolean;
  isSidebarOpen: boolean;
}>();

defineEmits<{
  'toggle-sidebar': [];
  'toggle-theme': [];
}>();
</script>

<template>
  <header class="h-16 border-b-4 border-primary px-4 md:px-10 flex items-center justify-between bg-background shrink-0 z-50">
    <div class="flex items-center gap-3 md:gap-4">
      <button
        class="w-10 h-10 flex flex-col items-center justify-center gap-1.5 hover:bg-surface-container rounded transition-colors focus:outline-none"
        aria-label="Toggle Sidebar"
        title="Toggle Sidebar Menu"
        @click="$emit('toggle-sidebar')"
      >
        <span
          class="w-6 h-0.5 bg-primary transition-all duration-300 origin-center"
          :class="isSidebarOpen ? 'rotate-45 translate-y-2' : ''"
        ></span>
        <span
          class="w-6 h-0.5 bg-primary transition-all duration-300 origin-center"
          :class="isSidebarOpen ? 'opacity-0 scale-x-0' : 'opacity-100'"
        ></span>
        <span
          class="w-6 h-0.5 bg-primary transition-all duration-300 origin-center"
          :class="isSidebarOpen ? '-rotate-45 -translate-y-2' : ''"
        ></span>
      </button>
      <span class="text-lg md:text-xl font-display font-bold tracking-tight">PORTFOLIO_OS_V1.0</span>
    </div>

    <div class="flex items-center gap-2">
      <button
        class="p-2 hover:bg-surface-container rounded transition-colors"
        :title="isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'"
        @click="$emit('toggle-theme')"
      >
        <component :is="isDark ? Sun : Moon" :size="20" />
      </button>
      <button class="p-2 hover:bg-surface-container rounded transition-colors" aria-label="Power">
        <Power :size="20" />
      </button>
    </div>
  </header>
</template>
