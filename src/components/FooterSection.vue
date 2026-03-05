<template>
  <footer class="footer">
    <div class="container">
      <p>&copy; {{ new Date().getFullYear() }} Museumshof Chorau e.V. &mdash; Alle Rechte vorbehalten.</p>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  background: var(--footer-bg);
  color: var(--footer-text);
  text-align: center;
  padding: 1.5rem;
  font-size: 0.85rem;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}
</style>
