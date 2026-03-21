<script setup lang="ts">
import { ref, computed, nextTick, onMounted, onUnmounted } from 'vue'
import ContactForm from './ContactForm.vue'

const props = defineProps<{
  impressumHtml: string
}>()

// Reuse image loading from global
const allImages = Object.entries(
  import.meta.glob('/public/images/gallery/*.webp', { eager: true })
).map(([path, mod]: [string, any]) => ({
  src: path.replace('/public', ''),
  width: mod.default?.width ?? 1000,
  height: mod.default?.height ?? 700,
})).filter(img => img.width >= 800 && img.height >= 600)

function pickRandom(exclude: string[]) {
  const candidates = allImages.filter(img => !exclude.includes(img.src))
  return candidates[Math.floor(Math.random() * candidates.length)]
}

function pickInitial() {
  const picked: any[] = []
  for (let i = 0; i < 3; i++) {
    picked.push(pickRandom(picked.map(p => p.src)))
  }
  return picked
}

const bannerImages = ref(pickInitial())
const recentSrcs: string[] = bannerImages.value.map((img: any) => img.src)
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

const banner = ref<HTMLElement | null>(null)

onMounted(() => {
  scheduleNext()
})

onUnmounted(() => {
  if (interval) clearTimeout(interval)
})
</script>

<template>
  <section id="kontakt" class="contact-banner" ref="banner">
    <div class="banner-images">
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
    <div class="banner-shadow"></div>
    <div class="contact-overlay">
      <div class="contact-cards">
        <div class="contact-card contact-info">
          <div v-html="impressumHtml"></div>
        </div>
        <div class="contact-card contact-form-card">
          <ContactForm />
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
@use '../styles/fluid' as *;
.contact-banner {
  position: relative;
  overflow: hidden;
}

.banner-images {
  display: flex;
  position: absolute;
  inset: 0;
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

.contact-overlay {
  position: relative;
  z-index: 2;
  @include fluid-prop(padding, 1.5rem, 2rem, 3rem, 4rem);
}

.contact-cards {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  @include fluid-prop(gap, 1rem, 1.5rem, 2rem, 2rem);
}

.contact-card {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 8px;
  @include fluid-prop(padding, 1.25rem, 1.5rem, 1.75rem, 2rem);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  flex: none;
}

.contact-card :deep(h2) {
  font-size: var(--font-h3);
  color: var(--section-heading);
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid var(--section-heading-underline);
  text-align: left;
}

.contact-card :deep(h2::after) {
  display: none;
}

.contact-card :deep(p) {
  color: var(--body-text);
  line-height: 1.8;
  margin-bottom: 1rem;
}

.contact-card :deep(p:last-child) {
  margin-bottom: 0;
}

.contact-card :deep(a) {
  color: var(--contact-link);
  text-decoration: none;
}

.contact-card :deep(a:hover) {
  text-decoration: underline;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@media (max-width: 768px) {
  .contact-banner {
    height: auto;
    min-height: 0;
  }

  .banner-images {
    position: relative;
    top: 0;
    height: 300px;
  }

  .banner-image:nth-child(3) {
    display: none;
  }

  .contact-overlay {
    position: relative;
  }

  .contact-cards {
    flex-direction: column;
    align-items: stretch;
  }

  .contact-card {
    flex: none;
  }
}
</style>
