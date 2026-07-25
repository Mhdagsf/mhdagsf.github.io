<script setup lang="ts">
import { computed } from 'vue';
import { HelpCircle, ListRestart } from 'lucide-vue-next';
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

// Helper untuk menyesuaikan path avatar dengan BASE_URL GitHub Pages
const computedAvatarUrl = computed(() => {
  // Ambil BASE_URL bawaan Vite
  // @ts-ignore
  const base = import.meta.env.BASE_URL || '/';

  // Hapus karakter slash diawal jika ada agar tidak double slash
  const cleanPath = profile.avatarUrl.replace(/^\//, '');

  return `${base}${cleanPath}`;
});
</script>

<template>
  <div
    v-if="isOpen"
    class="lg:hidden fixed inset-0 bg-primary/20 backdrop-blur-sm z-30"
    @click="$emit('close')"
  ></div>

  <aside
    class="border-primary bg-surface-container flex flex-col shrink-0 fixed lg:static inset-y-0 left-0 z-40 transition-all duration-300 overflow-hidden"
    :class="
      isOpen
        ? 'w-72 border-r-4 translate-x-0'
        : 'w-0 border-r-0 -translate-x-full'
    "
  >
    <div class="w-72 h-full flex flex-col shrink-0">
      <div
        class="p-8 border-b-4 border-primary flex flex-col items-center gap-4 bg-surface-container-highest"
      >
        <div
          class="w-20 h-20 bg-background border-4 border-primary rounded-full overflow-hidden shadow-[4px_4px_0px_0px_var(--shadow-color)] flex items-center justify-center"
        >
          <!-- Menggunakan computedAvatarUrl yang aman untuk GitHub Pages -->
          <img
            :src="computedAvatarUrl"
            alt="Avatar"
            class="w-full h-full object-cover filter contrast-125 grayscale"
          />
        </div>
        <div class="text-center">
          <h2 class="text-lg font-display font-bold text-primary">
            {{ profile.name }}
          </h2>
          <p
            class="text-[10px] text-on-surface-variant font-bold mt-1 uppercase tracking-widest"
          >
            STATUS: {{ profile.status }}
          </p>
        </div>
        <button
          class="brutalist-button bg-accent-green w-full py-3 mt-2 text-[10px] font-bold tracking-[0.2em] uppercase"
        >
          DEPLOY_PROJECT
        </button>
      </div>

      <nav class="p-6 flex flex-col gap-3 flex-1 overflow-y-auto">
        <button
          v-for="link in links"
          :key="link.name"
          class="flex items-center gap-3 p-3.5 text-[10px] font-bold tracking-widest uppercase transition-all text-left w-full"
          :class="
            activeTab === link.tab
              ? 'brutalist-button bg-accent-yellow text-primary scale-100 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]'
              : 'hover:bg-surface-container-highest opacity-70 hover:opacity-100 border-2 border-transparent'
          "
          @click="$emit('select', link.tab)"
        >
          <component :is="link.icon" :size="18" />
          {{ link.name }}
        </button>
      </nav>

      <div class="p-4 border-t-4 border-primary bg-background">
        <button
          class="brutalist-button bg-accent-pink w-full py-3 text-[10px] font-bold tracking-[0.2em] uppercase flex items-center justify-center gap-2"
        >
          DEPLOY_PROJECT
        </button>
        <div class="flex justify-between mt-4 px-2 pb-2">
          <button
            class="text-[10px] font-bold flex items-center gap-1 opacity-60 hover:opacity-100 transition-opacity"
          >
            <HelpCircle :size="14" />
            Help
          </button>
          <button
            class="text-[10px] font-bold flex items-center gap-1 opacity-60 hover:opacity-100 transition-opacity"
          >
            <ListRestart :size="14" />
            Logs
          </button>
        </div>
      </div>
    </div>
  </aside>
</template>
