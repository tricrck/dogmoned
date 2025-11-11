<script setup lang="ts">
const { setPageSEO } = useSEO()

setPageSEO({
  title: 'Contact Patrick Cheruiyot - Get In Touch for Projects & Collaborations',
  description: 'Ready to start your next project? Get in touch with Patrick Cheruiyot for web development, consulting, or collaboration opportunities.',
})

// Form state
const name = ref('')
const email = ref('')
const subject = ref('')
const message = ref('')
const isSubmitting = ref(false)
const isSubmitted = ref(false)

const handleSubmit = async () => {
  if (isSubmitting.value) return
  
  isSubmitting.value = true
  
  // Simulate form submission
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  isSubmitted.value = true
  isSubmitting.value = false
  
  // Reset form
  name.value = ''
  email.value = ''
  subject.value = ''
  message.value = ''
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
</script>

<template>
  <div class="min-h-screen">
    <!-- Hero Section -->
    <section class="section relative overflow-hidden">
      <!-- Animated background -->
      <div class="absolute inset-0 -z-10">
        <div class="absolute inset-0 bg-gradient-to-br from-primary/10 via-purple-500/5 to-pink-500/10 dark:from-primary/20 dark:via-purple-500/10 dark:to-pink-500/20" />
        <div class="absolute inset-0 bg-[url('~/assets/grid.svg')] opacity-10" />
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
            <span class="text-primary">Contact</span>
          </nav>

          <!-- Main Heading -->
          <div class="text-center">
            <h1 class="animate-fade-in-up mb-6 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Let's <span class="gradient-text">Connect</span>
            </h1>
            
            <p class="animate-fade-in-up animation-delay-200 mb-8 text-xl text-muted-foreground sm:text-2xl">
              Ready to bring your ideas to life? Let's discuss your project.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Contact Content -->
    <section class="section">
      <div class="container-custom">
        <div class="mx-auto max-w-6xl">
          <div class="grid gap-12 lg:grid-cols-2">
            <!-- Contact Information -->
            <div class="animate-fade-in-up">
              <h2 class="mb-8 text-3xl font-bold">Get In Touch</h2>
              
              <div class="mb-8 space-y-6">
                <div class="flex items-start gap-4">
                  <div class="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                    <Icon name="lucide:mail" class="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 class="font-semibold">Email</h3>
                    <p class="text-muted-foreground">patrick.cheruiyot@example.com</p>
                    <p class="text-sm text-muted-foreground">Typically replies within 24 hours</p>
                  </div>
                </div>
                
                <div class="flex items-start gap-4">
                  <div class="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                    <Icon name="lucide:map-pin" class="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 class="font-semibold">Location</h3>
                    <p class="text-muted-foreground">Nairobi, Kenya</p>
                    <p class="text-sm text-muted-foreground">Available for remote work worldwide</p>
                  </div>
                </div>
                
                <div class="flex items-start gap-4">
                  <div class="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                    <Icon name="lucide:clock" class="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 class="font-semibold">Availability</h3>
                    <p class="text-muted-foreground">Currently accepting new projects</p>
                    <p class="text-sm text-muted-foreground">Let's discuss your timeline and requirements</p>
                  </div>
                </div>
              </div>

              <!-- Social Links -->
              <div class="mb-8">
                <h3 class="mb-4 font-semibold">Follow My Journey</h3>
                <div class="flex gap-4">
                  <a
                    href="https://github.com/tricrck"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="flex h-12 w-12 items-center justify-center rounded-full bg-muted transition-colors hover:bg-primary hover:text-primary-foreground"
                    aria-label="GitHub"
                  >
                    <Icon name="lucide:github" class="h-6 w-6" />
                  </a>
                  <a
                    href="https://linkedin.com/in/patrick-cheruiyot-359999188"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="flex h-12 w-12 items-center justify-center rounded-full bg-muted transition-colors hover:bg-primary hover:text-primary-foreground"
                    aria-label="LinkedIn"
                  >
                    <Icon name="lucide:linkedin" class="h-6 w-6" />
                  </a>
                  <a
                    href="https://x.com/RiczNgetch"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="flex h-12 w-12 items-center justify-center rounded-full bg-muted transition-colors hover:bg-primary hover:text-primary-foreground"
                    aria-label="Twitter"
                  >
                    <Icon name="lucide:twitter" class="h-6 w-6" />
                  </a>
                </div>
              </div>

              <!-- Support Section -->
              <div class="rounded-2xl bg-gradient-to-br from-amber-500/10 to-orange-500/10 p-6">
                <h3 class="mb-3 font-semibold">Love My Work?</h3>
                <p class="mb-4 text-sm text-muted-foreground">
                  Support my open-source projects and creative endeavors with a coffee.
                </p>
                <a
                  href="https://buymeacoffee.com/tricrck"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="inline-flex items-center gap-2 rounded-lg bg-amber-500 px-4 py-2 text-sm font-semibold text-white transition-all hover:scale-105 hover:bg-amber-600"
                >
                  <Icon name="lucide:coffee" class="h-4 w-4" />
                  Buy Me a Coffee
                </a>
              </div>
            </div>

            <!-- Contact Form -->
            <div class="animate-fade-in-up animation-delay-200">
              <div class="rounded-2xl bg-muted/30 p-8">
                <h2 class="mb-6 text-2xl font-bold">Send a Message</h2>
                
                <!-- Success Message -->
                <div 
                  v-if="isSubmitted"
                  class="mb-6 rounded-lg bg-green-500/10 p-4 text-green-600 dark:text-green-400"
                >
                  <div class="flex items-center gap-2">
                    <Icon name="lucide:check-circle" class="h-5 w-5" />
                    <span class="font-semibold">Message sent successfully!</span>
                  </div>
                  <p class="mt-1 text-sm">
                    Thank you for reaching out. I'll get back to you as soon as possible.
                  </p>
                </div>

                <form @submit.prevent="handleSubmit" class="space-y-6">
                  <div class="grid gap-6 sm:grid-cols-2">
                    <div>
                      <label for="name" class="mb-2 block font-medium">Name *</label>
                      <input
                        id="name"
                        v-model="name"
                        type="text"
                        required
                        class="w-full rounded-lg border border-border bg-background px-4 py-3 transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                        placeholder="Your full name"
                      >
                    </div>
                    
                    <div>
                      <label for="email" class="mb-2 block font-medium">Email *</label>
                      <input
                        id="email"
                        v-model="email"
                        type="email"
                        required
                        class="w-full rounded-lg border border-border bg-background px-4 py-3 transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                        placeholder="your.email@example.com"
                      >
                    </div>
                  </div>
                  
                  <div>
                    <label for="subject" class="mb-2 block font-medium">Subject *</label>
                    <input
                      id="subject"
                      v-model="subject"
                      type="text"
                      required
                      class="w-full rounded-lg border border-border bg-background px-4 py-3 transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                      placeholder="What is this regarding?"
                    >
                  </div>
                  
                  <div>
                    <label for="message" class="mb-2 block font-medium">Message *</label>
                    <textarea
                      id="message"
                      v-model="message"
                      required
                      rows="6"
                      class="w-full rounded-lg border border-border bg-background px-4 py-3 transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                      placeholder="Tell me about your project, ideas, or how we can collaborate..."
                    ></textarea>
                  </div>
                  
                  <button
                    type="submit"
                    :disabled="isSubmitting"
                    class="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-6 py-4 font-semibold text-primary-foreground transition-all hover:scale-105 hover:shadow-lg disabled:opacity-50"
                  >
                    <Icon 
                      v-if="isSubmitting" 
                      name="lucide:loader" 
                      class="h-5 w-5 animate-spin" 
                    />
                    <Icon v-else name="lucide:send" class="h-5 w-5" />
                    {{ isSubmitting ? 'Sending...' : 'Send Message' }}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- FAQ Section -->
    <section class="section bg-muted/30">
      <div class="container-custom">
        <div class="mx-auto max-w-4xl">
          <div class="text-center mb-12">
            <h2 class="mb-4 text-3xl font-bold">Frequently Asked Questions</h2>
            <p class="text-lg text-muted-foreground">
              Quick answers to common questions
            </p>
          </div>
          
          <div class="grid gap-6 md:grid-cols-2">
            <div class="rounded-2xl bg-background p-6">
              <h3 class="mb-3 font-semibold">What types of projects do you take on?</h3>
              <p class="text-muted-foreground">
                I specialize in web applications, SaaS products, e-commerce solutions, and creative tech projects. 
                I'm particularly passionate about projects that solve real problems and create meaningful impact.
              </p>
            </div>
            
            <div class="rounded-2xl bg-background p-6">
              <h3 class="mb-3 font-semibold">What is your typical development process?</h3>
              <p class="text-muted-foreground">
                I follow an agile approach with clear communication, regular updates, and iterative development. 
                Each project starts with discovery, followed by planning, development, testing, and deployment.
              </p>
            </div>
            
            <div class="rounded-2xl bg-background p-6">
              <h3 class="mb-3 font-semibold">Do you work with international clients?</h3>
              <p class="text-muted-foreground">
                Absolutely! I work with clients worldwide and am experienced in remote collaboration across 
                different time zones. Clear communication and proper planning make distance irrelevant.
              </p>
            </div>
            
            <div class="rounded-2xl bg-background p-6">
              <h3 class="mb-3 font-semibold">How do you handle project pricing?</h3>
              <p class="text-muted-foreground">
                I offer both fixed-price projects for well-defined scopes and hourly rates for ongoing work. 
                After discussing your requirements, I'll provide a transparent quote with no hidden costs.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="section relative overflow-hidden bg-gradient-to-br from-primary via-purple-600 to-pink-600 text-white">
      <div class="absolute inset-0 bg-[url('~/assets/grid.svg')] opacity-10" />
      
      <div class="container-custom relative">
        <div class="mx-auto max-w-3xl text-center">
          <h2 class="mb-6 text-4xl font-bold sm:text-5xl">
            Let's Start Your Project
          </h2>
          <p class="mb-8 text-xl text-white/90">
            Have an idea you're excited about? Let's discuss how we can bring it to life together.
          </p>
          <NuxtLink
            to="/portfolio"
            class="inline-flex items-center gap-2 rounded-lg bg-white px-8 py-4 text-lg font-semibold text-primary shadow-xl transition-all hover:scale-105"
          >
            View My Portfolio
            <Icon name="lucide:arrow-right" class="h-5 w-5" />
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
</style>