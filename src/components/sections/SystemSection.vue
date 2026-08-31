<script setup lang="ts">
import { skills, systemSpecs, profile } from '../../data/portfolio';
import HeroWindow from '../HeroWindow.vue';
import SkillsGrid from '../SkillsGrid.vue';
import SystemSpecsCard from '../SystemSpecsCard.vue';
import ContributionMatrix from '../ContributionMatrix.vue';

const githubUsername = profile.githubUrl.split('/').pop() ?? 'Mhdagsf';
const gitlabUsername = 'Mhdagsf';
</script>

<template>
  <section class="space-y-10">
    <HeroWindow />

    <ContributionMatrix
      :github-username="githubUsername"
      :gitlab-username="gitlabUsername"
    />

    <div class="grid grid-cols-1 md:grid-cols-12 gap-10">
      <SystemSpecsCard class="md:col-span-7" :specs="systemSpecs" />
      <SkillsGrid class="md:col-span-5" :skills="skills" />
    </div>
  </section>
</template>
