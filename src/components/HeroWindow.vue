<script setup lang="ts">
import { Rocket, Download } from 'lucide-vue-next';
import { systemSpecs } from '../data/portfolio';
import WindowTitleBar from './WindowTitleBar.vue';

// 💡 IMPORT FILE PDF LANGSUNG DARI PUBLIC / ASSETS
// Vite akan otomatis menangani URL base & hashing-nya dengan sempurna!

const driveSpec = systemSpecs.find((spec) => spec.label === 'DRIVE:');
const driveValue = driveSpec ? driveSpec.value : '';
</script>

<template>
  <div class="brutalist-card flex flex-col">
    <WindowTitleBar title="BOOT_SEQ_V1.0.exe" />
    <div class="flex-1 bg-background p-10 relative">
      <div class="space-y-4">
        <p class="text-[10px] font-bold text-on-surface-variant">
          &gt; initializing system...
        </p>
        <p class="text-[10px] font-bold text-accent-green">
          &gt; connection established.
        </p>

        <h1
          class="text-3xl sm:text-4xl md:text-6xl font-display font-bold leading-[1.1] md:leading-[0.9] mt-6"
        >
          USER_DEV:<br />
          HELLO WORLD
          <span
            class="inline-block w-4 h-[1em] bg-primary ml-2 align-bottom animate-pulse"
          ></span>
        </h1>

        <p class="text-base font-mono leading-relaxed mb-6 max-w-2xl">
          {{ driveValue }}
        </p>

        <!-- Ganti elemen tombol lama kamu dengan tag <a> di bawah ini -->

        <a
          href="./cv.pdf"
          download="CV-Muhammad-Agis-Fadillah.pdf"
          target="_blank"
          class="brutalist-button bg-accent-yellow mt-6 px-8 py-3 text-xs font-bold uppercase tracking-widest inline-flex items-center gap-3 w-fit"
        >
          <Rocket :size="18" /> DOWNLOAD_CV.EXE
        </a>
      </div>
    </div>
  </div>
</template>

<style scoped>
.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
}
</style>
