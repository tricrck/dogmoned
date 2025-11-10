<script setup lang="ts">
const route = useRoute() as ReturnType<typeof useRoute> & { params: { id: string } }
const { blog, comments } = useApi()
const { setPageSEO, generateBlogSchema } = useSEO()

const id = route.params.id

// Fetch blog post
const { data: post, pending, error } = await useAsyncData(
  `blog-${id}`,
  () => blog.getById(id)
)

// Fetch comments
const { data: postComments, refresh: refreshComments } = await useAsyncData(
  `comments-${id}`,
  () => comments.getAll(id)
)

// Set SEO
watchEffect(() => {
  if (post.value) {
    setPageSEO({
      title: post.value.title,
      description: post.value.content?.substring(0, 160),
      type: 'article',
      author: post.value.author || 'Patrick Cheruitot',
      publishedTime: post.value.createdAt,
      modifiedTime: post.value.updatedAt,
      schema: generateBlogSchema(post.value),
    })
  }
})

const formattedDate = computed(() => {
  if (!post.value) return ''
  return new Date(post.value.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
})

const readingTime = computed(() => {
  if (!post.value?.content) return 0
  const words = post.value.content.trim().split(/\s+/).length
  return Math.ceil(words / 200)
})
</script>

<template>
  <div class="min-h-screen pb-16">
    <!-- Loading State -->
    <div v-if="pending" class="container-custom py-16">
      <div class="mx-auto max-w-4xl">
        <div class="animate-pulse space-y-8">
          <div class="h-8 w-3/4 rounded bg-muted" />
          <div class="h-4 w-1/2 rounded bg-muted" />
          <div class="aspect-video rounded-lg bg-muted" />
          <div class="space-y-4">
            <div class="h-4 rounded bg-muted" />
            <div class="h-4 rounded bg-muted" />
            <div class="h-4 w-5/6 rounded bg-muted" />
          </div>
        </div>
      </div>
    </div>

    <!-- Error State -->
    <div v-else-if="error || !post" class="container-custom py-16">
      <div class="mx-auto max-w-4xl text-center">
        <Icon name="lucide:alert-circle" class="mx-auto h-16 w-16 text-destructive" />
        <h1 class="mt-6 text-3xl font-bold">Blog Post Not Found</h1>
        <p class="mt-4 text-muted-foreground">
          The blog post you're looking for doesn't exist or has been removed.
        </p>
        <NuxtLink
          to="/blog"
          class="mt-8 inline-flex items-center gap-2 text-primary hover:underline"
        >
          <Icon name="lucide:arrow-left" class="h-5 w-5" />
          Back to Blog
        </NuxtLink>
      </div>
    </div>

    <!-- Blog Post -->
    <article v-else class="container-custom py-16">
      <div class="mx-auto max-w-4xl">
        <!-- Back Link -->
        <NuxtLink
          to="/blog"
          class="mb-8 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
        >
          <Icon name="lucide:arrow-left" class="h-4 w-4" />
          Back to Blog
        </NuxtLink>

        <!-- Header -->
        <header class="mb-12">
          <h1 class="mb-6 text-4xl font-bold tracking-tight sm:text-5xl">
            {{ post.title }}
          </h1>

          <!-- Meta Info -->
          <div class="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
            <div class="flex items-center gap-2">
              <Icon name="lucide:user" class="h-4 w-4" />
              <span>{{ post.author || 'Patrick Cheruitot' }}</span>
            </div>
            <div class="flex items-center gap-2">
              <Icon name="lucide:calendar" class="h-4 w-4" />
              <time :datetime="post.createdAt">{{ formattedDate }}</time>
            </div>
            <div class="flex items-center gap-2">
              <Icon name="lucide:clock" class="h-4 w-4" />
              <span>{{ readingTime }} min read</span>
            </div>
            <div class="flex items-center gap-2">
              <Icon name="lucide:message-circle" class="h-4 w-4" />
              <span>{{ postComments?.length || 0 }} comments</span>
            </div>
          </div>
        </header>

        <!-- Featured Image Placeholder -->
        <div class="mb-12 aspect-video overflow-hidden rounded-xl bg-gradient-to-br from-primary/20 to-purple-500/20">
          <div class="flex h-full items-center justify-center">
            <Icon name="lucide:image" class="h-24 w-24 text-muted-foreground/30" />
          </div>
        </div>

        <!-- Content -->
        <div class="prose prose-lg dark:prose-invert mx-auto mb-16">
          <div v-html="post.content" />
        </div>

        <!-- Share Buttons -->
        <div class="mb-16 flex items-center justify-between border-y border-border py-6">
          <span class="font-semibold">Share this post:</span>
          <div class="flex gap-3">
            <button
              class="flex h-10 w-10 items-center justify-center rounded-lg border border-border transition-all hover:border-primary hover:bg-primary/10"
              aria-label="Share on Twitter"
            >
              <Icon name="lucide:twitter" class="h-5 w-5" />
            </button>
            <button
              class="flex h-10 w-10 items-center justify-center rounded-lg border border-border transition-all hover:border-primary hover:bg-primary/10"
              aria-label="Share on LinkedIn"
            >
              <Icon name="lucide:linkedin" class="h-5 w-5" />
            </button>
            <button
              class="flex h-10 w-10 items-center justify-center rounded-lg border border-border transition-all hover:border-primary hover:bg-primary/10"
              aria-label="Copy link"
            >
              <Icon name="lucide:link" class="h-5 w-5" />
            </button>
          </div>
        </div>

        <!-- Comments Section -->
        <CommentSection
          :blog-id="post._id"
          :comments="postComments || []"
          @refresh="refreshComments"
        />
      </div>
    </article>
  </div>
</template>

<style scoped>
.prose :deep(h2) {
  @apply mb-4 mt-8 text-3xl font-bold;
}

.prose :deep(h3) {
  @apply mb-3 mt-6 text-2xl font-semibold;
}

.prose :deep(p) {
  @apply mb-4 leading-relaxed;
}

.prose :deep(ul),
.prose :deep(ol) {
  @apply mb-4 ml-6;
}

.prose :deep(li) {
  @apply mb-2;
}

.prose :deep(a) {
  @apply text-primary underline transition-colors hover:text-primary/80;
}

.prose :deep(code) {
  @apply rounded bg-muted px-2 py-1 text-sm font-mono;
}

.prose :deep(pre) {
  @apply mb-4 overflow-x-auto rounded-lg bg-muted p-4;
}
</style>