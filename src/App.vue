<script setup lang="ts">
import { onMounted, ref, watchEffect } from 'vue';
import SnakeGameOverlay from './components/SnakeGameOverlay.vue';
import AppFooter from './components/AppFooter.vue';
import AppHeader from './components/AppHeader.vue';
import AppSidebar from './components/AppSidebar.vue';
import ContactSection from './components/sections/ContactSection.vue';
import HistorySection from './components/sections/HistorySection.vue';
import ProjectsSection from './components/sections/ProjectsSection.vue';
import SystemSection from './components/sections/SystemSection.vue';
import { sidebarLinks, type NavTab } from './data/portfolio';

const activeTab = ref<NavTab>('SYSTEM');
const isDark = ref(localStorage.getItem('theme') === 'dark');
const isSidebarOpen = ref(true);
const isShutdown = ref(false);

const closeSidebarOnMobile = () => {
  if (window.innerWidth < 1024) {
    isSidebarOpen.value = false;
  }
};

onMounted(closeSidebarOnMobile);

const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value;
};

const selectTab = (tab: NavTab) => {
  activeTab.value = tab;
  closeSidebarOnMobile();
};

const toggleDark = () => {
  isDark.value = !isDark.value;
  localStorage.setItem('theme', isDark.value ? 'dark' : 'light');
};

watchEffect(() => {
  document.documentElement.classList.toggle('dark', isDark.value);
});
</script>

<template>
  <div
    class="min-h-screen flex flex-col overflow-hidden selection:bg-accent-yellow"
  >
    <!-- 1. Tambahkan @shutdown="isShutdown = true" di sini -->
    <AppHeader
      :is-dark="isDark"
      :is-sidebar-open="isSidebarOpen"
      @toggle-sidebar="toggleSidebar"
      @toggle-theme="toggleDark"
      @shutdown="isShutdown = true"
    />

    <div class="flex flex-1 overflow-hidden relative">
      <AppSidebar
        :active-tab="activeTab"
        :is-open="isSidebarOpen"
        :links="sidebarLinks"
        @close="isSidebarOpen = false"
        @select="selectTab"
      />

      <main class="flex-1 bg-background overflow-y-auto p-4 md:p-10 relative">
        <div
          class="absolute inset-0 opacity-[0.03] pointer-events-none"
          style="
            background-image: radial-gradient(#000 1px, transparent 1px);
            background-size: 16px 16px;
          "
        ></div>

        <div class="max-w-6xl mx-auto space-y-10 relative z-10">
          <SystemSection v-if="activeTab === 'SYSTEM'" />
          <ProjectsSection v-else-if="activeTab === 'ARCHIVE'" />
          <HistorySection v-else-if="activeTab === 'STATUS'" />
          <ContactSection v-else-if="activeTab === 'CONTACT'" />

          <AppFooter />
        </div>
      </main>
    </div>

    <!-- 2. Pasang Komponen Snake Game Overlay di Paling Bawah -->
    <SnakeGameOverlay :is-open="isShutdown" @close="isShutdown = false" />
  </div>
</template>
