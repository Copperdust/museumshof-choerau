<script setup lang="ts">
// Events will be loaded from src/content/events/*.md at build time
// and passed as props from the Astro page.
// For now, this component displays whatever events are passed to it.

interface Event {
  title: string
  date: string
  description: string
}

interface Props {
  events: Event[]
}

const props = withDefaults(defineProps<Props>(), {
  events: () => [],
})

function formatDate(dateStr: string): string {
  const date = new Date(dateStr)
  return date.toLocaleDateString('de-DE', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

const now = new Date()
const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())

const sortedEvents = props.events
  .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

function isPast(dateStr: string): boolean {
  return new Date(dateStr) < today
}
</script>

<template>
  <section id="termine" class="site-section">
    <div class="container">
      <h2>Termine & Veranstaltungen</h2>
      <div v-if="sortedEvents.length" class="events-grid">
        <article v-for="event in sortedEvents" :key="event.title + event.date" :class="['event-row', { past: isPast(event.date) }]">
          <div class="event-date">
            <span class="month">{{ new Date(event.date).toLocaleDateString('de-DE', { month: 'short' }) }}</span>
            <span class="day">{{ new Date(event.date).getDate() }}</span>
            <span class="year">{{ new Date(event.date).getFullYear() }}</span>
          </div>
          <div class="event-text">
            <span class="event-title">{{ event.title }}</span>
          </div>
        </article>
      </div>
      <p v-else class="no-events">
        Derzeit sind keine Veranstaltungen geplant. Schauen Sie bald wieder vorbei!
      </p>
      <div class="booking-wrapper">
        <h3>Terminbuchung</h3>
        <iframe
          src="https://app.agendize.com/book/iframe/1016154753579309?lang=de"
          width="100%"
          height="600"
          frameborder="0"
          loading="lazy"
          title="Terminbuchung Museumshof Chörau"
        ></iframe>
      </div>
    </div>
  </section>
</template>

<style scoped>
.container {
  max-width: 1500px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

.events-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 0.75rem 1.2rem;
}

.event-row {
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: stretch;
  gap: 0.5rem;
}

.event-date {
  display: grid;
  grid-template-rows: auto 1fr auto;
  justify-items: center;
  align-items: center;
  width: 72px;
  aspect-ratio: 5 / 6;
  border-radius: 8px;
  overflow: hidden;
  background: var(--card-bg);
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
}

.event-date .month {
  width: 100%;
  text-align: center;
  font-size: 0.8rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  padding: 0.2rem 0;
  background: var(--event-date-bg);
  color: var(--event-date-text);
}

.event-date .day {
  font-size: 1.8rem;
  font-weight: 700;
  line-height: 1;
  color: var(--card-heading);
}

.event-date .year {
  font-size: 0.75rem;
  color: var(--body-text-light);
  padding-bottom: 0.12rem;
  margin-top: -6px;
}

.event-text {
  display: flex;
  align-items: center;
  background: var(--card-bg);
  border-radius: 8px;
  padding: 0.75rem 1rem;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
}

.event-title {
  font-size: 1.05rem;
  font-weight: 600;
  color: var(--card-heading);
  line-height: 1.2;
}


.booking-wrapper {
  margin-top: 2rem;
  text-align: center;
}

.booking-wrapper h3 {
  font-size: var(--font-highlight);
  color: var(--section-heading);
  margin-bottom: 1rem;
}

.booking-wrapper iframe {
  max-width: 800px;
  border-radius: 8px;
  border: 0;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
}

.event-row.past {
  opacity: 0.5;
  filter: saturate(0);
}

.no-events {
  text-align: center;
  color: var(--card-text);
  font-style: italic;
}
</style>
