<template>
  <section id="oeffnungszeiten" class="site-section">
    <div class="container">
      <h2>Öffnungszeiten</h2>

      <div class="hours-text">
        <p>Liebe Besucher,</p>
        <p>Unser Museumshof Chörau ist von April bis November zu folgenden Zeiten für Sie geöffnet:</p>
        <p class="time">jeden Sonntag 14:00 Uhr - 17:00 Uhr</p>
        <p><strong>Eintrittspreise</strong></p>
        <p>regulär:</p>
        <ul>
          <li>Erwachsene: 5,00 €</li>
          <li>Kinder: 4,00 €</li>
        </ul>
        <p>Des Weiteren besteht die Möglichkeit auf Terminvereinbarungen und individuellen Führungen durch unseren Museumshof.<br />Rufen Sie uns zur individuellen Terminvereinbarung doch einfach direkt an oder schreiben Sie uns eine E-Mail.</p>
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

.hours-text {
  max-width: 800px;
  margin: 0 auto;
}

.hours-text p {
  margin-bottom: 0.75rem;
  text-align: justify;
  color: var(--body-text);
  line-height: 1.8;
}

.time {
  font-size: 1.3rem;
  font-weight: 700;
  color: var(--hours-time);
}

ul {
  margin: 0 0 1rem 1.5rem;
  color: var(--body-text);
}

ul li {
  margin-bottom: 0.25rem;
}

</style>
