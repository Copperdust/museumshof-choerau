<template>
  <section id="oeffnungszeiten">
    <div class="container">
      <h2>Öffnungszeiten</h2>

      <div class="notice">
        <p><strong>Wir haben Winterpause. Das Museum ist ab 05. April 2026 wieder geöffnet.</strong></p>
      </div>

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

      <div class="extras">
        <p><strong>Sie möchten als Verein oder Firma unseren Museumshof als Eventlocation mieten? Kein Problem, gern unterbreiten wir Ihnen ein individuelles Angebot. Wenden Sie sich einfach per Mail unter <a href="mailto:museumshof-choerau@web.de">museumshof-choerau@web.de</a> oder via Telefon unter <a href="tel:+491638264397">0163-8264397</a> an uns. Wir freuen uns auf Sie.</strong></p>
        <p><strong>Für alle e-Biker: Ladestation via Schukosteckdose.</strong></p>
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

.notice {
  text-align: center;
  background: #d4a574;
  color: #2c1810;
  padding: 1rem 1.5rem;
  border-radius: 8px;
  margin-bottom: 2rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.hours-text,
.extras {
  max-width: 800px;
  margin: 0 auto;
}

.hours-text p,
.extras p {
  margin-bottom: 0.75rem;
  text-align: justify;
  color: #444;
  line-height: 1.8;
}

.time {
  font-size: 1.3rem;
  font-weight: 700;
  color: #2c1810;
}

ul {
  margin: 0 0 1rem 1.5rem;
  color: #444;
}

ul li {
  margin-bottom: 0.25rem;
}

.extras {
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid #e8ddd0;
}

.extras a {
  color: #8b4513;
}

.extras a:hover {
  text-decoration: underline;
}
</style>
