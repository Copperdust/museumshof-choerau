<script setup lang="ts">
import { ref, nextTick, onMounted, onUnmounted } from 'vue'

interface BannerImage {
  src: string
  width: number
  height: number
}

const props = withDefaults(defineProps<{
  images: BannerImage[]
  height?: string
  parallax?: boolean
}>(), {
  height: '40vh',
  parallax: true,
})

function pickRandom(exclude: string[]): BannerImage {
  const candidates = props.images.filter((img) => !exclude.includes(img.src))
  return candidates[Math.floor(Math.random() * candidates.length)]
}

function pickInitial(): BannerImage[] {
  const picked: BannerImage[] = []
  for (let i = 0; i < 3; i++) {
    picked.push(pickRandom(picked.map((p) => p.src)))
  }
  return picked
}

const bannerImages = ref(pickInitial())
const recentSrcs: string[] = bannerImages.value.map((img) => img.src)
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
      bannerImages.value[slot] = next
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

// Parallax
const banner = ref<HTMLElement | null>(null)
const scrollOffset = ref(0)

function onScroll() {
  if (!banner.value) return
  const rect = banner.value.getBoundingClientRect()
  const viewH = window.innerHeight
  // Only calculate when visible
  if (rect.bottom > 0 && rect.top < viewH) {
    const center = rect.top + rect.height / 2
    const ratio = (center - viewH / 2) / viewH
    scrollOffset.value = ratio * -150
  }
}

onMounted(() => {
  scheduleNext()
  if (props.parallax) {
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
  }
})

onUnmounted(() => {
  if (interval) clearTimeout(interval)
  if (props.parallax) window.removeEventListener('scroll', onScroll)
})
</script>

<template>
  <div class="banner" ref="banner" :style="{ height: props.height }">
    <div :class="['banner-images', { parallax: props.parallax }]" :style="props.parallax ? { transform: `translateY(${scrollOffset}px)` } : {}">
      <div v-for="(img, i) in bannerImages" :key="i" class="banner-image">
        <img :src="img.src" alt="Museumshof Chörau" />
        <img
          v-if="incoming && incoming.slot === i"
          :src="incoming.src"
          class="incoming"
          alt="Museumshof Chörau"
        />
      </div>
    </div>
    <slot />
  </div>
</template>

<style scoped>
.banner {
  position: relative;
  overflow: hidden;
}

.banner-images {
  display: flex;
  width: 100%;
  height: 100%;
}

.banner-images.parallax {
  height: 160%;
  position: absolute;
  top: -30%;
  left: 0;
  will-change: transform;
}

.banner-image {
  flex: 1;
  position: relative;
}

.banner-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.banner-image img.incoming {
  position: absolute;
  inset: 0;
  animation: fadeIn 2s ease forwards;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@media (max-width: 768px) {
  .banner-images {
    flex-direction: column;
  }

  .banner-image {
    height: 33.33%;
  }
}
</style>
