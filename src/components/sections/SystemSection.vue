<script setup lang="ts">
import { skills, systemSpecs } from '../../data/portfolio';
import HeroWindow from '../HeroWindow.vue';
import SkillsGrid from '../SkillsGrid.vue';
import SystemSpecsCard from '../SystemSpecsCard.vue';
</script>

<template>
  <section class="space-y-10">
    <HeroWindow />

    <div class="grid grid-cols-1 md:grid-cols-12 gap-10">
      <SystemSpecsCard class="md:col-span-7" :specs="systemSpecs" />
      <SkillsGrid class="md:col-span-5" :skills="skills" />
    </div>
  </section>
</template>
