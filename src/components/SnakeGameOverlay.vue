<script setup lang="ts">
import { ref, watch, onUnmounted, onMounted } from 'vue';
import {
  Power,
  Play,
  Square,
  ArrowUp,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  RotateCcw,
} from 'lucide-vue-next';

const props = defineProps<{
  isOpen: boolean;
}>();

const emit = defineEmits<{
  (e: 'close'): void;
}>();

// Dynamic Grid Size based on Screen Window
const CELL_SIZE = 28;
const gridCols = ref(30);
const gridRows = ref(20);

type Point = { x: number; y: number };
type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';

const snake = ref<Point[]>([]);
const direction = ref<Direction>('UP');
const nextDirection = ref<Direction>('UP');
const food = ref<Point>({ x: 5, y: 5 });
const gameState = ref<'READY' | 'PLAYING' | 'GAMEOVER'>('READY');
const speed = 100; // Speed tick in ms

let gameLoopTimer: ReturnType<typeof setInterval> | null = null;

const updateGridDimensions = () => {
  if (typeof window === 'undefined') return;
  const width = window.innerWidth;
  const height = window.innerHeight - 64; // header deduction
  gridCols.value = Math.max(12, Math.floor(width / CELL_SIZE));
  gridRows.value = Math.max(12, Math.floor(height / CELL_SIZE));
};

const generateFood = (): Point => {
  let newFood: Point;
  let attempts = 0;
  while (attempts < 500) {
    attempts++;
    newFood = {
      x: Math.floor(Math.random() * gridCols.value),
      y: Math.floor(Math.random() * gridRows.value),
    };
    const isCollision = snake.value.some(
      (segment) => segment.x === newFood.x && segment.y === newFood.y,
    );
    if (!isCollision) break;
  }
  return newFood!;
};

const startGame = () => {
  updateGridDimensions();
  const startX = Math.floor(gridCols.value / 2);
  const startY = Math.floor(gridRows.value / 2);

  snake.value = [
    { x: startX, y: startY },
    { x: startX, y: startY + 1 },
    { x: startX, y: startY + 2 },
  ];
  direction.value = 'UP';
  nextDirection.value = 'UP';
  food.value = generateFood();
  gameState.value = 'PLAYING';
  resetTimer();
};

const stopGame = () => {
  clearTimer();
  gameState.value = 'READY';
  emit('close');
};

const clearTimer = () => {
  if (gameLoopTimer) {
    clearInterval(gameLoopTimer);
    gameLoopTimer = null;
  }
};

const resetTimer = () => {
  clearTimer();
  gameLoopTimer = setInterval(tick, speed);
};

const changeDirection = (newDir: Direction) => {
  if (gameState.value !== 'PLAYING' && gameState.value !== 'READY') return;
  if (gameState.value === 'READY') {
    startGame();
  }

  const current = direction.value;
  if (newDir === 'UP' && current !== 'DOWN') nextDirection.value = 'UP';
  if (newDir === 'DOWN' && current !== 'UP') nextDirection.value = 'DOWN';
  if (newDir === 'LEFT' && current !== 'RIGHT') nextDirection.value = 'LEFT';
  if (newDir === 'RIGHT' && current !== 'LEFT') nextDirection.value = 'RIGHT';
};

const tick = () => {
  if (gameState.value !== 'PLAYING') return;

  direction.value = nextDirection.value;
  const head = { ...snake.value[0] };

  if (direction.value === 'UP') head.y -= 1;
  if (direction.value === 'DOWN') head.y += 1;
  if (direction.value === 'LEFT') head.x -= 1;
  if (direction.value === 'RIGHT') head.x += 1;

  // Wall Collision
  if (
    head.x < 0 ||
    head.x >= gridCols.value ||
    head.y < 0 ||
    head.y >= gridRows.value
  ) {
    triggerGameOver();
    return;
  }

  // Self Collision
  if (
    snake.value.some((segment) => segment.x === head.x && segment.y === head.y)
  ) {
    triggerGameOver();
    return;
  }

  snake.value.unshift(head);

  // Eat Food
  if (head.x === food.value.x && head.y === food.value.y) {
    food.value = generateFood();
  } else {
    snake.value.pop();
  }
};

const triggerGameOver = () => {
  gameState.value = 'GAMEOVER';
  clearTimer();
};

// Keyboard listener
const handleKeyDown = (e: KeyboardEvent) => {
  if (!props.isOpen) return;

  const key = e.key.toLowerCase();

  if (['arrowup', 'w'].includes(key)) {
    e.preventDefault();
    changeDirection('UP');
  } else if (['arrowdown', 's'].includes(key)) {
    e.preventDefault();
    changeDirection('DOWN');
  } else if (['arrowleft', 'a'].includes(key)) {
    e.preventDefault();
    changeDirection('LEFT');
  } else if (['arrowright', 'd'].includes(key)) {
    e.preventDefault();
    changeDirection('RIGHT');
  } else if (key === ' ' || key === 'enter') {
    e.preventDefault();
    if (gameState.value === 'READY' || gameState.value === 'GAMEOVER') {
      startGame();
    }
  } else if (key === 'escape') {
    e.preventDefault();
    stopGame();
  }
};

onMounted(() => {
  updateGridDimensions();
  window.addEventListener('resize', updateGridDimensions);
});

watch(
  () => props.isOpen,
  (newVal) => {
    if (newVal) {
      updateGridDimensions();
      window.addEventListener('keydown', handleKeyDown);
      if (gameState.value === 'GAMEOVER') {
        gameState.value = 'READY';
      }
    } else {
      window.removeEventListener('keydown', handleKeyDown);
      clearTimer();
    }
  },
);

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyDown);
  window.removeEventListener('resize', updateGridDimensions);
  clearTimer();
});

const isSnakeHead = (x: number, y: number) => {
  return (
    snake.value.length > 0 && snake.value[0].x === x && snake.value[0].y === y
  );
};

const isSnakeBody = (x: number, y: number) => {
  return snake.value
    .slice(1)
    .some((segment) => segment.x === x && segment.y === y);
};

const isFood = (x: number, y: number) => {
  return food.value.x === x && food.value.y === y;
};
</script>

<template>
  <div
    class="fixed inset-0 z-50 bg-[#121212] text-black flex flex-col transition-transform duration-500 ease-in-out font-mono select-none overflow-hidden"
    :class="
      isOpen
        ? 'translate-y-0 opacity-100 pointer-events-auto'
        : '-translate-y-full opacity-0 pointer-events-none'
    "
  >
    <!-- Brutalist Header Bar -->
    <header
      class="h-16 bg-[#ffb100] border-b-4 border-black px-4 md:px-8 flex items-center justify-between shrink-0 shadow-[0_4px_0_0_#000] relative z-30"
    >
      <div class="flex items-center gap-3">
        <div class="flex gap-1.5">
          <div
            class="w-3.5 h-3.5 rounded-full bg-[#ff4f93] border-2 border-black"
          ></div>
          <div
            class="w-3.5 h-3.5 rounded-full bg-[#efd7a5] border-2 border-black"
          ></div>
          <div
            class="w-3.5 h-3.5 rounded-full bg-[#47c41f] border-2 border-black"
          ></div>
        </div>
        <span
          class="text-sm md:text-base font-extrabold tracking-wider uppercase"
        >
          SYSTEM_SHUTDOWN // FULLSCREEN_SNAKE
        </span>
      </div>

      <!-- Action Buttons: START & STOP -->
      <div class="flex items-center gap-3">
        <button
          v-if="gameState !== 'PLAYING'"
          @click="startGame"
          class="px-5 py-2 bg-[#47c41f] hover:bg-[#3fb01a] text-black font-extrabold text-xs uppercase tracking-widest border-4 border-black shadow-[3px_3px_0px_0px_#000] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all flex items-center gap-2 cursor-pointer"
        >
          <Play :size="16" />
          <span>START</span>
        </button>

        <button
          @click="stopGame"
          class="px-5 py-2 bg-[#ff4f93] hover:bg-[#ff3080] text-black font-extrabold text-xs uppercase tracking-widest border-4 border-black shadow-[3px_3px_0px_0px_#000] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all flex items-center gap-2 cursor-pointer"
        >
          <Power :size="16" />
          <span>STOP</span>
        </button>
      </div>
    </header>

    <!-- Fullscreen Game Canvas Grid -->
    <div
      class="flex-1 w-full h-full relative overflow-hidden bg-[#18181c] border-b-4 border-black"
    >
      <div
        class="w-full h-full grid p-1 gap-[1px]"
        :style="{
          gridTemplateColumns: `repeat(${gridCols}, minmax(0, 1fr))`,
          gridTemplateRows: `repeat(${gridRows}, minmax(0, 1fr))`,
        }"
      >
        <template v-for="y in gridRows" :key="'y-' + y">
          <div
            v-for="x in gridCols"
            :key="'x-' + x + '-y-' + y"
            class="flex items-center justify-center relative transition-colors duration-75"
            :class="{
              'bg-[#47c41f] border-2 border-black z-10 shadow-[0_0_10px_#47c41f]':
                isSnakeHead(x - 1, y - 1),
              'bg-[#ffb100] border border-black': isSnakeBody(x - 1, y - 1),
              'bg-[#ff4f93] border-2 border-black rounded-full scale-90 shadow-[0_0_12px_#ff4f93]':
                isFood(x - 1, y - 1),
              'bg-[#222226]/60 border border-black/20':
                !isSnakeHead(x - 1, y - 1) &&
                !isSnakeBody(x - 1, y - 1) &&
                !isFood(x - 1, y - 1),
            }"
          ></div>
        </template>
      </div>

      <!-- Overlay READY -->
      <div
        v-if="gameState === 'READY'"
        class="absolute inset-0 bg-black/80 backdrop-blur-xs flex items-center justify-center p-6 z-20"
      >
        <div
          class="bg-[#fdf9f3] border-4 border-black shadow-[10px_10px_0px_0px_#000] p-6 md:p-8 max-w-md w-full text-center space-y-5"
        >
          <h2 class="text-3xl font-black text-black uppercase tracking-tight">
            SNAKE_SYSTEM
          </h2>
          <p class="text-xs font-bold text-black/80 leading-relaxed">
            Gunakan keyboard
            <span
              class="bg-[#ffb100] px-2 py-0.5 border-2 border-black font-black"
              >WASD</span
            >
            atau
            <span
              class="bg-[#ffb100] px-2 py-0.5 border-2 border-black font-black"
              >PANAH</span
            >
            untuk mengendalikan ular.
          </p>
          <div class="flex justify-center gap-3">
            <button
              @click="startGame"
              class="px-8 py-3 bg-[#47c41f] hover:bg-[#3fb01a] text-black font-black text-sm uppercase tracking-widest border-4 border-black shadow-[4px_4px_0px_0px_#000] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all cursor-pointer flex items-center gap-2"
            >
              <Play :size="18" />
              <span>START_GAME</span>
            </button>
          </div>
        </div>
      </div>

      <!-- Overlay GAMEOVER -->
      <div
        v-if="gameState === 'GAMEOVER'"
        class="absolute inset-0 bg-black/80 backdrop-blur-xs flex items-center justify-center p-6 z-20"
      >
        <div
          class="bg-[#ff4f93] border-4 border-black shadow-[10px_10px_0px_0px_#000] p-6 md:p-8 max-w-md w-full text-center space-y-5"
        >
          <h2 class="text-4xl font-black text-black uppercase tracking-tight">
            GAME_OVER!
          </h2>
          <div class="flex justify-center gap-4">
            <button
              @click="startGame"
              class="px-6 py-3 bg-[#47c41f] hover:bg-[#3fb01a] text-black font-black text-xs uppercase tracking-widest border-4 border-black shadow-[4px_4px_0px_0px_#000] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all cursor-pointer flex items-center gap-2"
            >
              <RotateCcw :size="16" />
              <span>PLAY_AGAIN</span>
            </button>
            <button
              @click="stopGame"
              class="px-6 py-3 bg-[#fdf9f3] hover:bg-white text-black font-black text-xs uppercase tracking-widest border-4 border-black shadow-[4px_4px_0px_0px_#000] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all cursor-pointer flex items-center gap-2"
            >
              <Square :size="16" />
              <span>STOP / EXIT</span>
            </button>
          </div>
        </div>
      </div>

      <!-- Mobile Touch D-Pad -->
      <div
        class="absolute bottom-6 right-6 z-30 md:hidden grid grid-cols-3 gap-2 w-36 h-36 bg-[#fdf9f3] border-4 border-black p-2 shadow-[4px_4px_0px_0px_#000]"
      >
        <div></div>
        <button
          @click="changeDirection('UP')"
          class="bg-[#ffb100] active:bg-[#47c41f] border-2 border-black flex items-center justify-center"
        >
          <ArrowUp :size="18" />
        </button>
        <div></div>

        <button
          @click="changeDirection('LEFT')"
          class="bg-[#ffb100] active:bg-[#47c41f] border-2 border-black flex items-center justify-center"
        >
          <ArrowLeft :size="18" />
        </button>
        <div
          class="flex items-center justify-center bg-[#1c1b1b] border border-black text-[#ffb100] text-[8px] font-bold"
        >
          DPAD
        </div>
        <button
          @click="changeDirection('RIGHT')"
          class="bg-[#ffb100] active:bg-[#47c41f] border-2 border-black flex items-center justify-center"
        >
          <ArrowRight :size="18" />
        </button>

        <div></div>
        <button
          @click="changeDirection('DOWN')"
          class="bg-[#ffb100] active:bg-[#47c41f] border-2 border-black flex items-center justify-center"
        >
          <ArrowDown :size="18" />
        </button>
        <div></div>
      </div>
    </div>
  </div>
</template>
