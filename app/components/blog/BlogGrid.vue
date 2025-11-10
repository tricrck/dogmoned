<script setup lang="ts">
import type { Blog } from '~/composables/useApi'

const props = defineProps<{
  limit?: number
}>()

const { blog } = useApi()
const { data: blogPosts, pending, error } = await useAsyncData(
  'blogs',
  () => blog.getAll()
)

const displayedPosts = computed(() => {
  if (!blogPosts.value) return []
  const sorted = [...blogPosts.value].sort((a, b) => 
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  )
  return props.limit ? sorted.slice(0, props.limit) : sorted
})
</script>

<template>
  <div>
    <!-- Loading State -->
    <div v-if="pending" class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
      <div v-for="i in (limit || 6)" :key="i" class="animate-pulse">
        <div class="aspect-video rounded-lg bg-muted" />
        <div class="mt-4 h-6 rounded bg-muted" />
        <div class="mt-2 h-4 w-3/4 rounded bg-muted" />
        <div class="mt-4 h-4 rounded bg-muted" />
        <div class="mt-2 h-4 w-2/3 rounded bg-muted" />
      </div>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="rounded-lg border border-destructive/50 bg-destructive/10 p-8 text-center">
      <Icon name="lucide:alert-circle" class="mx-auto h-12 w-12 text-destructive" />
      <p class="mt-4 text-lg font-semibold">Failed to load blog posts</p>
      <p class="mt-2 text-sm text-muted-foreground">{{ error.message }}</p>
    </div>

    <!-- Blog Grid -->
    <div
      v-else-if="displayedPosts.length > 0"
      class="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
    >
      <BlogCard
        v-for="(post, index) in displayedPosts"
        :key="post._id"
        :post="post"
        :index="index"
      />
    </div>

    <!-- Empty State -->
    <div v-else class="rounded-lg border border-border bg-muted/30 p-12 text-center">
      <Icon name="lucide:file-text" class="mx-auto h-16 w-16 text-muted-foreground" />
      <p class="mt-4 text-lg font-semibold">No blog posts yet</p>
      <p class="mt-2 text-sm text-muted-foreground">Check back soon for new articles</p>
    </div>
  </div>
</template>