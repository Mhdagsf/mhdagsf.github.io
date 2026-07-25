<script setup lang="ts">
import { projects } from '../../data/portfolio';
import PageHeader from '../PageHeader.vue';
import ProjectCard from '../ProjectCard.vue';
</script>

<template>
  <section class="space-y-8 md:space-y-12 pb-20">
    <PageHeader title="/Projects_Gallery" subtitle="Browsing executable files and application directories." show-dots />

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
      <ProjectCard v-for="project in projects" :key="project.title" :project="project" />
    </div>
  </section>
</template>
