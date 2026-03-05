<script setup lang="ts">
interface HeroImage {
  src: string
  width: number
  height: number
}

defineProps<{
  images: HeroImage[]
}>()
</script>

<template>
  <ImageBanner :images="images" height="60vh" :parallax="false" id="start">
    <div class="hero-overlay">
      <div class="hero-content">
        <h1>Museumshof Chörau</h1>
        <p class="subtitle">Das Leben in den Jahren 1930 &ndash; 1989</p>
      </div>
    </div>
  </ImageBanner>
</template>

<script lang="ts">
import ImageBanner from './ImageBanner.vue'
export default { components: { ImageBanner } }
</script>

<style scoped>
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
  h1 {
    font-size: 2rem;
  }

  .subtitle {
    font-size: 1.15rem;
  }
}
</style>
