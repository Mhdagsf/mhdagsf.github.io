<script setup lang="ts">
import { Briefcase, Code } from 'lucide-vue-next';
import { profile } from '../../data/portfolio'; // Jalur import yang benar berdasarkan struktur folder
import ContactTerminal from '../ContactTerminal.vue';
import SocialCard from '../SocialCard.vue';
</script>

<template>
  <section
    class="relative min-h-[500px] md:min-h-[600px] flex items-center justify-center p-4"
  >
    <div
      class="absolute inset-0 pointer-events-none opacity-20"
      style="
        background-image: radial-gradient(#000 1px, transparent 1px);
        background-size: 20px 20px;
      "
    ></div>

    <!-- Tambahkan :url="profile.githubUrl" dan :url="profile.linkedinUrl" di sini -->
    <SocialCard
      label="GITHUB.LNK"
      :icon="Code"
      variant="github"
      :url="profile.githubUrl"
    />

    <SocialCard
      label="LINKEDIN.EXE"
      :icon="Briefcase"
      variant="linkedin"
      :url="profile.linkedinUrl"
    />

    <ContactTerminal />
  </section>
</template>
