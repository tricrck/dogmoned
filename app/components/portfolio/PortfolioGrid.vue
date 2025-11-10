<script setup lang="ts">
import type { Portfolio } from '~/composables/useApi'

const props = defineProps<{
  limit?: number
}>()

const { portfolio } = useApi()
const { data: portfolioItems, pending, error } = await useAsyncData(
  'portfolio',
  () => portfolio.getAll()
)

const displayedItems = computed(() => {
  if (!portfolioItems.value) return []
  return props.limit
    ? portfolioItems.value.slice(0, props.limit)
    : portfolioItems.value
})
</script>

<template>
  <div>
    <!-- Loading State -->
    <div v-if="pending" class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <div
        v-for="i in (limit || 6)"
        :key="i"
        class="animate-pulse"
      >
        <div class="aspect-video rounded-lg bg-muted" />
        <div class="mt-4 h-6 rounded bg-muted" />
        <div class="mt-2 h-4 w-2/3 rounded bg-muted" />
      </div>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="rounded-lg border border-destructive/50 bg-destructive/10 p-8 text-center">
      <Icon name="lucide:alert-circle" class="mx-auto h-12 w-12 text-destructive" />
      <p class="mt-4 text-lg font-semibold">Failed to load portfolio items</p>
      <p class="mt-2 text-sm text-muted-foreground">{{ error.message }}</p>
    </div>

    <!-- Portfolio Grid -->
    <div
      v-else-if="displayedItems.length > 0"
      class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
    >
      <PortfolioCard
        v-for="(item, index) in displayedItems"
        :key="item._id"
        :item="item"
        :index="index"
      />
    </div>

    <!-- Empty State -->
    <div v-else class="rounded-lg border border-border bg-muted/30 p-12 text-center">
      <Icon name="lucide:folder-open" class="mx-auto h-16 w-16 text-muted-foreground" />
      <p class="mt-4 text-lg font-semibold">No portfolio items yet</p>
      <p class="mt-2 text-sm text-muted-foreground">Check back soon for new projects</p>
    </div>
  </div>
</template>