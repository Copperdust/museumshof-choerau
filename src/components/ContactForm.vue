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
</template>

<style scoped>
h3 {
  font-size: var(--font-h3);
  color: var(--form-label);
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid var(--form-heading-border);
}

.contact-form {
}

.form-group {
  margin-bottom: 1rem;
}

label {
  display: block;
  font-size: var(--font-label);
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
  font-size: var(--font-body);
  transition: border-color 0.2s;
}

input:focus,
textarea:focus {
  outline: none;
  border-color: var(--form-focus-border);
}

.submit-btn {
  float: right;
  background: var(--form-btn-bg);
  color: var(--form-btn-text);
  border: none;
  padding: 0.75rem 2rem;
  border-radius: 4px;
  font-size: var(--font-btn);
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
}

.submit-btn:hover {
  background: var(--form-btn-hover);
}
</style>
