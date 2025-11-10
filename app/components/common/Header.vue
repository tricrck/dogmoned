<script setup lang="ts">
const route = useRoute()
const scrollY = ref(0)
const mobileMenuOpen = ref(false)

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Portfolio', href: '/portfolio' },
  { name: 'Blog', href: '/blog' },
  { name: 'Testimonials', href: '/testimonials' },
  { name: 'Contact', href: '/contact' },
]

const isScrolled = computed(() => scrollY.value > 50)

onMounted(() => {
  window.addEventListener('scroll', () => {
    scrollY.value = window.scrollY
  })
})

watch(() => route.path, () => {
  mobileMenuOpen.value = false
})
</script>

<template>
  <header
    class="fixed top-0 z-50 w-full transition-all duration-300"
    :class="[
      isScrolled
        ? 'glass border-b border-border/50 shadow-lg'
        : 'bg-transparent',
    ]"
  >
    <nav class="container-custom">
      <div class="flex h-16 items-center justify-between lg:h-20">
        <!-- Logo -->
        <NuxtLink
          to="/"
          class="flex items-center gap-2 text-xl font-bold transition-colors hover:text-primary"
        >
          <div class="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-purple-600 text-white shadow-lg">
            PC
          </div>
          <span class="hidden sm:block">Patrick Cheruiyot</span>
        </NuxtLink>

        <!-- Desktop Navigation -->
        <div class="hidden items-center gap-8 lg:flex">
          <NuxtLink
            v-for="item in navigation"
            :key="item.name"
            :to="item.href"
            class="text-sm font-medium transition-colors hover:text-primary"
            :class="[
              route.path === item.href
                ? 'text-primary'
                : 'text-foreground',
            ]"
          >
            {{ item.name }}
          </NuxtLink>
        </div>

        <!-- Right Side Actions -->
        <div class="flex items-center gap-4">
          <ThemeToggle />
          
          <!-- Mobile Menu Button -->
          <button
            class="lg:hidden"
            @click="mobileMenuOpen = !mobileMenuOpen"
            aria-label="Toggle menu"
          >
            <Icon
              :name="mobileMenuOpen ? 'lucide:x' : 'lucide:menu'"
              class="h-6 w-6"
            />
          </button>
        </div>
      </div>
    </nav>

    <!-- Mobile Menu -->
    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0 -translate-y-4"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-4"
    >
      <div
        v-if="mobileMenuOpen"
        class="glass border-t border-border/50 lg:hidden"
      >
        <div class="container-custom space-y-1 py-4">
          <NuxtLink
            v-for="item in navigation"
            :key="item.name"
            :to="item.href"
            class="block rounded-lg px-4 py-3 text-base font-medium transition-colors hover:bg-muted"
            :class="[
              route.path === item.href
                ? 'bg-primary/10 text-primary'
                : 'text-foreground',
            ]"
          >
            {{ item.name }}
          </NuxtLink>
        </div>
      </div>
    </Transition>
  </header>

  <!-- Spacer to prevent content from going under fixed header -->
  <div class="h-16 lg:h-20" />
</template>