<script setup lang="ts">
import { ref } from 'vue'
import { Carousel, Slide, Navigation } from 'vue3-carousel'
import 'vue3-carousel/carousel.css'

const props = defineProps<{
  youtubeVideo?: string
  base?: string
}>()

const images = [
  'IMG_0256', 'IMG_9869', 'IMG_0288', 'IMG_0254', 'IMG_0258', 'IMG_0243',
  'IMG_0244', 'IMG_0240', 'IMG_0248', 'IMG_0251', 'IMG_0233', 'IMG_0234',
  'IMG_0239', 'IMG_0253', 'IMG_0263', 'IMG_0267', 'IMG_0268', 'IMG_0270',
  'IMG_0271', 'IMG_0273', 'IMG_0274', 'IMG_0275', 'IMG_0281', 'IMG_0287',
  'IMG_9864', 'IMG_9865',
].map((name) => ({
  src: `${props.base || ''}/images/gallery/${name}.webp`,
  alt: `Museumshof Chörau - ${name}`,
}))

const currentSlide = ref(0)

const galleryConfig = {
  itemsToShow: 1,
  wrapAround: true,
  slideEffect: 'fade',
  mouseDrag: false,
  touchDrag: true,
}

const thumbConfig = {
  itemsToShow: 'auto' as const,
  wrapAround: true,
  gap: 10,
  mouseDrag: true,
  touchDrag: true,
}

function slideTo(index: number) {
  currentSlide.value = index
}
</script>

<template>
  <section id="galerie" class="site-section">
    <div class="container">
      <div class="video-wrapper">
        <iframe
          width="800"
          height="450"
          :src="props.youtubeVideo || 'https://www.youtube.com/embed/qlJWguweo4U'"
          allowfullscreen
          loading="lazy"
          title="Museumshof Chörau Video"
        ></iframe>
      </div>

      <h2>Impressionen</h2>

      <div class="gallery">
        <Carousel id="gallery" v-bind="galleryConfig" v-model="currentSlide">
          <Slide v-for="(image, i) in images" :key="i">
            <img :src="image.src" :alt="image.alt" class="gallery-img" />
          </Slide>
          <template #addons>
            <Navigation />
          </template>
        </Carousel>

        <Carousel
          id="thumbnails"
          v-bind="thumbConfig"
          v-model="currentSlide"
          ref="thumbCarousel"
        >
          <Slide v-for="(image, i) in images" :key="i">
            <div
              :class="['thumb', { active: currentSlide === i }]"
              @click="slideTo(i)"
            >
              <img :src="image.src" :alt="image.alt" loading="lazy" />
            </div>
          </Slide>
        </Carousel>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
@use '../styles/fluid' as *;
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

.video-wrapper {
  max-width: 800px;
  @include fluid-prop(margin-top, 1rem, 1.25rem, 1.5rem, 1.5rem);
  @include fluid-prop(margin-bottom, 2.5rem, 3.5rem, 5rem, 5rem);
  margin-inline: auto;
  aspect-ratio: 16 / 9;
}

.video-wrapper iframe {
  width: 100%;
  height: 100%;
  border: 0;
  border-radius: 8px;
}

.gallery {
  max-width: 900px;
  margin: 0 auto;
}

#gallery {
  height: clamp(200px, 60vh, 675px);
  border-radius: 8px;
  overflow: hidden;
  background: var(--gallery-bg);
  --vc-nav-background: var(--gallery-nav-bg);
  --vc-nav-border-radius: 50%;
  --vc-nav-color: var(--gallery-nav-color);
  --vc-nav-width: 48px;
  --vc-nav-height: 48px;
}

#gallery :deep(.carousel__viewport),
#gallery :deep(.carousel__track),
#gallery :deep(.carousel__slide) {
  height: 100%;
  max-height: 75vh;
}

.gallery-img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

#thumbnails {
  height: clamp(50px, 8vh, 100px);
  margin-top: 0.75rem;
}

#thumbnails :deep(.carousel__viewport),
#thumbnails :deep(.carousel__track),
#thumbnails :deep(.carousel__slide) {
  height: 100%;
}

.thumb {
  padding: 2px;
  cursor: pointer;
  opacity: 0.5;
  transition: opacity 0.3s;
  border: 2px solid transparent;
  border-radius: 4px;
  overflow: hidden;
  height: 100%;
}

.thumb.active {
  opacity: 1;
  border-color: var(--gallery-thumb-border);
}

.thumb:hover {
  opacity: 0.85;
}

.thumb img {
  width: auto;
  height: 100%;
  object-fit: cover;
  border-radius: 2px;
  display: block;
}

#gallery :deep(.carousel__prev) {
  left: 10px;
}

#gallery :deep(.carousel__next) {
  right: 10px;
}

@media (max-width: 768px) {
  #gallery {
    --vc-nav-width: 36px;
    --vc-nav-height: 36px;
  }
}
</style>
