<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import WindowTitleBar from './WindowTitleBar.vue';

interface ContribDay {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

interface WeekData {
  days: (ContribDay | null)[];
}

const props = defineProps<{
  githubUsername: string;
  gitlabUsername?: string;
}>();

const weeks = ref<WeekData[]>([]);
const totalContributions = ref(0);
const currentStreak = ref(0);
const isLoading = ref(true);
const hasError = ref(false);
const githubOk = ref(false);
const gitlabOk = ref(false);

const MONTH_LABELS = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];
const DAY_LABELS = ['', 'Mon', '', 'Wed', '', 'Fri', ''];

function getLevel(count: number): 0 | 1 | 2 | 3 | 4 {
  if (count === 0) return 0;
  if (count <= 2) return 1;
  if (count <= 5) return 2;
  if (count <= 10) return 3;
  return 4;
}

function buildGrid(dateCountMap: Map<string, number>): void {
  const today = new Date();
  const oneYearAgo = new Date(today);
  oneYearAgo.setFullYear(today.getFullYear() - 1);

  const startDate = new Date(oneYearAgo);
  startDate.setDate(startDate.getDate() - startDate.getDay());

  const allDays: ContribDay[] = [];
  const cursor = new Date(startDate);

  while (cursor <= today) {
    const dateStr = cursor.toISOString().split('T')[0];
    const count = dateCountMap.get(dateStr) ?? 0;
    allDays.push({ date: dateStr, count, level: getLevel(count) });
    cursor.setDate(cursor.getDate() + 1);
  }

  const chunked: WeekData[] = [];
  for (let i = 0; i < allDays.length; i += 7) {
    chunked.push({ days: allDays.slice(i, i + 7) });
  }
  weeks.value = chunked;
}

function calcStreak(dateCountMap: Map<string, number>): void {
  const today = new Date();
  let streak = 0;
  const cursor = new Date(today);
  for (let i = 0; i < 365; i++) {
    const dateStr = cursor.toISOString().split('T')[0];
    if ((dateCountMap.get(dateStr) ?? 0) > 0) {
      streak++;
      cursor.setDate(cursor.getDate() - 1);
    } else if (i === 0) {
      // today has no activity, check yesterday
      cursor.setDate(cursor.getDate() - 1);
    } else {
      break;
    }
  }
  currentStreak.value = streak;
}

async function fetchGitHubData(
  dateCountMap: Map<string, number>,
  oneYearAgo: Date,
): Promise<void> {
  try {
    for (let page = 1; page <= 10; page++) {
      const res = await fetch(
        `https://api.github.com/users/${props.githubUsername}/events/public?per_page=100&page=${page}`,
        { headers: { Accept: 'application/vnd.github.v3+json' } },
      );
      if (!res.ok) break;
      const data: any[] = await res.json();
      if (!Array.isArray(data) || data.length === 0) break;

      let hitOld = false;
      for (const event of data) {
        const eventDate = new Date(event.created_at);
        if (eventDate < oneYearAgo) {
          hitOld = true;
          break;
        }
        const dateStr = eventDate.toISOString().split('T')[0];
        const weight =
          event.type === 'PushEvent'
            ? (event.payload?.commits?.length ?? 1)
            : 1;
        dateCountMap.set(dateStr, (dateCountMap.get(dateStr) ?? 0) + weight);
      }
      if (hitOld) break;
    }
    githubOk.value = true;
  } catch {
    // GitHub fetch failed, silently continue — GitLab data will still show
  }
}

async function fetchGitLabData(
  dateCountMap: Map<string, number>,
  oneYearAgo: Date,
): Promise<void> {
  const token = import.meta.env.VITE_GITLAB_TOKEN as string | undefined;
  if (!token || !props.gitlabUsername) return;

  try {
    const after = oneYearAgo.toISOString().split('T')[0];
    for (let page = 1; page <= 10; page++) {
      const res = await fetch(
        `https://gitlab.com/api/v4/users/${props.gitlabUsername}/events?action=pushed&per_page=100&page=${page}&after=${after}`,
        { headers: { 'PRIVATE-TOKEN': token } },
      );
      if (!res.ok) break;
      const data: any[] = await res.json();
      if (!Array.isArray(data) || data.length === 0) break;

      for (const event of data) {
        const eventDate = new Date(event.created_at);
        if (eventDate < oneYearAgo) break;
        const dateStr = eventDate.toISOString().split('T')[0];
        // push_data.commit_count gives number of commits in the push
        const count = event.push_data?.commit_count ?? 1;
        dateCountMap.set(dateStr, (dateCountMap.get(dateStr) ?? 0) + count);
      }
    }
    gitlabOk.value = true;
  } catch {
    // GitLab fetch failed, silently continue — GitHub data will still show
  }
}

async function fetchAllContributions(): Promise<void> {
  try {
    const dateCountMap = new Map<string, number>();
    const today = new Date();
    const oneYearAgo = new Date(today);
    oneYearAgo.setFullYear(today.getFullYear() - 1);

    // Fetch GitHub and GitLab in parallel
    await Promise.all([
      fetchGitHubData(dateCountMap, oneYearAgo),
      fetchGitLabData(dateCountMap, oneYearAgo),
    ]);

    if (!githubOk.value && !gitlabOk.value) {
      hasError.value = true;
      isLoading.value = false;
      return;
    }

    totalContributions.value = Array.from(dateCountMap.values()).reduce(
      (s, c) => s + c,
      0,
    );
    buildGrid(dateCountMap);
    calcStreak(dateCountMap);
    isLoading.value = false;
  } catch {
    hasError.value = true;
    isLoading.value = false;
  }
}

const monthPositions = computed(() => {
  const positions: { label: string; col: number }[] = [];
  let lastMonth = -1;
  weeks.value.forEach((week, col) => {
    for (const day of week.days) {
      if (!day) continue;
      const m = new Date(day.date).getMonth();
      if (m !== lastMonth) {
        positions.push({ label: MONTH_LABELS[m], col });
        lastMonth = m;
      }
      break;
    }
  });
  // Skip month labels that are too narrow (< 3 weeks gap) to avoid overlap like "AugSep"
  return positions.filter((pos, i) => {
    const nextCol = positions[i + 1]?.col ?? weeks.value.length;
    return nextCol - pos.col >= 3;
  });
});

onMounted(() => {
  fetchAllContributions();
});
</script>

<template>
  <div class="brutalist-card">
    <WindowTitleBar title="CONTRIBUTION_MATRIX.SYS" />

    <div class="p-6 bg-background">
      <!-- Header -->
      <div class="flex items-center justify-between mb-5 flex-wrap gap-3">
        <div class="flex items-center gap-2">
          <span
            class="inline-block w-3 h-3 bg-accent-green border-2 border-primary"
          ></span>
          <span
            class="text-xs font-bold font-mono uppercase tracking-widest text-on-surface-variant"
          >
            ACTIVITY_LOG
          </span>
        </div>
        <div
          class="flex items-center gap-4 text-[10px] font-mono text-on-surface-variant"
        >
          <span v-if="!isLoading && !hasError">
            <span class="text-accent-green font-bold">{{
              totalContributions
            }}</span>
            COMMITS
          </span>
          <span v-if="!isLoading && !hasError && currentStreak > 0">
            <span class="text-accent-yellow font-bold">{{ currentStreak }}</span
            >D STREAK
          </span>
          <span
            class="text-accent-green font-bold"
            v-if="isLoading"
            style="animation: blink 1s step-start infinite"
          >
            LOADING...
          </span>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="isLoading" class="flex items-center justify-center h-32">
        <div class="text-center space-y-2">
          <div class="flex gap-1 justify-center">
            <span
              class="w-2 h-2 bg-accent-green inline-block"
              style="animation: blink 1s step-start infinite 0s"
            ></span>
            <span
              class="w-2 h-2 bg-accent-green inline-block"
              style="animation: blink 1s step-start infinite 0.2s"
            ></span>
            <span
              class="w-2 h-2 bg-accent-green inline-block"
              style="animation: blink 1s step-start infinite 0.4s"
            ></span>
          </div>
          <p class="text-[10px] font-mono text-on-surface-variant">
            &gt; FETCHING_COMMIT_HISTORY...
          </p>
        </div>
      </div>

      <!-- Error State -->
      <div
        v-else-if="hasError"
        class="flex items-center justify-center h-32 border-2 border-dashed border-accent-red/40"
      >
        <div class="text-center space-y-2">
          <p class="text-[10px] font-mono text-accent-red font-bold">
            &gt; ERR: FAILED_TO_FETCH_DATA
          </p>
          <p class="text-[10px] font-mono text-on-surface-variant">
            CHECK NETWORK OR API RATE LIMIT
          </p>
        </div>
      </div>

      <!-- Grid - Full Width -->
      <div v-else class="w-full">
        <div class="flex flex-col w-full">
          <!-- Month Labels: proportional flex widths -->
          <div class="flex mb-1" style="padding-left: 32px">
            <template v-for="(month, i) in monthPositions" :key="i">
              <div
                class="text-[9px] font-mono font-bold text-on-surface-variant overflow-hidden whitespace-nowrap"
                :style="{
                  flex:
                    (i < monthPositions.length - 1
                      ? monthPositions[i + 1].col
                      : weeks.length) - month.col,
                }"
              >
                {{ month.label }}
              </div>
            </template>
          </div>

          <!-- Grid Body: fixed height so cells fill vertically -->
          <div class="flex gap-0 w-full" style="height: 112px">
            <!-- Day Labels -->
            <div
              class="flex flex-col justify-between"
              style="min-width: 28px; padding: 2px 4px 2px 0"
            >
              <div
                v-for="(label, i) in DAY_LABELS"
                :key="i"
                class="text-[9px] font-mono text-on-surface-variant flex items-center justify-end flex-1"
              >
                {{ label }}
              </div>
            </div>

            <!-- Weeks: each week column is flex-1 -->
            <div class="flex flex-1 gap-[2px]">
              <div
                v-for="(week, wi) in weeks"
                :key="wi"
                class="flex flex-col flex-1 gap-[2px]"
              >
                <div
                  v-for="(day, di) in week.days"
                  :key="di"
                  class="contribution-cell flex-1 min-w-0"
                  :class="day ? `level-${day.level}` : 'level-0'"
                  :title="
                    day
                      ? `${day.date}: ${day.count} contribution${day.count !== 1 ? 's' : ''}`
                      : ''
                  "
                ></div>
              </div>
            </div>
          </div>

          <!-- Legend & Footer -->
          <div
            class="flex items-center justify-between mt-4 pt-3 border-t-2 border-dashed border-on-surface-variant/20 flex-wrap gap-2"
          >
            <div class="flex items-center gap-[3px]">
              <span class="text-[9px] font-mono text-on-surface-variant mr-1"
                >Less</span
              >
              <div class="legend-cell level-0"></div>
              <div class="legend-cell level-1"></div>
              <div class="legend-cell level-2"></div>
              <div class="legend-cell level-3"></div>
              <div class="legend-cell level-4"></div>
              <span class="text-[9px] font-mono text-on-surface-variant ml-1"
                >More</span
              >
            </div>

            <div class="flex items-center gap-2">
              <span
                class="inline-block w-1.5 h-1.5 bg-accent-green"
                style="animation: blink 2s step-start infinite"
              ></span>
              <span
                class="text-[9px] font-mono text-on-surface-variant tracking-widest"
              >
                &gt; SOURCE:
                <span v-if="githubOk" class="text-on-surface-variant"
                  >GITHUB</span
                >
                <span
                  v-if="githubOk && gitlabOk"
                  class="text-on-surface-variant"
                >
                  +
                </span>
                <span v-if="gitlabOk" class="text-accent-orange">GITLAB</span>
                // STATUS:
                {{ totalContributions > 50 ? 'HIGH_ACTIVITY' : 'ACTIVE' }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Grid cells — no fixed size, flex-1 fills available space */
.contribution-cell {
  border-radius: 2px;
  border: 1px solid transparent;
  transition:
    transform 0.1s ease,
    border-color 0.1s ease;
  cursor: default;
  min-width: 0;
  min-height: 0;
}

.contribution-cell:hover {
  transform: scale(1.3);
  border-color: var(--color-primary, #000);
  z-index: 10;
  position: relative;
}

/* Legend cells have a fixed decorative size */
.legend-cell {
  width: 11px;
  height: 11px;
  border-radius: 2px;
  flex-shrink: 0;
}

.level-0 {
  /* Visible but muted — makes the grid look complete */
  background-color: #d0d7de;
}
.level-1 {
  background-color: #9be9a8;
}
.level-2 {
  background-color: #40c463;
}
.level-3 {
  background-color: #30a14e;
}
.level-4 {
  background-color: #216e39;
}

:global(.dark) .level-0 {
  /* Dark mode empty cells — same as GitHub dark */
  background-color: #21262d;
}
:global(.dark) .level-1 {
  background-color: #0e4429;
}
:global(.dark) .level-2 {
  background-color: #006d32;
}
:global(.dark) .level-3 {
  background-color: #26a641;
}
:global(.dark) .level-4 {
  background-color: #39d353;
}

@keyframes blink {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
}
</style>
