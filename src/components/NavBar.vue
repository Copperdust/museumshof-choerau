<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const props = defineProps<{
  logo?: string
}>()

const isOpen = ref(false)
const scrolled = ref(false)

const links = [
  { href: '#start', label: 'Start' },
  { href: '#ausstellungen', label: 'Unsere Ausstellungsbereiche' },
  { href: '#galerie', label: 'Galerie' },
  { href: '#oeffnungszeiten', label: 'Öffnungszeiten' },
  { href: '#anfahrt', label: 'Anfahrt' },
  { href: '#kontakt', label: 'Kontakt/Impressum' },
]

function onScroll() {
  scrolled.value = window.scrollY > 50
}

function closeMenu() {
  isOpen.value = false
}

onMounted(() => {
  window.addEventListener('scroll', onScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
})
</script>

<template>
  <nav :class="['navbar', { scrolled }]">
    <div class="nav-container">
      <a href="#start" class="logo">
        <img :src="props.logo || '/images/brand.jpg'" alt="Museumshof Chörau" class="logo-img" />
      </a>
      <button class="hamburger" :class="{ active: isOpen }" @click="isOpen = !isOpen" aria-label="Menü">
        <span></span>
        <span></span>
        <span></span>
      </button>
      <ul :class="['nav-links', { open: isOpen }]">
        <li v-for="link in links" :key="link.href">
          <a :href="link.href" @click="closeMenu">{{ link.label }}</a>
        </li>
      </ul>
    </div>
  </nav>
</template>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: var(--nav-bg);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.15);
}

.nav-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 64px;
}

.logo {
  display: flex;
  align-items: center;
}

.logo-img {
  height: 40px;
  width: auto;
}

.nav-links {
  display: flex;
  list-style: none;
  gap: 1.5rem;
}

.nav-links a {
  color: var(--nav-link);
  text-decoration: none;
  font-size: 0.95rem;
  transition: color 0.2s;
}

.nav-links a:hover {
  color: var(--nav-link-hover);
}

.hamburger {
  display: none;
  flex-direction: column;
  gap: 5px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
}

.hamburger span {
  display: block;
  width: 24px;
  height: 2px;
  background: var(--nav-hamburger);
  transition: transform 0.3s, opacity 0.3s;
}

.hamburger.active span:nth-child(1) {
  transform: rotate(45deg) translate(5px, 5px);
}

.hamburger.active span:nth-child(2) {
  opacity: 0;
}

.hamburger.active span:nth-child(3) {
  transform: rotate(-45deg) translate(5px, -5px);
}

@media (max-width: 768px) {
  .hamburger {
    display: flex;
  }

  .nav-links {
    position: fixed;
    top: 64px;
    left: 0;
    right: 0;
    background: var(--nav-bg-mobile);
    flex-direction: column;
    padding: 1rem 1.5rem;
    gap: 0;
    transform: translateY(-100%);
    opacity: 0;
    transition: transform 0.3s, opacity 0.3s;
    pointer-events: none;
  }

  .nav-links.open {
    transform: translateY(0);
    opacity: 1;
    pointer-events: auto;
  }

  .nav-links li {
    padding: 0.75rem 0;
    border-bottom: 1px solid var(--nav-border-mobile);
  }
}
</style>
