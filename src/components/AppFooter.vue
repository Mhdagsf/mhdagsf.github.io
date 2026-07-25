<script setup lang="ts">
// Daftar link beserta URL tujuannya
const socialLinks = [
  {
    label: 'GITHUB',
    url: 'https://github.com/mhdagsf',
  },
  {
    label: 'LINKEDIN',
    url: 'https://linkedin.com/in/muhammad-agis', // Sesuaikan dengan username LinkedIn kamu
  },
  {
    label: 'SOURCE',
    url: 'https://github.com/Mhdagsf',
  },
];
</script>

<template>
  <footer
    class="pt-20 pb-10 flex flex-col md:flex-row justify-between items-center gap-6 border-t-4 border-primary/20"
  >
    <span
      class="text-[10px] font-bold text-accent-green tracking-widest uppercase"
      >&copy; 199X RETRO-PORTFOLIO-OS</span
    >
    <div class="flex gap-8">
      <a
        v-for="link in socialLinks"
        :key="link.label"
        :href="link.url"
        target="_blank"
        rel="noopener noreferrer"
        class="text-[10px] font-bold tracking-widest hover:text-accent-orange transition-colors cursor-pointer"
      >
        {{ link.label }}
      </a>
    </div>
  </footer>
</template>
