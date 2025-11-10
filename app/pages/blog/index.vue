<script setup lang="ts">
const { setPageSEO } = useSEO()

setPageSEO({
  title: 'Blog - Patrick Cheruiyot | Web Development, Design & Technology Insights',
  description: 'Explore articles on web development, design, technology trends, and creative coding. Learn from Patrick Cheruiyot\'s experiences and insights in modern web technologies.',
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
            <span class="text-primary">Blog</span>
          </nav>

          <!-- Main Heading -->
          <h1 class="animate-fade-in-up mb-6 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            My <span class="gradient-text">Blog</span>
          </h1>

          <!-- Subtitle -->
          <p class="animate-fade-in-up animation-delay-200 mb-8 text-xl text-muted-foreground sm:text-2xl">
            Thoughts on development, design, and technology
          </p>

          <!-- Description -->
          <p class="animate-fade-in-up animation-delay-400 mx-auto max-w-2xl text-lg text-muted-foreground">
            Sharing insights, tutorials, and experiences from my journey in web development, 
            creative coding, and building digital products that make an impact.
          </p>
        </div>
      </div>
    </section>

    <!-- Blog Posts Section -->
    <section class="section">
      <div class="container-custom">
        <!-- Featured Post (Optional) -->
        <div class="mb-16">
          <h2 class="mb-8 text-3xl font-bold">Latest Articles</h2>
          <BlogGrid />
        </div>

        <!-- Categories/Filter Section -->
        <div class="mb-12 rounded-2xl bg-muted/30 p-8">
          <h3 class="mb-6 text-2xl font-bold">Browse by Category</h3>
          <div class="flex flex-wrap gap-3">
            <button class="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-all hover:scale-105">
              All Posts
            </button>
            <button class="rounded-full bg-muted px-6 py-3 text-sm font-semibold text-muted-foreground transition-all hover:scale-105 hover:bg-primary hover:text-primary-foreground">
              Web Development
            </button>
            <button class="rounded-full bg-muted px-6 py-3 text-sm font-semibold text-muted-foreground transition-all hover:scale-105 hover:bg-primary hover:text-primary-foreground">
              Design
            </button>
            <button class="rounded-full bg-muted px-6 py-3 text-sm font-semibold text-muted-foreground transition-all hover:scale-105 hover:bg-primary hover:text-primary-foreground">
              Technology
            </button>
            <button class="rounded-full bg-muted px-6 py-3 text-sm font-semibold text-muted-foreground transition-all hover:scale-105 hover:bg-primary hover:text-primary-foreground">
              Tutorials
            </button>
            <button class="rounded-full bg-muted px-6 py-3 text-sm font-semibold text-muted-foreground transition-all hover:scale-105 hover:bg-primary hover:text-primary-foreground">
              Career
            </button>
          </div>
        </div>

        <!-- Newsletter Signup -->
        <div class="mb-16 rounded-2xl bg-gradient-to-br from-primary/10 to-purple-500/10 p-8 text-center">
          <Icon name="lucide:mail" class="mx-auto mb-4 h-12 w-12 text-primary" />
          <h3 class="mb-4 text-2xl font-bold">Stay Updated</h3>
          <p class="mb-6 text-muted-foreground">
            Get the latest articles and insights delivered directly to your inbox.
          </p>
          <div class="mx-auto flex max-w-md gap-4">
            <input 
              type="email" 
              placeholder="Enter your email"
              class="flex-1 rounded-lg border border-border bg-background px-4 py-3 transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            >
            <button class="rounded-lg bg-primary px-6 py-3 font-semibold text-primary-foreground transition-all hover:scale-105">
              Subscribe
            </button>
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
            Enjoying the Content?
          </h2>
          <p class="mb-8 text-xl text-white/90">
            Support my work and help me create more valuable content for the community.
          </p>
          <div class="flex flex-wrap justify-center gap-4">
            <a
              href="https://buymeacoffee.com/tricrck"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center gap-2 rounded-lg bg-white px-8 py-4 text-lg font-semibold text-primary shadow-xl transition-all hover:scale-105"
            >
              <Icon name="lucide:coffee" class="h-5 w-5" />
              Buy Me a Coffee
            </a>
            <NuxtLink
              to="/contact"
              class="inline-flex items-center gap-2 rounded-lg border-2 border-white bg-transparent px-8 py-4 text-lg font-semibold text-white transition-all hover:scale-105 hover:bg-white/10"
            >
              Get In Touch
              <Icon name="lucide:send" class="h-5 w-5" />
            </NuxtLink>
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