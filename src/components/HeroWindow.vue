<script setup lang="ts">
import { Rocket, Download } from 'lucide-vue-next';
import { systemSpecs } from '../data/portfolio';
import WindowTitleBar from './WindowTitleBar.vue';

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
          href="/CV-muhammadAgis.pdf"
          download="CV-muhammadAgis.pdf"
          class="inline-flex items-center gap-2 px-5 py-2.5 font-mono font-bold text-xs uppercase bg-[#e1c38f] text-black border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all no-underline cursor-pointer"
        >
          <Download :size="16" />
          <span>DOWNLOAD_CV.EXE</span>
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
