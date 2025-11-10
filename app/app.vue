<script setup lang="ts">
// Set default SEO
const { setPageSEO } = useSEO()

useHead({
  htmlAttrs: {
    lang: 'en',
  },
  bodyAttrs: {
    class: 'antialiased',
  },
})

// Initialize analytics on mount
onMounted(() => {
  if (process.client) {
    // Google Analytics will be initialized via plugin
    console.log('App mounted')
  }
})
</script>

<template>
  <div id="app" class="min-h-screen bg-background font-sans text-foreground">
    <Header />
    
    <main>
      <NuxtPage />
    </main>
    
    <Footer />
  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
</style>