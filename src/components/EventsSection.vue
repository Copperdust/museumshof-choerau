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
          <div class="event-title">{{ event.title }}</div>
        </article>
      </div>
      <p v-else class="no-events">
        Derzeit sind keine Veranstaltungen geplant. Schauen Sie bald wieder vorbei!
      </p>
    </div>
  </section>
</template>

<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

.events-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 0.75rem;
}

.event-row {
  display: grid;
  grid-template-columns: 52px 1fr;
  align-items: center;
  gap: 1rem;
  background: var(--card-bg);
  border-radius: 8px;
  padding: 0.75rem 1rem;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
}

.event-date {
  display: grid;
  grid-template-rows: auto 1fr auto;
  justify-items: center;
  width: 52px;
  border-radius: 6px;
  overflow: hidden;
  background: var(--card-bg);
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
}

.event-date .month {
  width: 100%;
  text-align: center;
  font-size: 0.65rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  padding-top: 0.2rem;
  padding-bottom: 0.1rem;
  background: var(--event-date-bg);
  color: var(--event-date-text);
}

.event-date .day {
  font-size: 1.2rem;
  font-weight: 700;
  line-height: 1;
  padding-top: 0.2rem;
  padding-bottom: 0.1rem;
  color: var(--card-heading);
}

.event-date .year {
  font-size: 0.6rem;
  color: var(--body-text-light);
  padding-bottom: 0.2rem;
}

.event-title {
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--card-heading);
  line-height: 1.2;
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
