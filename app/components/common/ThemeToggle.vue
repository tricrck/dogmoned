<script setup lang="ts">
const colorMode = useColorMode()

const toggleTheme = () => {
  colorMode.preference = colorMode.preference === 'dark' ? 'light' : 'dark'
}

const icon = computed(() => {
  return colorMode.preference === 'dark' ? 'lucide:sun' : 'lucide:moon'
})
</script>

<template>
  <button
    @click="toggleTheme"
    class="flex h-10 w-10 items-center justify-center rounded-lg border border-border transition-all hover:border-primary hover:bg-primary/10 hover:scale-110"
    :aria-label="`Switch to ${colorMode.preference === 'dark' ? 'light' : 'dark'} mode`"
  >
    <Icon :name="icon" class="h-5 w-5 transition-transform hover:rotate-12" />
  </button>
</template>