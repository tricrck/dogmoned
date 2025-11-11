<script setup lang="ts">
const { setPageSEO } = useSEO()

setPageSEO({
  title: 'Terms of Service | Patrick Cheruiyot',
  description: 'Terms of service for Patrick Cheruiyot\'s website and services.',
})
</script>

<template>
  <div class="min-h-screen">
    <section class="section">
      <div class="container-custom">
        <div class="mx-auto max-w-4xl">
          <nav class="mb-8">
            <NuxtLink 
              to="/" 
              class="inline-flex items-center gap-2 text-muted-foreground transition-colors hover:text-primary"
            >
              <Icon name="lucide:home" class="h-4 w-4" />
              Home
            </NuxtLink>
            <span class="mx-2 text-muted-foreground">/</span>
            <span class="text-primary">Terms of Service</span>
          </nav>

          <h1 class="mb-8 text-4xl font-bold">Terms of Service</h1>
          
          <div class="prose prose-lg max-w-none">
            <p class="text-muted-foreground">Last updated: {{ new Date().toLocaleDateString() }}</p>
            
            <h2 class="mt-8 text-2xl font-semibold">Acceptance of Terms</h2>
            <p>
              By accessing and using this website, you accept and agree to be bound by the 
              terms and provision of this agreement.
            </p>
            
            <h2 class="mt-8 text-2xl font-semibold">Use License</h2>
            <p>
              Permission is granted to temporarily download one copy of the materials 
              (information or software) on this website for personal, non-commercial 
              transitory viewing only.
            </p>
            
            <h2 class="mt-8 text-2xl font-semibold">Contact</h2>
            <p>
              For questions about these Terms, please 
              <NuxtLink to="/contact" class="text-primary hover:underline">contact us</NuxtLink>.
            </p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>