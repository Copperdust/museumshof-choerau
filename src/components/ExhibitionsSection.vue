<script setup lang="ts">
const exhibitions = [
  {
    title: 'Spielzeug',
    image: '/images/exhibitions/spielzeug.jpg',
  },
  {
    title: 'Radio',
    image: '/images/exhibitions/radio.jpg',
  },
  {
    title: 'Fernseher',
    image: '/images/exhibitions/fernseher.jpg',
  },
  {
    title: 'Antennen',
    image: '/images/exhibitions/antenne.jpg',
  },
  {
    title: 'Wohnungen',
    image: '/images/exhibitions/wohnungen.jpg',
  },
  {
    title: 'Außenbereich',
    image: '/images/exhibitions/aussen.jpg',
  },
]
</script>

<template>
  <section id="ausstellungen">
    <div class="container">
      <h2>Unsere Ausstellungsbereiche</h2>
      <div class="grid">
        <div v-for="ex in exhibitions" :key="ex.title" class="card">
          <div class="card-image">
            <img :src="ex.image" :alt="ex.title" loading="lazy" />
          </div>
          <h3>{{ ex.title }}</h3>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}

.card {
  background: var(--card-bg);
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
}

.card-image {
  aspect-ratio: 1;
  overflow: hidden;
}

.card-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

h3 {
  font-size: 1.2rem;
  color: var(--card-heading);
  text-align: center;
  padding: 1rem;
}
</style>
