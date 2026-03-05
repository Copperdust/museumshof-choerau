<template>
  <footer class="footer">
    <div class="container">
      <p>&copy; {{ new Date().getFullYear() }} Museumshof Chorau e.V. &mdash; Alle Rechte vorbehalten.</p>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  background: #2c1810;
  color: rgba(250, 246, 241, 0.7);
  text-align: center;
  padding: 1.5rem;
  font-size: 0.85rem;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}
</style>
