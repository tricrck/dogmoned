<script setup lang="ts">
const { setPageSEO } = useSEO()

setPageSEO({
  title: 'Privacy Policy | Patrick Cheruiyot',
  description: 'Privacy policy for Patrick Cheruiyot\'s website and services.',
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
            <span class="text-primary">Privacy Policy</span>
          </nav>

          <h1 class="mb-8 text-4xl font-bold">Privacy Policy</h1>
          
          <div class="prose prose-lg max-w-none">
            <p class="text-muted-foreground">Last updated: {{ new Date().toLocaleDateString() }}</p>
            
            <h2 class="mt-8 text-2xl font-semibold">Information We Collect</h2>
            <p>
              When you visit our website, we may collect certain information automatically, 
              including your IP address, browser type, and browsing behavior.
            </p>
            
            <h2 class="mt-8 text-2xl font-semibold">How We Use Your Information</h2>
            <p>
              We use the information we collect to improve our website, respond to your 
              inquiries, and provide you with a better user experience.
            </p>
            
            <h2 class="mt-8 text-2xl font-semibold">Contact</h2>
            <p>
              If you have any questions about this Privacy Policy, please 
              <NuxtLink to="/contact" class="text-primary hover:underline">contact us</NuxtLink>.
            </p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>