<script setup lang="ts">
const { setPageSEO } = useSEO()

setPageSEO({
  title: 'About Patrick Cheruiyot - Full Stack Developer & Creative Technologist',
  description: 'Learn more about Patrick Cheruiyot, a passionate full-stack developer and creative technologist building meaningful digital experiences and innovative solutions.',
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
        <div class="mx-auto max-w-4xl">
          <!-- Breadcrumb -->
          <nav class="animate-fade-in-down mb-8">
            <NuxtLink 
              to="/" 
              class="inline-flex items-center gap-2 text-muted-foreground transition-colors hover:text-primary"
            >
              <Icon name="lucide:home" class="h-4 w-4" />
              Home
            </NuxtLink>
            <span class="mx-2 text-muted-foreground">/</span>
            <span class="text-primary">About</span>
          </nav>

          <!-- Main Heading -->
          <div class="text-center">
            <h1 class="animate-fade-in-up mb-6 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              About <span class="gradient-text">Patrick Cheruiyot</span>
            </h1>
            
            <p class="animate-fade-in-up animation-delay-200 mb-8 text-xl text-muted-foreground sm:text-2xl">
              Passionate Creator & Tech Innovator
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- About Content -->
    <section class="section">
      <div class="container-custom">
        <div class="mx-auto max-w-4xl">
          <div class="grid gap-12 lg:grid-cols-3">
            <!-- Profile Image & Quick Facts -->
            <div class="lg:col-span-1">
              <div class="sticky top-24">
                <!-- Profile Image -->
                <div class="mb-8 overflow-hidden rounded-2xl shadow-xl">
                  <img 
                    src="~/assets/tric.png" 
                    alt="Patrick Cheruiyot - Full Stack Developer"
                    class="w-full object-cover"
                    width="400"
                    height="400"
                  />
                </div>
                
                <!-- Quick Facts -->
                <div class="rounded-2xl bg-muted/30 p-6">
                  <h3 class="mb-4 text-lg font-semibold">Quick Facts</h3>
                  <ul class="space-y-3 text-sm">
                    <li class="flex items-center gap-3">
                      <Icon name="lucide:map-pin" class="h-4 w-4 text-primary" />
                      <span>Based in Kenya</span>
                    </li>
                    <li class="flex items-center gap-3">
                      <Icon name="lucide:briefcase" class="h-4 w-4 text-primary" />
                      <span>Full Stack Developer</span>
                    </li>
                    <li class="flex items-center gap-3">
                      <Icon name="lucide:heart" class="h-4 w-4 text-primary" />
                      <span>Open Source Contributor</span>
                    </li>
                    <li class="flex items-center gap-3">
                      <Icon name="lucide:coffee" class="h-4 w-4 text-primary" />
                      <span>Coffee Enthusiast</span>
                    </li>
                  </ul>
                  
                  <!-- Support Button -->
                  <div class="mt-6">
                    <a
                      href="https://buymeacoffee.com/tricrck"
                      target="_blank"
                      rel="noopener noreferrer"
                      class="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-amber-500 px-4 py-3 text-sm font-semibold text-white transition-all hover:scale-105 hover:bg-amber-600"
                    >
                      <Icon name="lucide:coffee" class="h-4 w-4" />
                      Buy Me a Coffee
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <!-- Main Content -->
            <div class="lg:col-span-2">
              <!-- Introduction -->
              <div class="mb-12">
                <h2 class="mb-6 text-3xl font-bold">My Story</h2>
                <div class="prose prose-lg max-w-none text-muted-foreground">
                  <p class="text-lg leading-relaxed">
                    Hey there! 👋 I'm <strong>Patrick Cheruiyot</strong>, a passionate creator and tech innovator 
                    driven by curiosity, purpose, and the love of building meaningful things from sleek digital 
                    experiences to intelligent systems that solve real-world problems.
                  </p>
                  
                  <p class="text-lg leading-relaxed">
                    Whether it's designing intuitive web apps, exploring AI-driven ideas, or crafting tools that 
                    empower communities, I pour my heart into every project I take on. My goal is to create work 
                    that not only inspires but makes a tangible difference.
                  </p>
                  
                  <p class="text-lg leading-relaxed">
                    Your support here helps me stay independent, experiment freely, and keep pushing creative 
                    boundaries one line of code, one design, and one late-night cup of coffee at a time. Every 
                    contribution fuels more open-source projects, tutorials, and innovation.
                  </p>
                  
                  <p class="text-lg leading-relaxed">
                    If you believe in creativity, technology, and impact thank you for being part of this journey. 
                    Let's build something extraordinary together. 🚀
                  </p>
                </div>
              </div>

              <!-- Values -->
              <div class="mb-12">
                <h2 class="mb-8 text-3xl font-bold">What Drives Me</h2>
                <div class="grid gap-6 sm:grid-cols-2">
                  <div class="rounded-2xl bg-muted/30 p-6">
                    <div class="mb-4 inline-flex items-center justify-center rounded-full bg-primary/10 p-3">
                      <Icon name="lucide:lightbulb" class="h-6 w-6 text-primary" />
                    </div>
                    <h3 class="mb-3 text-xl font-semibold">Innovation</h3>
                    <p class="text-muted-foreground">
                      Pushing boundaries with cutting-edge technologies and creative solutions that solve real problems.
                    </p>
                  </div>
                  
                  <div class="rounded-2xl bg-muted/30 p-6">
                    <div class="mb-4 inline-flex items-center justify-center rounded-full bg-primary/10 p-3">
                      <Icon name="lucide:heart" class="h-6 w-6 text-primary" />
                    </div>
                    <h3 class="mb-3 text-xl font-semibold">Impact</h3>
                    <p class="text-muted-foreground">
                      Creating work that matters and makes a tangible difference in people's lives and communities.
                    </p>
                  </div>
                  
                  <div class="rounded-2xl bg-muted/30 p-6">
                    <div class="mb-4 inline-flex items-center justify-center rounded-full bg-primary/10 p-3">
                      <Icon name="lucide:users" class="h-6 w-6 text-primary" />
                    </div>
                    <h3 class="mb-3 text-xl font-semibold">Community</h3>
                    <p class="text-muted-foreground">
                      Empowering others through open-source contributions, tutorials, and knowledge sharing.
                    </p>
                  </div>
                  
                  <div class="rounded-2xl bg-muted/30 p-6">
                    <div class="mb-4 inline-flex items-center justify-center rounded-full bg-primary/10 p-3">
                      <Icon name="lucide:sparkles" class="h-6 w-6 text-primary" />
                    </div>
                    <h3 class="mb-3 text-xl font-semibold">Excellence</h3>
                    <p class="text-muted-foreground">
                      Delivering high-quality, maintainable code and exceptional user experiences in every project.
                    </p>
                  </div>
                </div>
              </div>

              <!-- Support Section -->
              <div class="rounded-2xl bg-gradient-to-br from-primary/10 to-purple-500/10 p-8">
                <div class="text-center">
                  <Icon name="lucide:heart" class="mx-auto mb-4 h-12 w-12 text-primary" />
                  <h2 class="mb-4 text-2xl font-bold">Support My Work</h2>
                  <p class="mb-6 text-muted-foreground">
                    Your support enables me to continue creating open-source projects, 
                    sharing knowledge, and pushing the boundaries of what's possible.
                  </p>
                  <a
                    href="https://buymeacoffee.com/tricrck"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="inline-flex items-center gap-2 rounded-lg bg-amber-500 px-6 py-3 font-semibold text-white transition-all hover:scale-105 hover:bg-amber-600"
                  >
                    <Icon name="lucide:coffee" class="h-5 w-5" />
                    Buy Me a Coffee
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Skills Section -->
    <SkillsSection />

    <!-- CTA Section -->
    <section class="section relative overflow-hidden bg-gradient-to-br from-primary via-purple-600 to-pink-600 text-white">
      <div class="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
      
      <div class="container-custom relative">
        <div class="mx-auto max-w-3xl text-center">
          <h2 class="mb-6 text-4xl font-bold sm:text-5xl">
            Ready to Create Something Amazing?
          </h2>
          <p class="mb-8 text-xl text-white/90">
            Let's collaborate on your next project and bring your ideas to life with innovative technology.
          </p>
          <div class="flex flex-wrap justify-center gap-4">
            <NuxtLink
              to="/contact"
              class="inline-flex items-center gap-2 rounded-lg bg-white px-8 py-4 text-lg font-semibold text-primary shadow-xl transition-all hover:scale-105"
            >
              Get In Touch
              <Icon name="lucide:send" class="h-5 w-5" />
            </NuxtLink>
            <NuxtLink
              to="/portfolio"
              class="inline-flex items-center gap-2 rounded-lg border-2 border-white bg-transparent px-8 py-4 text-lg font-semibold text-white transition-all hover:scale-105 hover:bg-white/10"
            >
              View My Work
              <Icon name="lucide:arrow-right" class="h-5 w-5" />
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

.prose {
  color: inherit;
}

.prose p {
  margin-bottom: 1.5em;
}

.prose strong {
  color: hsl(var(--primary));
}
</style>