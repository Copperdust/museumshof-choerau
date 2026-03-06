<script setup lang="ts">
interface HeroImage {
  src: string
  width: number
  height: number
}

const props = defineProps<{
  images: HeroImage[]
  title?: string
  subtitle?: string
}>()
</script>

<template>
  <div class="hero-wrapper" id="start">
    <ImageBanner :images="images" height="60vmin" :parallax="false">
      <div class="hero-overlay hero-overlay--floating">
        <div class="hero-content">
          <h1>{{ props.title || 'Museumshof Chörau' }}</h1>
          <p class="subtitle">{{ props.subtitle || 'Das Leben in den Jahren 1930 – 1989' }}</p>
        </div>
      </div>
    </ImageBanner>
    <div class="hero-overlay hero-overlay--bar">
      <div class="hero-content">
        <h1>{{ props.title || 'Museumshof Chörau' }}</h1>
        <p class="subtitle">{{ props.subtitle || 'Das Leben in den Jahren 1930 – 1989' }}</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import ImageBanner from './ImageBanner.vue'
export default { components: { ImageBanner } }
</script>

<style scoped>
/* Breakpoints: 1280px (desktop→tablet), 768px (tablet→mobile) */

.hero-wrapper {
  position: relative;
}

.hero-overlay {
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, var(--hero-overlay-from) 0%, var(--hero-overlay-to) 100%);
  text-align: center;
  padding: 3rem;
}

/* Floating overlay on large screens */
.hero-overlay--floating {
  position: absolute;
  bottom: 10%;
  left: 50%;
  transform: translateX(-50%);
  min-width: calc(50vw + 600px);
  z-index: 2;
  mask-image: linear-gradient(to right, transparent, black 300px, black calc(100% - 300px), transparent);
  -webkit-mask-image: linear-gradient(to right, transparent, black 300px, black calc(100% - 300px), transparent);
}

/* Bar below hero on smaller screens */
.hero-overlay--bar {
  display: none;
}

.hero-content {
  max-width: 700px;
}

h1 {
  font-size: var(--font-hero-title);
  color: var(--hero-text);
  margin-bottom: 0.5rem;
  letter-spacing: 0.02em;
}

.subtitle {
  font-size: var(--font-hero-subtitle);
  color: var(--hero-subtitle);
  font-style: italic;
}

@media (max-width: 1280px) {
  .hero-overlay--floating {
    display: none;
  }

  .hero-overlay--bar {
    display: flex;
  }
}
</style>
