<script setup lang="ts">
import { ref } from 'vue'

const form = ref({
  email: '',
  subject: '',
  message: '',
})

const submitted = ref(false)

function handleSubmit() {
  // Build a mailto link as a simple no-backend solution
  const mailto = `mailto:museumshof-choerau@web.de?subject=${encodeURIComponent(form.value.subject)}&body=${encodeURIComponent(form.value.message + '\n\nVon: ' + form.value.email)}`
  window.location.href = mailto
  submitted.value = true
}
</script>

<template>
  <section id="kontakt">
    <div class="container">
      <h2>Kontakt</h2>
      <div class="contact-grid">
        <div class="contact-info">
          <h3>Museumshof Chorau e.V.</h3>
          <dl>
            <dt>Vorsitzender</dt>
            <dd>David Kuhn</dd>
            <dt>Adresse</dt>
            <dd>Dorfstr. 6, OT Chorau<br />06386 Osternienburger Land</dd>
            <dt>Telefon</dt>
            <dd><a href="tel:+4934909709905">034909-709905</a></dd>
            <dt>Mobil</dt>
            <dd><a href="tel:+491638264397">0163-8264397</a></dd>
            <dt>E-Mail</dt>
            <dd><a href="mailto:museumshof-choerau@web.de">museumshof-choerau@web.de</a></dd>
          </dl>

          <div class="legal">
            <p>Vereinsregister: VR 4631, Amtsgericht Stendal</p>
            <p>Steuer-Nr.: 116/143/08607</p>
          </div>
        </div>

        <form class="contact-form" @submit.prevent="handleSubmit">
          <h3>Nachricht senden</h3>
          <div class="form-group">
            <label for="email">E-Mail-Adresse</label>
            <input id="email" v-model="form.email" type="email" required />
          </div>
          <div class="form-group">
            <label for="subject">Betreff</label>
            <input id="subject" v-model="form.subject" type="text" required />
          </div>
          <div class="form-group">
            <label for="message">Nachricht</label>
            <textarea id="message" v-model="form.message" rows="5" required></textarea>
          </div>
          <button type="submit" class="submit-btn">Absenden</button>
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

h3 {
  font-size: 1.2rem;
  color: #2c1810;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid #d4a574;
}

dl {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 0.5rem 1rem;
}

dt {
  font-weight: 600;
  color: #2c1810;
}

dd {
  color: #666;
}

dd a {
  color: #8b4513;
  text-decoration: none;
}

dd a:hover {
  text-decoration: underline;
}

.legal {
  margin-top: 1.5rem;
  padding-top: 1rem;
  border-top: 1px solid #e8ddd0;
}

.legal p {
  font-size: 0.85rem;
  color: #999;
}

.contact-form {
  background: #fff;
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
  color: #2c1810;
  margin-bottom: 0.25rem;
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
  border-color: #8b4513;
}

.submit-btn {
  background: #2c1810;
  color: #faf6f1;
  border: none;
  padding: 0.75rem 2rem;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
}

.submit-btn:hover {
  background: #8b4513;
}

@media (max-width: 768px) {
  .contact-grid {
    grid-template-columns: 1fr;
  }
}
</style>
