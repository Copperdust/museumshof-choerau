<script setup lang="ts">
import { ref, computed, nextTick, onMounted, onUnmounted } from 'vue'

interface BannerImage {
  src: string
  width: number
  height: number
}

const props = withDefaults(defineProps<{
  images: BannerImage[]
  height?: string
  parallax?: boolean
  slant?: number
  imageSlant?: number
}>(), {
  height: '40vh',
  parallax: true,
  slant: 0,
  imageSlant: 0,
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

// Slant: diagonal clip on the banner container
const bannerStyle = computed(() => {
  const s: Record<string, string> = { height: props.height }
  if (props.slant) {
    const abs = Math.abs(props.slant)
    // Negative = top-left lower, positive = top-right lower
    if (props.slant > 0) {
      s.clipPath = `polygon(0 ${abs}px, 100% 0, 100% calc(100% - ${abs}px), 0 100%)`
    } else {
      s.clipPath = `polygon(0 0, 100% ${abs}px, 100% 100%, 0 calc(100% - ${abs}px))`
    }
    s.marginTop = `-${abs}px`
    s.marginBottom = `-${abs}px`
  }
  return s
})

// Image slant: diagonal dividers between the 3 images via clip-path
function imageClip(index: number): Record<string, string> {
  if (!props.imageSlant) return {}
  const abs = Math.abs(props.imageSlant)
  const dir = props.imageSlant > 0
  const style: Record<string, string> = { margin: `0 -${abs}px` }
  // 3 images: first, middle, last
  if (index === 0) {
    style.marginLeft = '0'
    style.clipPath = dir
      ? `polygon(0 0, 100% 0, calc(100% - ${abs}px) 100%, 0 100%)`
      : `polygon(0 0, calc(100% - ${abs}px) 0, 100% 100%, 0 100%)`
  } else if (index === 2) {
    style.marginRight = '0'
    style.clipPath = dir
      ? `polygon(${abs}px 0, 100% 0, 100% 100%, 0 100%)`
      : `polygon(0 0, 100% 0, 100% 100%, ${abs}px 100%)`
  } else {
    style.clipPath = dir
      ? `polygon(${abs}px 0, 100% 0, calc(100% - ${abs}px) 100%, 0 100%)`
      : `polygon(0 0, calc(100% - ${abs}px) 0, 100% 100%, ${abs}px 100%)`
  }
  return style
}

// Shadow rotation to match slant angle
const shadowAngle = ref(0)

function updateShadowAngle() {
  if (!banner.value) return
  const slant = Number(props.slant)
  if (!slant) return
  const width = banner.value.offsetWidth
  shadowAngle.value = Math.atan2(-slant, width) * (180 / Math.PI)
}

onMounted(() => {
  updateShadowAngle()
  window.addEventListener('resize', updateShadowAngle, { passive: true })
  scheduleNext()
  if (props.parallax) {
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
  }
})

onUnmounted(() => {
  if (interval) clearTimeout(interval)
  if (props.parallax) window.removeEventListener('scroll', onScroll)
  window.removeEventListener('resize', updateShadowAngle)
})
</script>

<template>
  <div class="banner" ref="banner" :style="bannerStyle">
    <div :class="['banner-images', { parallax: props.parallax }]" :style="props.parallax ? { transform: `translateY(${scrollOffset}px)` } : {}">
      <div v-for="(img, i) in bannerImages" :key="i" class="banner-image" :style="imageClip(i)">
        <img :src="img.src" alt="Museumshof Chörau" />
        <img
          v-if="incoming && incoming.slot === i"
          :src="incoming.src"
          class="incoming"
          alt="Museumshof Chörau"
        />
      </div>
    </div>
    <div class="banner-shadow" :style="{ transform: `rotate(${shadowAngle}deg) scale(1.1)` }"></div>
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

.banner-shadow {
  position: absolute;
  inset: 0;
  box-shadow: inset 0 20px 40px rgba(0, 0, 0, 0.5), inset 0 -20px 40px rgba(0, 0, 0, 0.5);
  pointer-events: none;
  z-index: 1;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@media (max-width: 768px) {
  .banner-image:nth-child(3) {
    display: none;
  }
}
</style>
