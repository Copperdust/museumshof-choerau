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

const upcomingEvents = props.events
  .filter((e) => new Date(e.date) >= new Date())
  .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
</script>

<template>
  <section id="termine">
    <div class="container">
      <h2>Termine & Veranstaltungen</h2>
      <div v-if="upcomingEvents.length" class="events-list">
        <article v-for="event in upcomingEvents" :key="event.title + event.date" class="event-card">
          <div class="event-date">
            <span class="day">{{ new Date(event.date).getDate() }}</span>
            <span class="month">{{ new Date(event.date).toLocaleDateString('de-DE', { month: 'short' }) }}</span>
          </div>
          <div class="event-info">
            <h3>{{ event.title }}</h3>
            <p>{{ event.description }}</p>
          </div>
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

.events-list {
  max-width: 700px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.event-card {
  display: flex;
  gap: 1.5rem;
  background: var(--card-bg);
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
}

.event-date {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-width: 60px;
  padding: 0.5rem;
  background: var(--event-date-bg);
  color: var(--event-date-text);
  border-radius: 6px;
}

.event-date .day {
  font-size: 1.5rem;
  font-weight: 700;
  line-height: 1;
}

.event-date .month {
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.event-info h3 {
  font-size: 1.1rem;
  margin-bottom: 0.25rem;
  color: var(--card-heading);
}

.event-info p {
  color: var(--card-text);
  font-size: 0.95rem;
}

.no-events {
  text-align: center;
  color: var(--card-text);
  font-style: italic;
}
</style>
