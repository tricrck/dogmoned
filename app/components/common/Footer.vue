<script setup lang="ts">
const currentYear = new Date().getFullYear()

const navigation = {
  main: [
    { name: 'About', href: '/about' },
    { name: 'Portfolio', href: '/portfolio' },
    { name: 'Blog', href: '/blog' },
    { name: 'Testimonials', href: '/testimonials' },
    { name: 'Contact', href: '/contact' },
  ],
  social: [
    {
      name: 'GitHub',
      href: 'https://github.com/tricrck',
      icon: 'lucide:github',
    },
    {
      name: 'LinkedIn',
      href: 'https://linkedin.com/in/patrick-cheruiyot-359999188',
      icon: 'lucide:linkedin',
    },
    {
      name: 'X',
      href: 'https://x.com/RiczNgetch',
      icon: 'lucide:twitter',
    },
    {
      name: 'Email',
      href: 'mailto:tricrck@gmail.com',
      icon: 'lucide:mail',
    },
  ],
}
</script>

<template>
  <footer class="border-t border-border bg-card">
    <div class="container-custom py-12 md:py-16">
      <!-- Top Section -->
      <div class="grid gap-8 lg:grid-cols-3">
        <!-- Brand -->
        <div>
          <div class="mb-4 flex items-center gap-2">
            <div class="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-purple-600 text-white shadow-lg">
              PC
            </div>
            <span class="text-xl font-bold">Patrick Cheruiyot</span>
          </div>
          <p class="mb-6 text-sm text-muted-foreground">
            Full Stack Developer crafting exceptional digital experiences with modern web technologies.
          </p>
          <div class="flex gap-4">
            <a
              v-for="social in navigation.social"
              :key="social.name"
              :href="social.href"
              target="_blank"
              rel="noopener noreferrer"
              class="flex h-10 w-10 items-center justify-center rounded-lg border border-border transition-all hover:border-primary hover:bg-primary/10 hover:scale-110"
              :aria-label="social.name"
            >
              <Icon :name="social.icon" class="h-5 w-5" />
            </a>
          </div>
        </div>

        <!-- Quick Links -->
        <div>
          <h3 class="mb-4 text-lg font-semibold">Quick Links</h3>
          <ul class="space-y-3">
            <li v-for="item in navigation.main" :key="item.name">
              <NuxtLink
                :to="item.href"
                class="text-sm text-muted-foreground transition-colors hover:text-primary"
              >
                {{ item.name }}
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Newsletter -->
        <div>
          <h3 class="mb-4 text-lg font-semibold">Stay Updated</h3>
          <p class="mb-4 text-sm text-muted-foreground">
            Subscribe to get the latest articles and updates.
          </p>
          <form class="flex gap-2" @submit.prevent>
            <input
              type="email"
              placeholder="Your email"
              class="flex-1 rounded-lg border border-border bg-background px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              required
            >
            <button
              type="submit"
              class="rounded-lg bg-primary px-6 py-2 text-sm font-semibold text-primary-foreground transition-all hover:scale-105 hover:shadow-lg"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      <!-- Divider -->
      <div class="my-8 border-t border-border" />

      <!-- Bottom Section -->
      <div class="flex flex-col items-center justify-between gap-4 text-sm text-muted-foreground md:flex-row">
        <p>
          © {{ currentYear }} Patrick Cheruiyot. All rights reserved.
        </p>
        <div class="flex gap-6">
          <NuxtLink to="/privacy" class="transition-colors hover:text-primary">
            Privacy Policy
          </NuxtLink>
          <NuxtLink to="/terms" class="transition-colors hover:text-primary">
            Terms of Service
          </NuxtLink>
        </div>
      </div>
    </div>

    <!-- Back to Top Button -->
    <ScrollToTop />
  </footer>
</template>