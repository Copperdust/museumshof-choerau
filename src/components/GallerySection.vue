<script setup lang="ts">
import { ref } from 'vue'

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

const lightboxImage = ref<{ src: string; alt: string } | null>(null)

function openLightbox(image: { src: string; alt: string }) {
  lightboxImage.value = image
}

function closeLightbox() {
  lightboxImage.value = null
}
</script>

<template>
  <section id="galerie">
    <div class="container">
      <h2>Impressionen</h2>

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

      <div class="gallery-grid">
        <button
          v-for="image in images"
          :key="image.src"
          class="gallery-item"
          @click="openLightbox(image)"
        >
          <img :src="image.src" :alt="image.alt" loading="lazy" />
        </button>
      </div>
    </div>

    <Teleport to="body">
      <div v-if="lightboxImage" class="lightbox" @click="closeLightbox">
        <button class="lightbox-close" @click="closeLightbox" aria-label="Schließen">&times;</button>
        <img :src="lightboxImage.src" :alt="lightboxImage.alt" />
      </div>
    </Teleport>
  </section>
</template>

<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

.video-wrapper {
  max-width: 800px;
  margin: 0 auto 2rem;
  aspect-ratio: 16 / 9;
}

.video-wrapper iframe {
  width: 100%;
  height: 100%;
  border: 0;
  border-radius: 8px;
}

.gallery-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1rem;
}

.gallery-item {
  border: none;
  padding: 0;
  background: none;
  cursor: pointer;
  overflow: hidden;
  border-radius: 8px;
  aspect-ratio: 4 / 3;
}

.gallery-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s;
}

.gallery-item:hover img {
  transform: scale(1.05);
}

.lightbox {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
  padding: 2rem;
}

.lightbox img {
  max-width: 90vw;
  max-height: 90vh;
  object-fit: contain;
  border-radius: 4px;
}

.lightbox-close {
  position: absolute;
  top: 1rem;
  right: 1.5rem;
  background: none;
  border: none;
  color: white;
  font-size: 2.5rem;
  cursor: pointer;
  line-height: 1;
}
</style>
