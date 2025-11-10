<script setup lang="ts">
const { setPageSEO } = useSEO()

setPageSEO({
  title: 'Portfolio - Patrick Cheruiyot | Full Stack Developer Projects & Case Studies',
  description: 'Explore Patrick Cheruiyot\'s portfolio of web development projects, including full-stack applications, creative coding experiments, and real-world solutions.',
})

// Intersection observer for animations
const { stop } = useIntersectionObserver(
  ref(null),
  (entries) => {
    const entry = entries[0]
    if (entry?.isIntersecting) {
      // Trigger animations
      stop()
    }
  }
)

onUnmounted(() => stop())
</script>

<template>
  <div class="min-h-screen">
    <!-- Hero Section -->
    <section class="section relative overflow-hidden">
      <!-- Animated background -->
      <div class="absolute inset-0 -z-10">
        <div class="absolute inset-0 bg-gradient-to-br from-primary/10 via-purple-500/5 to-pink-500/10 dark:from-primary/20 dark:via-purple-500/10 dark:to-pink-500/20" />
        <div class="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
      </div>

      <div class="container-custom">
        <div class="mx-auto max-w-4xl text-center">
          <!-- Breadcrumb -->
          <nav class="animate-fade-in-down mb-8 flex justify-center">
            <NuxtLink 
              to="/" 
              class="inline-flex items-center gap-2 text-muted-foreground transition-colors hover:text-primary"
            >
              <Icon name="lucide:home" class="h-4 w-4" />
              Home
            </NuxtLink>
            <span class="mx-2 text-muted-foreground">/</span>
            <span class="text-primary">Portfolio</span>
          </nav>

          <!-- Main Heading -->
          <h1 class="animate-fade-in-up mb-6 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            My <span class="gradient-text">Portfolio</span>
          </h1>

          <!-- Subtitle -->
          <p class="animate-fade-in-up animation-delay-200 mb-8 text-xl text-muted-foreground sm:text-2xl">
            Projects that showcase my skills and passion
          </p>

          <!-- Description -->
          <p class="animate-fade-in-up animation-delay-400 mx-auto max-w-2xl text-lg text-muted-foreground">
            A collection of web applications, creative experiments, and real-world solutions 
            built with modern technologies and a focus on user experience.
          </p>
        </div>
      </div>
    </section>

    <!-- Portfolio Grid Section -->
    <section class="section">
      <div class="container-custom">
        <!-- Filter Section -->
        <div class="mb-12">
          <h2 class="mb-8 text-3xl font-bold">All Projects</h2>
          
          <!-- Technology Filter -->
          <div class="mb-8 rounded-2xl bg-muted/30 p-6">
            <h3 class="mb-4 text-lg font-semibold">Filter by Technology</h3>
            <div class="flex flex-wrap gap-3">
              <button class="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-all hover:scale-105">
                All Projects
              </button>
              <button class="rounded-full bg-muted px-6 py-3 text-sm font-semibold text-muted-foreground transition-all hover:scale-105 hover:bg-primary hover:text-primary-foreground">
                Vue.js
              </button>
              <button class="rounded-full bg-muted px-6 py-3 text-sm font-semibold text-muted-foreground transition-all hover:scale-105 hover:bg-primary hover:text-primary-foreground">
                React
              </button>
              <button class="rounded-full bg-muted px-6 py-3 text-sm font-semibold text-muted-foreground transition-all hover:scale-105 hover:bg-primary hover:text-primary-foreground">
                Node.js
              </button>
              <button class="rounded-full bg-muted px-6 py-3 text-sm font-semibold text-muted-foreground transition-all hover:scale-105 hover:bg-primary hover:text-primary-foreground">
                TypeScript
              </button>
              <button class="rounded-full bg-muted px-6 py-3 text-sm font-semibold text-muted-foreground transition-all hover:scale-105 hover:bg-primary hover:text-primary-foreground">
                Nuxt
              </button>
            </div>
          </div>
        </div>

        <!-- Portfolio Grid -->
        <PortfolioGrid />

        <!-- Stats Section -->
        <div class="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div class="rounded-2xl bg-muted/30 p-6 text-center">
            <div class="mb-3 text-3xl font-bold text-primary">50+</div>
            <div class="text-sm text-muted-foreground">Projects Completed</div>
          </div>
          <div class="rounded-2xl bg-muted/30 p-6 text-center">
            <div class="mb-3 text-3xl font-bold text-primary">5+</div>
            <div class="text-sm text-muted-foreground">Years Experience</div>
          </div>
          <div class="rounded-2xl bg-muted/30 p-6 text-center">
            <div class="mb-3 text-3xl font-bold text-primary">30+</div>
            <div class="text-sm text-muted-foreground">Happy Clients</div>
          </div>
          <div class="rounded-2xl bg-muted/30 p-6 text-center">
            <div class="mb-3 text-3xl font-bold text-primary">15+</div>
            <div class="text-sm text-muted-foreground">Technologies</div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="section relative overflow-hidden bg-gradient-to-br from-primary via-purple-600 to-pink-600 text-white">
      <div class="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
      
      <div class="container-custom relative">
        <div class="mx-auto max-w-3xl text-center">
          <h2 class="mb-6 text-4xl font-bold sm:text-5xl">
            Ready to Start Your Project?
          </h2>
          <p class="mb-8 text-xl text-white/90">
            Let's collaborate to bring your ideas to life with innovative technology and exceptional design.
          </p>
          <div class="flex flex-wrap justify-center gap-4">
            <NuxtLink
              to="/contact"
              class="inline-flex items-center gap-2 rounded-lg bg-white px-8 py-4 text-lg font-semibold text-primary shadow-xl transition-all hover:scale-105"
            >
              Start a Project
              <Icon name="lucide:send" class="h-5 w-5" />
            </NuxtLink>
            <a
              href="https://buymeacoffee.com/tricrck"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center gap-2 rounded-lg border-2 border-white bg-transparent px-8 py-4 text-lg font-semibold text-white transition-all hover:scale-105 hover:bg-white/10"
            >
              <Icon name="lucide:coffee" class="h-5 w-5" />
              Support My Work
            </a>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.animation-delay-200 {
  animation-delay: 0.2s;
}

.animation-delay-400 {
  animation-delay: 0.4s;
}
</style>