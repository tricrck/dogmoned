<script setup lang="ts">
import type { Blog } from '~/composables/useApi'

const props = defineProps<{
  post: Blog
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

const excerpt = computed(() => {
  if (!props.post.content) return ''
  const text = props.post.content.replace(/<[^>]*>/g, '')
  return text.length > 150 ? text.substring(0, 150) + '...' : text
})

const formattedDate = computed(() => {
  return new Date(props.post.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
})

const commentCount = computed(() => {
  return Array.isArray(props.post.comments) ? props.post.comments.length : 0
})
</script>

<template>
  <article
    ref="cardRef"
    class="group overflow-hidden rounded-xl border border-border bg-card transition-all duration-300 hover:shadow-xl"
    :class="[
      isVisible ? 'animate-fade-in-up' : 'opacity-0',
    ]"
    :style="{ animationDelay: `${index * 100}ms` }"
  >
    <NuxtLink :to="`/blog/${post._id}`" class="block">
      <!-- Featured Image Placeholder -->
      <div class="relative aspect-[16/9] overflow-hidden bg-gradient-to-br from-primary/20 to-purple-500/20">
        <div class="flex h-full items-center justify-center">
          <Icon name="lucide:file-text" class="h-20 w-20 text-muted-foreground/30" />
        </div>
        
        <!-- Date Badge -->
        <div class="absolute left-4 top-4 rounded-lg bg-background/90 px-3 py-2 backdrop-blur-sm">
          <time :datetime="post.createdAt" class="text-xs font-semibold">
            {{ formattedDate }}
          </time>
        </div>
      </div>

      <!-- Content -->
      <div class="p-6">
        <!-- Title -->
        <h3 class="mb-3 text-xl font-bold transition-colors group-hover:text-primary line-clamp-2">
          {{ post.title }}
        </h3>

        <!-- Excerpt -->
        <p class="mb-4 text-sm text-muted-foreground line-clamp-3">
          {{ excerpt }}
        </p>

        <!-- Meta -->
        <div class="flex items-center gap-4 text-sm text-muted-foreground">
          <div class="flex items-center gap-1">
            <Icon name="lucide:user" class="h-4 w-4" />
            <span>{{ post.author || 'Patrick' }}</span>
          </div>
          <div class="flex items-center gap-1">
            <Icon name="lucide:message-circle" class="h-4 w-4" />
            <span>{{ commentCount }}</span>
          </div>
        </div>

        <!-- Read More -->
        <div class="mt-4 flex items-center gap-2 text-sm font-semibold text-primary transition-transform group-hover:translate-x-2">
          Read Article
          <Icon name="lucide:arrow-right" class="h-4 w-4" />
        </div>
      </div>
    </NuxtLink>
  </article>
</template>