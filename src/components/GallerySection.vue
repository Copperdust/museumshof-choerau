<script setup lang="ts">
import { ref } from 'vue'

// Placeholder images - replace with actual museum photos
const images = [
  { src: '/images/gallery-1.jpg', alt: 'Eroffnungsfeier des Museumshofs' },
  { src: '/images/gallery-2.jpg', alt: 'Spielzeugausstellung' },
  { src: '/images/gallery-3.jpg', alt: 'Historische Radios' },
  { src: '/images/gallery-4.jpg', alt: 'Eingerichtete Wohnung' },
  { src: '/images/gallery-5.jpg', alt: 'Aussenbereich des Museumshofs' },
  { src: '/images/gallery-6.jpg', alt: 'Fernsehausstellung' },
]

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
      <h2>Galerie</h2>
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
        <button class="lightbox-close" @click="closeLightbox" aria-label="Schliessen">&times;</button>
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
