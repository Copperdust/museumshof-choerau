<template>
  <section id="start" class="hero">
    <div class="hero-overlay">
      <div class="hero-content">
        <h1>Museumshof Chorau</h1>
        <p class="subtitle">Das Leben in den Jahren 1930 &ndash; 1989</p>
        <p class="description">
          Ein liebevoll restaurierter Dreiseitenhof in Sachsen-Anhalt, der das
          alltagliche Leben vergangener Jahrzehnte lebendig werden lasst.
        </p>
        <a href="#ausstellungen" class="cta">Ausstellungen entdecken</a>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero {
  min-height: 100vh;
  background: linear-gradient(135deg, #2c1810 0%, #5c3a28 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: #faf6f1;
}

.hero-overlay {
  padding: 2rem;
}

.hero-content {
  max-width: 700px;
}

h1 {
  font-size: 3rem;
  color: #faf6f1;
  margin-bottom: 0.5rem;
  letter-spacing: 0.02em;
}

.subtitle {
  font-size: 1.5rem;
  color: #d4a574;
  margin-bottom: 1.5rem;
  font-style: italic;
}

.description {
  font-size: 1.1rem;
  color: rgba(250, 246, 241, 0.85);
  margin-bottom: 2rem;
  line-height: 1.7;
}

.cta {
  display: inline-block;
  padding: 0.85rem 2rem;
  background: #d4a574;
  color: #2c1810;
  border-radius: 4px;
  font-weight: 600;
  text-decoration: none;
  transition: background 0.2s, transform 0.2s;
}

.cta:hover {
  background: #c49464;
  transform: translateY(-2px);
}

@media (max-width: 768px) {
  h1 {
    font-size: 2rem;
  }

  .subtitle {
    font-size: 1.15rem;
  }
}
</style>
