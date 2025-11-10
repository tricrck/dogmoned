<script setup lang="ts">
const { testimonials } = useApi()
const { data: items, pending, error } = await useAsyncData(
  'testimonials',
  () => testimonials.getAll()
)

const currentIndex = ref(0)
const autoplayInterval = ref<NodeJS.Timeout | null>(null)

const next = () => {
  if (!items.value?.length) return
  currentIndex.value = (currentIndex.value + 1) % items.value.length
}

const prev = () => {
  if (!items.value?.length) return
  currentIndex.value = currentIndex.value === 0 
    ? items.value.length - 1 
    : currentIndex.value - 1
}

const goTo = (index: number) => {
  currentIndex.value = index
}

const startAutoplay = () => {
  autoplayInterval.value = setInterval(next, 5000)
}

const stopAutoplay = () => {
  if (autoplayInterval.value) {
    clearInterval(autoplayInterval.value)
  }
}

onMounted(() => {
  startAutoplay()
})

onUnmounted(() => {
  stopAutoplay()
})
</script>

<template>
  <div class="relative">
    <!-- Loading State -->
    <div v-if="pending" class="animate-pulse">
      <div class="mx-auto max-w-3xl rounded-2xl bg-muted p-12">
        <div class="mb-6 h-6 w-3/4 rounded bg-muted-foreground/20" />
        <div class="mb-4 h-4 rounded bg-muted-foreground/20" />
        <div class="h-4 w-2/3 rounded bg-muted-foreground/20" />
      </div>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="mx-auto max-w-3xl rounded-2xl border border-destructive/50 bg-destructive/10 p-8 text-center">
      <Icon name="lucide:alert-circle" class="mx-auto h-12 w-12 text-destructive" />
      <p class="mt-4 font-semibold">Failed to load testimonials</p>
    </div>

    <!-- Carousel -->
    <div
      v-else-if="items && items.length > 0"
      class="relative"
      @mouseenter="stopAutoplay"
      @mouseleave="startAutoplay"
    >
      <!-- Testimonials -->
      <div class="overflow-hidden">
        <div class="relative mx-auto max-w-3xl">
          <TransitionGroup
            enter-active-class="transition duration-500 ease-out"
            enter-from-class="opacity-0 translate-x-full"
            enter-to-class="opacity-100 translate-x-0"
            leave-active-class="transition duration-500 ease-in absolute inset-0"
            leave-from-class="opacity-100 translate-x-0"
            leave-to-class="opacity-0 -translate-x-full"
          >
            <div
              v-for="(item, index) in items"
              v-show="index === currentIndex"
              :key="item._id"
              class="rounded-2xl border border-border bg-card p-8 shadow-lg md:p-12"
            >
              <!-- Quote Icon -->
              <Icon name="lucide:quote" class="mb-6 h-12 w-12 text-primary/30" />

              <!-- Testimonial Text -->
              <blockquote class="mb-8 text-lg leading-relaxed md:text-xl">
                "{{ item.testimonial }}"
              </blockquote>

              <!-- Author Info -->
              <div class="flex items-center gap-4">
                <div class="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary font-semibold">
                  {{ item.name.charAt(0) }}
                </div>
                <div>
                  <div class="font-semibold">{{ item.name }}</div>
                  <div class="text-sm text-muted-foreground">
                    {{ item.designation }}
                  </div>
                </div>
                <a
                  v-if="item.link"
                  :href="item.link"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="ml-auto"
                >
                  <Icon name="lucide:external-link" class="h-5 w-5 text-muted-foreground transition-colors hover:text-primary" />
                </a>
              </div>
            </div>
          </TransitionGroup>
        </div>
      </div>

      <!-- Navigation Buttons -->
      <button
        @click="prev"
        class="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full bg-card border border-border shadow-lg transition-all hover:scale-110 hover:border-primary hover:bg-primary/10"
        aria-label="Previous testimonial"
      >
        <Icon name="lucide:chevron-left" class="h-6 w-6" />
      </button>

      <button
        @click="next"
        class="absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full bg-card border border-border shadow-lg transition-all hover:scale-110 hover:border-primary hover:bg-primary/10"
        aria-label="Next testimonial"
      >
        <Icon name="lucide:chevron-right" class="h-6 w-6" />
      </button>

      <!-- Dots Indicator -->
      <div class="mt-8 flex justify-center gap-2">
        <button
          v-for="(item, index) in items"
          :key="item._id"
          @click="goTo(index)"
          class="h-2 w-2 rounded-full transition-all"
          :class="[
            index === currentIndex
              ? 'w-8 bg-primary'
              : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
          ]"
          :aria-label="`Go to testimonial ${index + 1}`"
        />
      </div>
    </div>

    <!-- Empty State -->
    <div v-else class="mx-auto max-w-3xl rounded-2xl border border-border bg-muted/30 p-12 text-center">
      <Icon name="lucide:message-square" class="mx-auto h-16 w-16 text-muted-foreground" />
      <p class="mt-4 font-semibold">No testimonials yet</p>
      <p class="mt-2 text-sm text-muted-foreground">Check back soon</p>
    </div>
  </div>
</template>