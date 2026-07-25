<script setup lang="ts">
import { computed } from 'vue';
import { Rocket } from 'lucide-vue-next';
import type { Project } from '../data/portfolio';
import MacDots from './MacDots.vue';

const props = defineProps<{
  project: Project;
}>();

// Helper untuk menambahkan BASE_URL otomatis jika gambar berasal dari folder public
const projectImageUrl = computed(() => {
  if (
    props.project.image.startsWith('http://') ||
    props.project.image.startsWith('https://')
  ) {
    return props.project.image;
  }

  // @ts-ignore
  const base = import.meta.env.BASE_URL || '/';
  const cleanPath = props.project.image.replace(/^\//, '');

  return `${base}${cleanPath}`;
});
</script>

<template>
  <article
    class="brutalist-card flex flex-col group bg-background"
    :class="project.wide ? 'md:col-span-2 lg:col-span-3' : ''"
  >
    <div
      class="border-b-4 border-primary flex items-center justify-between"
      :class="[project.accent, project.wide ? 'px-4 py-3' : 'px-4 py-2.5']"
    >
      <MacDots color-class="bg-white" :size="project.wide ? 'md' : 'sm'" />
      <span
        class="font-bold text-primary uppercase"
        :class="
          project.wide
            ? 'text-[11px] tracking-[0.15em]'
            : 'text-[10px] tracking-[0.1em]'
        "
      >
        {{ project.title }}
      </span>
    </div>

    <div v-if="project.wide" class="flex flex-col lg:flex-row h-full">
      <div
        class="lg:w-1/2 aspect-video lg:aspect-auto border-b-4 lg:border-b-0 lg:border-r-4 border-primary overflow-hidden relative"
      >
        <!-- Pakai projectImageUrl di sini -->
        <img
          :src="projectImageUrl"
          :alt="project.title"
          class="w-full h-full object-cover grayscale contrast-125 mix-blend-multiply opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500"
        />
      </div>
      <div class="lg:w-1/2 p-10 flex flex-col gap-8 justify-center">
        <p class="text-base font-medium leading-relaxed opacity-95">
          {{ project.description }}
        </p>
        <div class="flex flex-wrap gap-3">
          <span
            v-for="tag in project.tags"
            :key="tag"
            class="px-4 py-1.5 border-2 border-primary rounded-full text-[10px] font-bold tracking-[0.2em] bg-surface-container uppercase"
          >
            [{{ tag }}]
          </span>
        </div>
        <div
          class="flex gap-6 pt-10 border-t-2 border-dashed border-primary/20 mt-6"
        >
          <a
            v-if="project.liveUrl"
            :href="project.liveUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="flex-1 brutalist-button bg-accent-yellow py-4 text-[10px] font-bold tracking-[0.25em] flex justify-center items-center gap-3"
          >
            <Rocket :size="20" />
            OPEN_PROJECT
          </a>
          <button
            v-else
            class="flex-1 brutalist-button bg-accent-yellow py-4 text-[10px] font-bold tracking-[0.25em] flex justify-center items-center gap-3 opacity-50 cursor-not-allowed"
            disabled
          >
            <Rocket :size="20" />
            OPEN_PROJECT
          </button>

          <a
            v-if="project.sourceUrl"
            :href="project.sourceUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="px-10 brutalist-button bg-surface-container-highest py-4 text-[10px] font-bold tracking-[0.25em]"
          >
            SOURCE_CODE
          </a>
          <button
            v-else
            class="px-10 brutalist-button bg-surface-container-highest py-4 text-[10px] font-bold tracking-[0.25em] opacity-50 cursor-not-allowed"
            disabled
          >
            SOURCE_CODE
          </button>
        </div>
      </div>
    </div>

    <template v-else>
      <div
        class="aspect-video bg-surface-variant border-b-4 border-primary overflow-hidden relative"
      >
        <!-- Pakai projectImageUrl di sini -->
        <img
          :src="projectImageUrl"
          :alt="project.title"
          class="w-full h-full object-cover grayscale contrast-125 mix-blend-multiply opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500 hover:scale-105"
        />
      </div>
      <div class="p-8 flex flex-col flex-1 gap-5">
        <p class="text-sm font-medium leading-relaxed opacity-90">
          {{ project.description }}
        </p>
        <div class="flex flex-wrap gap-2.5 mt-auto">
          <span
            v-for="tag in project.tags"
            :key="tag"
            class="px-3 py-1 border-2 border-primary rounded-full text-[9px] font-bold tracking-[0.15em] bg-surface-container uppercase"
          >
            [{{ tag }}]
          </span>
        </div>
        <div class="flex gap-4 pt-5 border-t-2 border-dashed border-primary/20">
          <a
            v-if="project.liveUrl"
            :href="project.liveUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="flex-1 brutalist-button bg-accent-yellow py-3 text-[10px] font-bold tracking-widest flex justify-center items-center gap-2"
          >
            <Rocket :size="16" />
            OPEN
          </a>
          <button
            v-else
            class="flex-1 brutalist-button bg-accent-yellow py-3 text-[10px] font-bold tracking-widest flex justify-center items-center gap-2 opacity-50 cursor-not-allowed"
            disabled
          >
            <Rocket :size="16" />
            OPEN
          </button>

          <a
            v-if="project.sourceUrl"
            :href="project.sourceUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="px-6 brutalist-button bg-surface-container-highest py-3 text-[10px] font-bold tracking-widest"
          >
            SRC
          </a>
          <button
            v-else
            class="px-6 brutalist-button bg-surface-container-highest py-3 text-[10px] font-bold tracking-widest opacity-50 cursor-not-allowed"
            disabled
          >
            SRC
          </button>
        </div>
      </div>
    </template>
  </article>
</template>
