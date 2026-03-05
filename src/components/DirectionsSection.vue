<template>
  <section id="anfahrt">
    <div class="container">
      <h2>So erreichen Sie uns!</h2>
      <div class="directions-content">
        <div class="address-card">
          <h3>Adresse</h3>
          <address>
            Museumshof Chorau e.V.<br />
            Dorfstr. 6, OT Chorau<br />
            06386 Osternienburger Land
          </address>
        </div>
        <div class="map-wrapper">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2462.5!2d12.1142198!3d51.8154579!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47a66d0000000001%3A0x1!2sMuseumshof+Ch%C3%B6rau!5e0!3m2!1sde!2sde!4v1"
            width="100%"
            height="400"
            style="border:0"
            allowfullscreen
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
            title="Standort Museumshof Chorau auf Google Maps"
          ></iframe>
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

.directions-content {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 2rem;
  align-items: start;
}

.address-card {
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

address {
  font-style: normal;
  line-height: 1.8;
  color: #666;
}

.map-wrapper {
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
}

.map-wrapper iframe {
  display: block;
}

@media (max-width: 768px) {
  .directions-content {
    grid-template-columns: 1fr;
  }
}
</style>
