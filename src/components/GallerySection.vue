<script setup lang="ts">
import { ref } from 'vue'
import { Carousel, Slide, Navigation } from 'vue3-carousel'
import 'vue3-carousel/carousel.css'

const images = [
  'IMG_0256', 'IMG_9869', 'IMG_0288', 'IMG_0254', 'IMG_0258', 'IMG_0243',
  'IMG_0244', 'IMG_0240', 'IMG_0248', 'IMG_0251', 'IMG_0233', 'IMG_0234',
  'IMG_0239', 'IMG_0253', 'IMG_0263', 'IMG_0267', 'IMG_0268', 'IMG_0270',
  'IMG_0271', 'IMG_0273', 'IMG_0274', 'IMG_0275', 'IMG_0281', 'IMG_0287',
  'IMG_9864', 'IMG_9865',
].map((name) => ({
  src: `/images/gallery/${name}.JPG`,
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
  itemsToShow: 6,
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
  <section id="galerie">
    <div class="container">
      <div class="video-wrapper">
        <iframe
          width="800"
          height="450"
          src="https://www.youtube.com/embed/qlJWguweo4U"
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

<style scoped>
section {
  padding: 0;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

.video-wrapper {
  max-width: 800px;
  margin: 1.5rem auto 5rem;
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
  border-radius: 8px;
  overflow: hidden;
  background: var(--gallery-bg);
  --vc-nav-background: var(--gallery-nav-bg);
  --vc-nav-border-radius: 50%;
  --vc-nav-color: var(--gallery-nav-color);
  --vc-nav-width: 48px;
  --vc-nav-height: 48px;
}

.gallery-img {
  width: 100%;
  aspect-ratio: 4 / 3;
  object-fit: contain;
}

#thumbnails {
  margin-top: 0.75rem;
}

.thumb {
  padding: 2px;
  cursor: pointer;
  opacity: 0.5;
  transition: opacity 0.3s;
  border: 2px solid transparent;
  border-radius: 4px;
  overflow: hidden;
}

.thumb.active {
  opacity: 1;
  border-color: var(--gallery-thumb-border);
}

.thumb:hover {
  opacity: 0.85;
}

.thumb img {
  width: 100%;
  aspect-ratio: 4 / 3;
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
