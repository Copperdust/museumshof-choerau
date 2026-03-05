<script setup lang="ts">
const exhibitions = [
  {
    title: 'Spielzeug',
    description: 'Originale DDR-Spielzeuge aus verschiedenen Jahrzehnten.',
    icon: '🧸',
  },
  {
    title: 'Radio',
    description: 'Radioempfanger von 1930 bis 1991 im Wandel der Zeit.',
    icon: '📻',
  },
  {
    title: 'Fernseher',
    description: 'Fernsehgerate aus der fruhen Geschichte des Fernsehens bis zur Wendezeit.',
    icon: '📺',
  },
  {
    title: 'Antennen & Kabeltechnik',
    description: 'Ausstellung zur Antennen- und Kabelfernsehen-Technik.',
    icon: '📡',
  },
  {
    title: 'Wohnungen',
    description: 'Zwei komplett eingerichtete Wohnungen aus den Jahren 1935-1970 sowie eine DDR-Wohnung von 1970.',
    icon: '🏠',
  },
  {
    title: 'Aussenbereich',
    description: 'Garage mit Trabant-Werkzeug, Waschkuche mit historischen Waschgeraten und mehr.',
    icon: '🚗',
  },
]
</script>

<template>
  <section id="ausstellungen">
    <div class="container">
      <h2>Unsere Ausstellungsbereiche</h2>
      <p class="section-intro">
        Der 2017-2018 umgebaute Dreiseitenhof beherbergt auf mehreren Etagen und in verschiedenen
        Gebauden eine Vielzahl an Ausstellungsstucken aus der Zeit von 1930 bis 1989.
      </p>
      <div class="grid">
        <div v-for="ex in exhibitions" :key="ex.title" class="card">
          <span class="card-icon">{{ ex.icon }}</span>
          <h3>{{ ex.title }}</h3>
          <p>{{ ex.description }}</p>
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

.section-intro {
  text-align: center;
  max-width: 700px;
  margin: 0 auto 2.5rem;
  color: #666;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}

.card {
  background: #fff;
  border-radius: 8px;
  padding: 2rem;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
  transition: transform 0.2s, box-shadow 0.2s;
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
}

.card-icon {
  font-size: 2.5rem;
  display: block;
  margin-bottom: 1rem;
}

h3 {
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
  color: #2c1810;
}

p {
  color: #666;
  font-size: 0.95rem;
}
</style>
