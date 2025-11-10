<script setup lang="ts">
import type { Portfolio } from '~/composables/useApi'

const props = defineProps<{
  item: Portfolio
  index: number
}>()

const cardRef = ref<HTMLElement | null>(null)
const isVisible = ref(false)

const { stop } = useIntersectionObserver(
  cardRef,
  (entries) => {
    const entry = entries[0]
    if (entry?.isIntersecting) {
      isVisible.value = true
      stop()
    }
  }
)
</script>

<template>
  <article
    ref="cardRef"
    class="group relative overflow-hidden rounded-xl border border-border bg-card transition-all duration-300 hover:shadow-2xl"
    :class="[
      isVisible ? 'animate-fade-in-up' : 'opacity-0',
    ]"
    :style="{ animationDelay: `${index * 100}ms` }"
  >
    <NuxtLink :to="`/portfolio/${item._id}`" class="block">
      <!-- Image -->
      <div class="relative aspect-video overflow-hidden bg-muted">
        <NuxtImg
          v-if="item.image"
          :src="item.image"
          :alt="item.title"
          class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
          format="webp"
        />
        <div v-else class="flex h-full w-full items-center justify-center bg-muted">
          <Icon name="lucide:image" class="h-16 w-16 text-muted-foreground" />
        </div>
        
        <!-- Overlay -->
        <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        
        <!-- View Project Link -->
        <div class="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <span class="flex items-center gap-2 rounded-lg bg-white px-6 py-3 font-semibold text-primary shadow-lg transition-transform group-hover:scale-110">
            View Project
            <Icon name="lucide:arrow-right" class="h-5 w-5" />
          </span>
        </div>
      </div>

      <!-- Content -->
      <div class="p-6">
        <!-- Title & Role -->
        <h3 class="mb-2 text-xl font-bold transition-colors group-hover:text-primary">
          {{ item.title }}
        </h3>
        <p class="mb-3 text-sm font-medium text-primary">
          {{ item.role }}
        </p>

        <!-- Description -->
        <p class="mb-4 line-clamp-2 text-sm text-muted-foreground">
          {{ item.description }}
        </p>

        <!-- Technologies -->
        <div class="flex flex-wrap gap-2">
          <span
            v-for="tech in item.technologies.slice(0, 3)"
            :key="tech"
            class="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary"
          >
            {{ tech }}
          </span>
          <span
            v-if="item.technologies.length > 3"
            class="rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground"
          >
            +{{ item.technologies.length - 3 }}
          </span>
        </div>
      </div>
    </NuxtLink>

    <!-- Link Indicator -->
    <div class="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-lg opacity-0 transition-all duration-300 group-hover:opacity-100">
      <Icon name="lucide:external-link" class="h-5 w-5 text-primary" />
    </div>
  </article>
</template>