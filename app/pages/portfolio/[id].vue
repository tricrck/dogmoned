<script setup lang="ts">
const route = useRoute() as ReturnType<typeof useRoute> & { params: { id: string } }
const { setPageSEO } = useSEO()

const { portfolio } = useApi()
const id = route.params.id

const { data: portfolioItem, pending, error } = await useAsyncData(
  `portfolio-${id}`,
  () => portfolio.getById(id)
)

// Set dynamic SEO based on portfolio item
if (portfolioItem.value) {
  setPageSEO({
    title: `${portfolioItem.value.title} - Patrick Cheruiyot Portfolio`,
    description: portfolioItem.value.description,
  })
} else {
  setPageSEO({
    title: 'Project Not Found - Patrick Cheruiyot',
    description: 'The requested portfolio project could not be found.',
  })
}

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

// Share functionality
const shareProject = () => {
  if (navigator.share) {
    navigator.share({
      title: portfolioItem.value?.title,
      text: portfolioItem.value?.description,
      url: window.location.href,
    })
  } else {
    // Fallback: copy to clipboard
    navigator.clipboard.writeText(window.location.href)
    // Show success message (you might want to use a toast library)
    alert('Project link copied to clipboard!')
  }
}
</script>

<template>
  <div class="min-h-screen">
    <!-- Loading State -->
    <div v-if="pending" class="section">
      <div class="container-custom">
        <div class="animate-pulse">
          <div class="mb-8 h-12 w-3/4 rounded bg-muted"></div>
          <div class="aspect-video rounded-lg bg-muted"></div>
          <div class="mt-8 grid gap-8 lg:grid-cols-3">
            <div class="lg:col-span-2 space-y-4">
              <div class="h-6 rounded bg-muted"></div>
              <div class="h-6 rounded bg-muted"></div>
              <div class="h-6 w-2/3 rounded bg-muted"></div>
            </div>
            <div class="space-y-4">
              <div class="h-32 rounded-lg bg-muted"></div>
              <div class="h-32 rounded-lg bg-muted"></div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="section">
      <div class="container-custom">
        <div class="mx-auto max-w-2xl text-center">
          <Icon name="lucide:alert-circle" class="mx-auto h-16 w-16 text-destructive" />
          <h1 class="mt-6 text-3xl font-bold">Project Not Found</h1>
          <p class="mt-4 text-muted-foreground">
            The portfolio project you're looking for doesn't exist or has been moved.
          </p>
          <NuxtLink
            to="/portfolio"
            class="mt-8 inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 font-semibold text-primary-foreground transition-all hover:scale-105"
          >
            <Icon name="lucide:arrow-left" class="h-5 w-5" />
            Back to Portfolio
          </NuxtLink>
        </div>
      </div>
    </div>

    <!-- Portfolio Detail -->
    <div v-else-if="portfolioItem" class="min-h-screen">
      <!-- Hero Section -->
      <section class="section relative overflow-hidden">
        <!-- Animated background -->
        <div class="absolute inset-0 -z-10">
          <div class="absolute inset-0 bg-gradient-to-br from-primary/10 via-purple-500/5 to-pink-500/10 dark:from-primary/20 dark:via-purple-500/10 dark:to-pink-500/20" />
          <div class="absolute inset-0 bg-[url('~/assets/grid.svg')] opacity-10" />
        </div>

        <div class="container-custom">
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
            <NuxtLink 
              to="/portfolio" 
              class="inline-flex items-center gap-2 text-muted-foreground transition-colors hover:text-primary"
            >
              Portfolio
            </NuxtLink>
            <span class="mx-2 text-muted-foreground">/</span>
            <span class="text-primary">{{ portfolioItem.title }}</span>
          </nav>

          <div class="grid gap-12 lg:grid-cols-3">
            <!-- Main Content -->
            <div class="lg:col-span-2">
              <!-- Title & Role -->
              <div class="animate-fade-in-up mb-6">
                <h1 class="mb-4 text-4xl font-bold tracking-tight sm:text-5xl">
                  {{ portfolioItem.title }}
                </h1>
                <p class="text-xl font-semibold text-primary">
                  {{ portfolioItem.role }}
                </p>
              </div>

              <!-- Project Image -->
              <div class="animate-fade-in-up animation-delay-200 mb-8 overflow-hidden rounded-2xl shadow-2xl">
                <NuxtImg
                  v-if="portfolioItem.image"
                  :src="portfolioItem.image"
                  :alt="portfolioItem.title"
                  class="w-full object-cover"
                  loading="eager"
                  format="webp"
                />
                <div v-else class="flex aspect-video items-center justify-center bg-muted">
                  <Icon name="lucide:image" class="h-20 w-20 text-muted-foreground" />
                </div>
              </div>

              <!-- Description -->
              <div class="animate-fade-in-up animation-delay-400 prose prose-lg max-w-none">
                <p class="text-lg leading-relaxed text-muted-foreground">
                  {{ portfolioItem.description }}
                </p>
                
                <!-- Extended content would go here -->
                <div class="mt-8 rounded-2xl bg-muted/30 p-6">
                  <h3 class="mb-4 text-xl font-semibold">Project Overview</h3>
                  <p class="text-muted-foreground">
                    This project showcases innovative solutions and modern development practices. 
                    Built with a focus on performance, accessibility, and user experience.
                  </p>
                </div>
              </div>
            </div>

            <!-- Sidebar -->
            <div class="animate-fade-in-up animation-delay-600">
              <div class="sticky top-24 space-y-6">
                <!-- Project Details -->
                <div class="rounded-2xl bg-muted/30 p-6">
                  <h3 class="mb-4 text-lg font-semibold">Project Details</h3>
                  
                  <!-- Technologies -->
                  <div class="mb-6">
                    <h4 class="mb-3 font-medium text-muted-foreground">Technologies Used</h4>
                    <div class="flex flex-wrap gap-2">
                      <span
                        v-for="tech in portfolioItem.technologies"
                        :key="tech"
                        class="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary"
                      >
                        {{ tech }}
                      </span>
                    </div>
                  </div>

                  <!-- Skills -->
                  <div class="mb-6">
                    <h4 class="mb-3 font-medium text-muted-foreground">Key Skills</h4>
                    <div class="flex flex-wrap gap-2">
                      <span
                        v-for="skill in portfolioItem.skills"
                        :key="skill"
                        class="rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground"
                      >
                        {{ skill }}
                      </span>
                    </div>
                  </div>

                  <!-- Project Link -->
                  <div v-if="portfolioItem.link" class="mb-6">
                    <h4 class="mb-3 font-medium text-muted-foreground">Live Project</h4>
                    <a
                      :href="portfolioItem.link"
                      target="_blank"
                      rel="noopener noreferrer"
                      class="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground transition-all hover:scale-105"
                    >
                      <Icon name="lucide:external-link" class="h-4 w-4" />
                      Visit Live Site
                    </a>
                  </div>

                  <!-- Share Button -->
                  <div>
                    <button
                      @click="shareProject"
                      class="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-border bg-background px-4 py-3 text-sm font-semibold transition-all hover:scale-105 hover:border-primary"
                    >
                      <Icon name="lucide:share-2" class="h-4 w-4" />
                      Share Project
                    </button>
                  </div>
                </div>

                <!-- Support Section -->
                <div class="rounded-2xl bg-gradient-to-br from-amber-500/10 to-orange-500/10 p-6">
                  <h3 class="mb-3 font-semibold">Like This Project?</h3>
                  <p class="mb-4 text-sm text-muted-foreground">
                    Support my work and help me create more amazing projects.
                  </p>
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
        </div>
      </section>

      <!-- Navigation -->
      <section class="section border-t border-border">
        <div class="container-custom">
          <div class="flex justify-between">
            <NuxtLink
              to="/portfolio"
              class="inline-flex items-center gap-2 rounded-lg border border-border bg-background px-6 py-3 font-semibold transition-all hover:scale-105 hover:border-primary"
            >
              <Icon name="lucide:arrow-left" class="h-5 w-5" />
              Back to Portfolio
            </NuxtLink>
            
            <NuxtLink
              to="/contact"
              class="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 font-semibold text-primary-foreground transition-all hover:scale-105"
            >
              Start Your Project
              <Icon name="lucide:arrow-right" class="h-5 w-5" />
            </NuxtLink>
          </div>
        </div>
      </section>
    </div>
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

.prose {
  color: inherit;
}
</style>