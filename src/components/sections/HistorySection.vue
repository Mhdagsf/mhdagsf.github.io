<script setup lang="ts">
import { historyItems } from '../../data/portfolio';
import HistoryTimelineItem from '../HistoryTimelineItem.vue';
import PageHeader from '../PageHeader.vue';
</script>

<template>
  <section class="space-y-8 md:space-y-12 pb-20">
    <PageHeader
      badge="SYSTEM_LOG"
      title="Execution History"
      subtitle="Tracing the operational timeline of technical deployments."
    />

    <div class="relative py-10">
      <HistoryTimelineItem
        v-for="(item, index) in historyItems"
        :key="item.title"
        :item="item"
        :is-last="index === historyItems.length - 1"
      />
    </div>
  </section>
</template>
