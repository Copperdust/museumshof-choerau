<script setup lang="ts">
import { ref, nextTick, onMounted, onUnmounted } from 'vue'

interface HeroImage {
  src: string
  width: number
  height: number
}

const props = defineProps<{
  images: HeroImage[]
}>()

function pickRandom(exclude: string[]): HeroImage {
  const candidates = props.images.filter((img) => !exclude.includes(img.src))
  return candidates[Math.floor(Math.random() * candidates.length)]
}

function pickInitial(): HeroImage[] {
  const picked: HeroImage[] = []
  for (let i = 0; i < 3; i++) {
    picked.push(pickRandom(picked.map((p) => p.src)))
  }
  return picked
}

const heroImages = ref(pickInitial())
const recentSrcs: string[] = heroImages.value.map((img) => img.src)
const incoming = ref<{ slot: number; src: string } | null>(null)
let currentSlot = 0
let interval: ReturnType<typeof setTimeout> | null = null

const FADE_DURATION = 2000

function scheduleNext() {
  interval = setTimeout(() => {
    const slot = currentSlot
    const next = pickRandom(recentSrcs)
    recentSrcs.push(next.src)
    if (recentSrcs.length > 6) recentSrcs.shift()

    incoming.value = { slot, src: next.src }

    setTimeout(async () => {
      heroImages.value[slot] = next
      await nextTick()
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          incoming.value = null
        })
      })
    }, FADE_DURATION)

    currentSlot = (currentSlot + 1) % 3
    scheduleNext()
  }, 4000)
}

onMounted(() => {
  scheduleNext()
})

onUnmounted(() => {
  if (interval) clearTimeout(interval)
})
</script>

<template>
  <div id="start" class="hero">
    <div class="hero-images">
      <div v-for="(img, i) in heroImages" :key="i" class="hero-image">
        <img :src="img.src" alt="Museumshof Chörau" />
        <img
          v-if="incoming && incoming.slot === i"
          :src="incoming.src"
          class="incoming"
          alt="Museumshof Chörau"
        />
      </div>
    </div>
    <div class="hero-overlay">
      <div class="hero-content">
        <h1>Museumshof Chörau</h1>
        <p class="subtitle">Das Leben in den Jahren 1930 &ndash; 1989</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.hero {
  position: relative;
  display: flex;
  flex-direction: column;
  color: var(--hero-text);
}

.hero-images {
  display: flex;
  width: 100%;
  height: 60vh;
  overflow: hidden;
}

.hero-image {
  flex: 1;
  overflow: hidden;
  position: relative;
}

.hero-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.hero-image img.incoming {
  position: absolute;
  inset: 0;
  animation: fadeIn 2s ease forwards;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.hero-overlay {
  position: absolute;
  bottom: 10%;
  left: 50%;
  padding: 3rem;
  transform: translateX(-50%);
  min-width: calc(50vw + 600px);
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, var(--hero-overlay-from) 0%, var(--hero-overlay-to) 100%);
  text-align: center;
  mask-image: linear-gradient(to right, transparent, black 300px, black calc(100% - 300px), transparent);
  -webkit-mask-image: linear-gradient(to right, transparent, black 300px, black calc(100% - 300px), transparent);
}

.hero-content {
  max-width: 700px;
}

h1 {
  font-size: 3rem;
  color: var(--hero-text);
  margin-bottom: 0.5rem;
  letter-spacing: 0.02em;
}

.subtitle {
  font-size: 1.5rem;
  color: var(--hero-subtitle);
  font-style: italic;
}

@media (max-width: 768px) {
  .hero-images {
    flex-direction: column;
    height: 50vh;
  }

  .hero-image {
    height: 33.33%;
  }

  h1 {
    font-size: 2rem;
  }

  .subtitle {
    font-size: 1.15rem;
  }
}
</style>
