<script setup lang="ts">
const { setPageSEO, generatePersonSchema } = useSEO()

setPageSEO({
  title: 'Home',
  description: 'Patrick Cheruiyot - Full Stack Developer specializing in modern web technologies. Building exceptional digital experiences with Vue, Nuxt, React, and Node.js.',
  schema: generatePersonSchema(),
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
          <!-- Greeting -->
          <div class="animate-fade-in-down mb-6">
            <span class="inline-block rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
              👋 Welcome to my portfolio
            </span>
          </div>

          <!-- Main Heading -->
          <h1 class="animate-fade-in-up mb-6 text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
            Hi, I'm <span class="gradient-text">Patrick Cheruiyot</span>
          </h1>

          <!-- Subtitle -->
          <p class="animate-fade-in-up animation-delay-200 mb-8 text-xl text-muted-foreground sm:text-2xl">
            Full Stack Developer & Creative Technologist
          </p>

          <!-- Description -->
          <p class="animate-fade-in-up animation-delay-400 mx-auto mb-10 max-w-2xl text-lg text-muted-foreground">
            I craft exceptional digital experiences with modern web technologies.
            Passionate about clean code, elegant design, and building products that make a difference.
          </p>

          <!-- CTA Buttons -->
          <div class="animate-fade-in-up animation-delay-600 flex flex-wrap justify-center gap-4">
            <NuxtLink
              to="/portfolio"
              class="inline-flex items-center gap-2 rounded-lg bg-primary px-8 py-4 text-lg font-semibold text-primary-foreground shadow-lg transition-all hover:scale-105 hover:shadow-xl"
            >
              View My Work
              <Icon name="lucide:arrow-right" class="h-5 w-5" />
            </NuxtLink>
            
            <NuxtLink
              to="/contact"
              class="inline-flex items-center gap-2 rounded-lg border-2 border-border bg-background px-8 py-4 text-lg font-semibold transition-all hover:scale-105 hover:border-primary"
            >
              Get In Touch
              <Icon name="lucide:mail" class="h-5 w-5" />
            </NuxtLink>
          </div>

          <!-- Social Links -->
          <div class="animate-fade-in-up animation-delay-800 mt-12 flex justify-center gap-6">
            <a
              href="https://github.com/tricrck"
              target="_blank"
              rel="noopener noreferrer"
              class="text-muted-foreground transition-colors hover:text-primary"
              aria-label="GitHub"
            >
              <Icon name="lucide:github" class="h-6 w-6" />
            </a>
            <a
              href="https://linkedin.com/in/patrick-cheruiyot-359999188"
              target="_blank"
              rel="noopener noreferrer"
              class="text-muted-foreground transition-colors hover:text-primary"
              aria-label="LinkedIn"
            >
              <Icon name="lucide:linkedin" class="h-6 w-6" />
            </a>
            <a
              href="https://x.com/RiczNgetch"
              target="_blank"
              rel="noopener noreferrer"
              class="text-muted-foreground transition-colors hover:text-primary"
              aria-label="Twitter"
            >
              <Icon name="lucide:twitter" class="h-6 w-6" />
            </a>
          </div>
        </div>

        <!-- Scroll Indicator -->
        <div class="animate-fade-in animation-delay-1000 absolute bottom-8 left-1/2 -translate-x-1/2">
          <div class="flex flex-col items-center gap-2 text-muted-foreground">
            <span class="text-sm">Scroll to explore</span>
            <Icon name="lucide:chevron-down" class="h-6 w-6 animate-bounce" />
          </div>
        </div>
      </div>
    </section>

    <!-- Skills Section -->
    <SkillsSection />

    <!-- Featured Portfolio -->
    <section class="section bg-muted/30">
      <div class="container-custom">
        <div class="mb-12 text-center">
          <h2 class="mb-4 text-3xl font-bold sm:text-4xl">Featured Projects</h2>
          <p class="text-lg text-muted-foreground">
            Check out some of my recent work
          </p>
        </div>
        <PortfolioGrid :limit="6" />
        <div class="mt-12 text-center">
          <NuxtLink
            to="/portfolio"
            class="inline-flex items-center gap-2 text-lg font-semibold text-primary transition-colors hover:text-primary/80"
          >
            View All Projects
            <Icon name="lucide:arrow-right" class="h-5 w-5" />
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Experience Timeline -->
    <section class="section">
      <div class="container-custom">
        <div class="mb-12 text-center">
          <h2 class="mb-4 text-3xl font-bold sm:text-4xl">Experience</h2>
          <p class="text-lg text-muted-foreground">
            My professional journey
          </p>
        </div>
        <ExperienceTimeline />
      </div>
    </section>

    <!-- Testimonials -->
    <section class="section bg-muted/30">
      <div class="container-custom">
        <div class="mb-12 text-center">
          <h2 class="mb-4 text-3xl font-bold sm:text-4xl">Testimonials</h2>
          <p class="text-lg text-muted-foreground">
            What people say about working with me
          </p>
        </div>
        <TestimonialCarousel />
      </div>
    </section>

    <!-- Latest Blog Posts -->
    <section class="section">
      <div class="container-custom">
        <div class="mb-12 text-center">
          <h2 class="mb-4 text-3xl font-bold sm:text-4xl">Latest Articles</h2>
          <p class="text-lg text-muted-foreground">
            Thoughts on development, design, and technology
          </p>
        </div>
        <BlogGrid :limit="3" />
        <div class="mt-12 text-center">
          <NuxtLink
            to="/blog"
            class="inline-flex items-center gap-2 text-lg font-semibold text-primary transition-colors hover:text-primary/80"
          >
            Read More Articles
            <Icon name="lucide:arrow-right" class="h-5 w-5" />
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="section relative overflow-hidden bg-gradient-to-br from-primary via-purple-600 to-pink-600 text-white">
      <div class="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
      
      <div class="container-custom relative">
        <div class="mx-auto max-w-3xl text-center">
          <h2 class="mb-6 text-4xl font-bold sm:text-5xl">
            Let's Build Something Amazing Together
          </h2>
          <p class="mb-8 text-xl text-white/90">
            Have a project in mind? Let's discuss how we can work together to bring your ideas to life.
          </p>
          <NuxtLink
            to="/contact"
            class="inline-flex items-center gap-2 rounded-lg bg-white px-8 py-4 text-lg font-semibold text-primary shadow-xl transition-all hover:scale-105"
          >
            Start a Conversation
            <Icon name="lucide:send" class="h-5 w-5" />
          </NuxtLink>
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

.animation-delay-600 {
  animation-delay: 0.6s;
}

.animation-delay-800 {
  animation-delay: 0.8s;
}

.animation-delay-1000 {
  animation-delay: 1s;
}
</style>