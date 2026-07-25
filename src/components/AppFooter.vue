<template>
  <footer class="pt-20 pb-10 flex flex-col md:flex-row justify-between items-center gap-6 border-t-4 border-primary/20">
    <span class="text-[10px] font-bold text-accent-green tracking-widest uppercase">&copy; 199X RETRO-PORTFOLIO-OS</span>
    <div class="flex gap-8">
      <button
        v-for="link in ['GITHUB', 'LINKEDIN', 'SOURCE']"
        :key="link"
        class="text-[10px] font-bold tracking-widest hover:text-accent-orange transition-colors"
      >
        {{ link }}
      </button>
    </div>
  </footer>
</template>
