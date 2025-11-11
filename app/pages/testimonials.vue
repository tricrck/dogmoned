<script setup lang="ts">
const { setPageSEO } = useSEO()

setPageSEO({
  title: 'Testimonials - What Clients Say | Patrick Cheruiyot',
  description: 'Read testimonials and feedback from clients and collaborators who have worked with Patrick Cheruiyot.',
})
</script>

<template>
  <div class="min-h-screen">
    <!-- Hero Section -->
    <section class="section relative overflow-hidden">
      <div class="absolute inset-0 -z-10">
        <div class="absolute inset-0 bg-gradient-to-br from-primary/10 via-purple-500/5 to-pink-500/10" />
      </div>

      <div class="container-custom">
        <div class="mx-auto max-w-4xl text-center">
          <nav class="mb-8">
            <NuxtLink 
              to="/" 
              class="inline-flex items-center gap-2 text-muted-foreground transition-colors hover:text-primary"
            >
              <Icon name="lucide:home" class="h-4 w-4" />
              Home
            </NuxtLink>
            <span class="mx-2 text-muted-foreground">/</span>
            <span class="text-primary">Testimonials</span>
          </nav>

          <h1 class="mb-6 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            Client <span class="gradient-text">Testimonials</span>
          </h1>
          
          <p class="mb-8 text-xl text-muted-foreground">
            What people say about working with me
          </p>
        </div>
      </div>
    </section>

    <!-- Testimonials Carousel -->
    <section class="section">
      <div class="container-custom">
        <TestimonialCarousel />
      </div>
    </section>
  </div>
</template>