<script setup lang="ts">
import { computed } from 'vue';
import { profile, type NavTab, type SidebarLink } from '../data/portfolio';

defineProps<{
  activeTab: NavTab;
  isOpen: boolean;
  links: SidebarLink[];
}>();

defineEmits<{
  close: [];
  select: [tab: NavTab];
}>();

const computedAvatarUrl = computed(() => {
  // @ts-ignore
  const base = import.meta.env.BASE_URL || '/';
  const cleanPath = profile.avatarUrl.replace(/^\//, '');
  return `${base}${cleanPath}`;
});
</script>

<template>
  <!-- Mobile overlay -->
  <div
    v-if="isOpen"
    class="lg:hidden fixed inset-0 bg-primary/20 backdrop-blur-sm z-30"
    @click="$emit('close')"
  ></div>

  <aside
    class="border-primary bg-surface-container flex flex-col shrink-0 fixed lg:static inset-y-0 left-0 z-40 transition-all duration-300 overflow-hidden"
    :class="
      isOpen
        ? 'w-64 border-r-4 translate-x-0'
        : 'w-0 border-r-0 -translate-x-full'
    "
  >
    <div class="w-64 h-full flex flex-col shrink-0">

      <!-- Profile Block -->
      <div class="flex flex-col border-b-4 border-primary bg-surface-container-highest px-5 py-5 items-center">
        <!-- Polaroid Card — group for hover effect -->
        <div class="group w-full border-4 border-primary shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] bg-background cursor-pointer">
          <!-- Photo area -->
          <div class="w-full overflow-hidden relative" style="aspect-ratio: 1/1;">
            <img
              :src="computedAvatarUrl"
              alt="Avatar"
              class="w-full h-full object-cover object-top filter contrast-125 grayscale transition-all duration-500 group-hover:grayscale-0 group-hover:contrast-100 group-hover:scale-105"
            />
            <!-- Scanline overlay — fades out on hover -->
            <div
              class="absolute inset-0 pointer-events-none opacity-10 transition-opacity duration-500 group-hover:opacity-0"
              style="background: repeating-linear-gradient(0deg, #000 0px, #000 1px, transparent 1px, transparent 4px);"
            ></div>
          </div>
          <!-- Polaroid name caption -->
          <div class="px-3 py-3 border-t-4 border-primary bg-background">
            <h2 class="text-xs font-display font-bold text-primary leading-tight uppercase tracking-wide text-left">
              {{ profile.name }}
            </h2>
            <p class="text-[10px] text-accent-green font-bold mt-1 uppercase tracking-widest">
              STATUS: FULL STACK DEVELOPER
            </p>
          </div>
        </div>
      </div>

      <!-- Nav Links -->
      <nav class="flex flex-col gap-2 p-4 flex-1 overflow-y-auto">
        <button
          v-for="link in links"
          :key="link.name"
          class="flex items-center gap-3 px-4 py-3 text-[10px] font-bold tracking-widest uppercase transition-all text-left w-full border-2"
          :class="
            activeTab === link.tab
              ? 'bg-accent-yellow border-primary text-primary shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]'
              : 'border-transparent text-on-surface-variant hover:border-on-surface-variant/30 hover:text-primary hover:bg-surface-container-highest'
          "
          @click="$emit('select', link.tab)"
        >
          <component :is="link.icon" :size="16" />
          {{ link.name }}
        </button>
      </nav>

      <!-- Deploy Button pinned to bottom -->
      <div class="p-4 border-t-4 border-primary">
        <button
          class="brutalist-button bg-accent-yellow w-full py-3 text-[10px] font-bold tracking-[0.2em] uppercase"
        >
          DEPLOY_PROJECT
        </button>
      </div>

    </div>
  </aside>
</template>
