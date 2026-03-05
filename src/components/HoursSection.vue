<template>
  <section id="oeffnungszeiten">
    <div class="container">
      <h2>Offnungszeiten & Eintritt</h2>

      <div class="notice">
        <p><strong>Wir haben Winterpause.</strong> Das Museum ist ab 05. April 2026 wieder geoffnet.</p>
      </div>

      <div class="cards">
        <div class="info-card">
          <h3>Offnungszeiten</h3>
          <p class="highlight">April bis November</p>
          <p>Jeden Sonntag</p>
          <p class="time">14:00 &ndash; 17:00 Uhr</p>
          <p class="note">Gruppenfuhrungen nach Vereinbarung</p>
        </div>

        <div class="info-card">
          <h3>Eintrittspreise</h3>
          <div class="price-row">
            <span>Erwachsene</span>
            <span class="price">5,00 &euro;</span>
          </div>
          <div class="price-row">
            <span>Kinder</span>
            <span class="price">4,00 &euro;</span>
          </div>
        </div>

        <div class="info-card">
          <h3>Gut zu wissen</h3>
          <ul>
            <li>Veranstaltungen im Rittersaal moglich</li>
            <li>Kleine Gaststube im umgebauten Stall</li>
            <li>E-Bike Ladestation vorhanden</li>
          </ul>
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

.cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
}

.info-card {
  background: #fff;
  border-radius: 8px;
  padding: 2rem;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
}

h3 {
  font-size: 1.2rem;
  color: #2c1810;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid #d4a574;
}

.highlight {
  font-weight: 600;
  color: #8b4513;
  margin-bottom: 0.25rem;
}

.time {
  font-size: 1.3rem;
  font-weight: 700;
  color: #2c1810;
  margin: 0.5rem 0;
}

.note {
  font-size: 0.9rem;
  color: #666;
  font-style: italic;
  margin-top: 0.75rem;
}

.price-row {
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 0;
  border-bottom: 1px solid #f0e8de;
}

.price {
  font-weight: 700;
  color: #2c1810;
}

ul {
  list-style: none;
}

ul li {
  padding: 0.4rem 0;
  padding-left: 1.25rem;
  position: relative;
  color: #666;
}

ul li::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0.85rem;
  width: 6px;
  height: 6px;
  background: #d4a574;
  border-radius: 50%;
}
</style>
