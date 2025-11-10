<script setup lang="ts">
const skills = [
  {
    category: 'Frontend',
    icon: 'lucide:layout',
    items: [
      { name: 'Vue.js', level: 95, icon: 'logos:vue' },
      { name: 'Nuxt', level: 95, icon: 'logos:nuxt-icon' },
      { name: 'React', level: 90, icon: 'logos:react' },
      { name: 'TypeScript', level: 90, icon: 'logos:typescript-icon' },
      { name: 'Tailwind CSS', level: 95, icon: 'logos:tailwindcss-icon' },
    ]
  },
  {
    category: 'Backend',
    icon: 'lucide:server',
    items: [
      { name: 'Node.js', level: 90, icon: 'logos:nodejs-icon' },
      { name: 'Express', level: 85, icon: 'simple-icons:express' },
      { name: 'MongoDB', level: 85, icon: 'logos:mongodb-icon' },
      { name: 'PostgreSQL', level: 80, icon: 'logos:postgresql' },
      { name: 'Firebase', level: 85, icon: 'logos:firebase' },
    ]
  },
  {
    category: 'Tools & Others',
    icon: 'lucide:wrench',
    items: [
      { name: 'Git', level: 90, icon: 'logos:git-icon' },
      { name: 'Docker', level: 75, icon: 'logos:docker-icon' },
      { name: 'AWS', level: 70, icon: 'logos:aws' },
      { name: 'Figma', level: 85, icon: 'logos:figma' },
      { name: 'VS Code', level: 95, icon: 'logos:visual-studio-code' },
    ]
  }
]

const sectionRef = ref<HTMLElement | null>(null)
const isVisible = ref(false)

const { stop } = useIntersectionObserver(
  sectionRef,
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
  <section ref="sectionRef" class="section">
    <div class="container-custom">
      <div class="mb-16 text-center">
        <h2 class="mb-4 text-3xl font-bold sm:text-4xl">Skills & Expertise</h2>
        <p class="text-lg text-muted-foreground">
          Technologies and tools I work with
        </p>
      </div>

      <div class="grid gap-8 lg:grid-cols-3">
        <div
          v-for="(skillGroup, groupIndex) in skills"
          :key="skillGroup.category"
          class="rounded-xl border border-border bg-card p-8 transition-all duration-300 hover:shadow-lg"
          :class="[
            isVisible ? 'animate-fade-in-up' : 'opacity-0',
          ]"
          :style="{ animationDelay: `${groupIndex * 150}ms` }"
        >
          <!-- Category Header -->
          <div class="mb-6 flex items-center gap-3">
            <div class="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
              <Icon :name="skillGroup.icon" class="h-6 w-6 text-primary" />
            </div>
            <h3 class="text-2xl font-bold">{{ skillGroup.category }}</h3>
          </div>

          <!-- Skills List -->
          <div class="space-y-6">
            <div
              v-for="skill in skillGroup.items"
              :key="skill.name"
            >
              <!-- Skill Name & Icon -->
              <div class="mb-2 flex items-center justify-between">
                <div class="flex items-center gap-2">
                  <Icon :name="skill.icon" class="h-5 w-5" />
                  <span class="font-medium">{{ skill.name }}</span>
                </div>
                <span class="text-sm text-muted-foreground">{{ skill.level }}%</span>
              </div>

              <!-- Progress Bar -->
              <div class="h-2 overflow-hidden rounded-full bg-muted">
                <div
                  class="h-full rounded-full bg-gradient-to-r from-primary to-purple-500 transition-all duration-1000 ease-out"
                  :style="{ 
                    width: isVisible ? `${skill.level}%` : '0%',
                    transitionDelay: `${(groupIndex * 150) + 200}ms`
                  }"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Additional Info -->
      <div class="mt-12 text-center">
        <p class="text-muted-foreground">
          Always learning and exploring new technologies to deliver the best solutions
        </p>
      </div>
    </div>
  </section>
</template>