<script setup lang="ts">
interface EventItem {
  title: string
  start: string
  end: string | null
  description?: string
  badge?: string
}

interface Props {
  events: EventItem[]
  intro?: string
}

const props = withDefaults(defineProps<Props>(), {
  events: () => [],
  intro: '',
})

const MONTHS_DE = ['JAN', 'FEB', 'MÄR', 'APR', 'MAI', 'JUN', 'JUL', 'AUG', 'SEP', 'OKT', 'NOV', 'DEZ']

const now = new Date()
const todayISO = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`

const sortedEvents = [...props.events].sort(
  (a, b) => new Date(a.start).getTime() - new Date(b.start).getTime(),
)

function isPast(e: EventItem): boolean {
  return (e.end ?? e.start) < todayISO
}

function parseBadge(iso: string) {
  const [y, m, d] = iso.split('-')
  return {
    month: MONTHS_DE[parseInt(m, 10) - 1],
    day: d,
    year: y,
  }
}
</script>

<template>
  <section id="termine" class="site-section">
    <div class="container">
      <h2>Termine &amp; Veranstaltungen</h2>
      <p v-if="intro" class="intro">{{ intro }}</p>

      <div v-if="sortedEvents.length" class="events-container">
      <div class="events-list">
        <article
          v-for="event in sortedEvents"
          :key="event.title + event.start"
          :class="['event', { past: isPast(event) }]"
          :data-kind="event.end ? 'range' : 'single'"
        >
          <div class="date-col">
            <template v-if="event.end">
              <div class="range">
                <div class="badge">
                  <div class="m">{{ parseBadge(event.start).month }}</div>
                  <div class="d">{{ parseBadge(event.start).day }}</div>
                  <div class="y">{{ parseBadge(event.start).year }}</div>
                </div>
                <span class="dash" aria-hidden="true"></span>
                <div class="badge">
                  <div class="m">{{ parseBadge(event.end).month }}</div>
                  <div class="d">{{ parseBadge(event.end).day }}</div>
                  <div class="y">{{ parseBadge(event.end).year }}</div>
                </div>
              </div>
            </template>
            <template v-else>
              <div class="badge">
                <div class="m">{{ parseBadge(event.start).month }}</div>
                <div class="d">{{ parseBadge(event.start).day }}</div>
                <div class="y">{{ parseBadge(event.start).year }}</div>
              </div>
            </template>
          </div>
          <div class="body">
            <h3 class="title">{{ event.title }}</h3>
            <div v-if="event.description" class="meta">{{ event.description }}</div>
            <span v-if="event.badge" class="badge-pill">{{ event.badge }}</span>
          </div>
        </article>
      </div>
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

.intro {
  max-width: 540px;
  margin: 1.125rem auto 2.5rem;
  text-align: center;
  color: var(--body-text-light);
  font-size: 0.9375rem;
}

.events-container {
  --ev-gap: 1rem;
  --ev-card-radius: 0.5rem;
  --ev-card-shadow: 0 2px 8px rgba(80, 5, 0, 0.06);
  --ev-card-shadow-hover: 0 6px 18px rgba(80, 5, 0, 0.12);

  --ev-title-size: 1rem;
  --ev-meta-size: 0.8125rem;

  --ev-badge-w: 3.375rem;
  --ev-badge-m-size: 0.625rem;
  --ev-badge-d-size: 1.25rem;
  --ev-badge-y-size: 0.625rem;
  --ev-badge-radius: 0.375rem;

  --ev-dash-w: 0.625rem;
  --ev-dash-thickness: 0.125rem;

  container-type: inline-size;
  container-name: events;
}

.events-list {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--ev-gap);
}

@container events (min-width: 47.5rem) {
  .events-list {
    grid-template-columns: repeat(2, 1fr);
  }
}

@container events (min-width: 71.25rem) {
  .events-list {
    grid-template-columns: repeat(3, 1fr);
  }
}

.event {
  background: var(--card-bg);
  border-radius: var(--ev-card-radius);
  box-shadow: var(--ev-card-shadow);
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 0.875rem;
  padding: 0.75rem 0.875rem;
  align-items: center;
  transition: box-shadow 0.18s ease, transform 0.18s ease;
}

.event:hover {
  box-shadow: var(--ev-card-shadow-hover);
  transform: translateY(-1px);
}

.date-col {
  display: flex;
  align-items: center;
  min-width: 0;
}

.range {
  display: flex;
  align-items: center;
  gap: 0.375rem;
}

.dash {
  display: inline-block;
  width: var(--ev-dash-w);
  height: var(--ev-dash-thickness);
  background: var(--color-tan);
  border-radius: 1px;
  flex-shrink: 0;
}

.badge {
  width: var(--ev-badge-w);
  border-radius: var(--ev-badge-radius);
  overflow: hidden;
  text-align: center;
  background: #fff;
  border: 1px solid rgba(80, 5, 0, 0.08);
  flex-shrink: 0;
}

.badge .m {
  background: var(--color-maroon);
  color: var(--color-gold-light);
  font-size: var(--ev-badge-m-size);
  font-weight: 700;
  letter-spacing: 0.09em;
  padding: 0.1875rem 0;
  text-transform: uppercase;
}

.badge .d {
  color: var(--color-maroon);
  font-size: var(--ev-badge-d-size);
  font-weight: 700;
  line-height: 1.05;
  padding: 0.25rem 0 0;
}

.badge .y {
  color: #9a9a9a;
  font-size: var(--ev-badge-y-size);
  padding: 0.125rem 0 0.3125rem;
}

.event.past .badge .m {
  background: var(--color-gray);
  color: #fff;
}

.event.past .badge .d {
  color: var(--color-gray);
}

.event.past .title {
  color: var(--color-gray);
  font-weight: 600;
}

.event.past .dash {
  background: #c9c9c9;
}

.body {
  min-width: 0;
  padding-right: 0.5rem;
}

.title {
  font-family: inherit;
  font-weight: 700;
  color: var(--color-maroon);
  font-size: var(--ev-title-size);
  line-height: 1.35;
  margin: 0 0 0.25rem;
  text-align: left;
}

.title::after {
  content: none;
}

.meta {
  font-size: var(--ev-meta-size);
  color: var(--color-gray);
  line-height: 1.4;
  font-style: italic;
}

.badge-pill {
  display: inline-block;
  font-size: 0.6875rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  padding: 0.125rem 0.5rem;
  border-radius: 999px;
  background: var(--color-gold-light);
  color: var(--color-maroon);
  margin-top: 0.375rem;
}

@container events (max-width: 25rem) {
  .event {
    gap: 0.625rem;
    padding: 0.75rem;
  }
  .events-container {
    --ev-title-size: 0.9375rem;
  }
}

.no-events {
  text-align: center;
  color: var(--card-text);
  font-style: italic;
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
</style>
