<script setup lang="ts">
import { ref } from 'vue'

const form = ref({
  email: '',
  subject: '',
  message: '',
})

function handleSubmit() {
  const mailto = `mailto:museumshof-choerau@web.de?subject=${encodeURIComponent(form.value.subject)}&body=${encodeURIComponent(form.value.message + '\n\nVon: ' + form.value.email)}`
  window.location.href = mailto
}
</script>

<template>
  <section id="kontakt" class="site-section">
    <div class="container">
      <h2>Kontakt/Impressum:</h2>
      <div class="contact-grid">
        <div class="contact-info">
          <p>Museumshof Chörau e.V.<br />
          VR: 4631, Amtsgericht Stendal<br />
          USt.-ID: 116/143/08607</p>

          <p>Torsten Winger<br />
          Dorfstr. 6<br />
          OT Chörau<br />
          06386 Osternienburger Land<br />
          Tel.: <a href="tel:+4934909709905">034909-709905</a><br />
          Funk: <a href="tel:+491638264397">0163-8264397</a><br />
          E-Mail: <a href="mailto:museumshof-choerau@web.de">Museumshof-Choerau [at] web.de</a></p>
        </div>

        <form class="contact-form" @submit.prevent="handleSubmit">
          <h3>Kontaktformular</h3>
          <div class="form-group">
            <label for="email">Ihre E-Mail-Adresse: <span class="mandatory">*</span></label>
            <input id="email" v-model="form.email" type="email" required />
          </div>
          <div class="form-group">
            <label for="subject">Grund der Kontaktaufnahme <span class="mandatory">*</span></label>
            <input id="subject" v-model="form.subject" type="text" required />
          </div>
          <div class="form-group">
            <label for="message">Ihre Bemerkung: <span class="mandatory">*</span></label>
            <textarea id="message" v-model="form.message" rows="4" cols="40" required></textarea>
          </div>
          <button type="submit" class="submit-btn">Kontaktanfrage senden</button>
        </form>
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

.contact-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
}

.contact-info p {
  color: var(--body-text);
  line-height: 1.8;
  margin-bottom: 1rem;
}

.contact-info a {
  color: var(--contact-link);
  text-decoration: none;
}

.contact-info a:hover {
  text-decoration: underline;
}

h3 {
  font-size: 1.2rem;
  color: var(--form-label);
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid var(--form-heading-border);
}

.contact-form {
  background: var(--form-bg);
  border-radius: 8px;
  padding: 2rem;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
}

.form-group {
  margin-bottom: 1rem;
}

label {
  display: block;
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--form-label);
  margin-bottom: 0.25rem;
}

.mandatory {
  color: var(--form-required);
}

input,
textarea {
  width: 100%;
  padding: 0.6rem 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-family: inherit;
  font-size: 0.95rem;
  transition: border-color 0.2s;
}

input:focus,
textarea:focus {
  outline: none;
  border-color: var(--form-focus-border);
}

.submit-btn {
  background: var(--form-btn-bg);
  color: var(--form-btn-text);
  border: none;
  padding: 0.75rem 2rem;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
}

.submit-btn:hover {
  background: var(--form-btn-hover);
}

@media (max-width: 768px) {
  .contact-grid {
    grid-template-columns: 1fr;
  }
}
</style>
