<template>
  <div class="relative">
    <!-- Timeline line -->
    <div class="absolute left-4 top-0 h-full w-0.5 bg-border md:left-1/2 md:-translate-x-0.5" />
    
    <div class="space-y-12">
      <div 
        v-for="(experience, index) in experiences" 
        :key="experience.company"
        class="relative"
      >
        <!-- Timeline dot -->
        <div class="absolute left-4 h-3 w-3 rounded-full border-4 border-background bg-primary md:left-1/2 md:-translate-x-1.5" />
        
        <div class="ml-12 md:ml-0 md:flex md:justify-between" :class="index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'">
          <div class="md:w-5/12" :class="index % 2 === 0 ? 'md:text-right' : ''">
            <div class="mb-2">
              <span class="inline-block rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                {{ experience.period }}
              </span>
            </div>
            <h3 class="text-xl font-bold">{{ experience.position }}</h3>
            <p class="text-lg text-primary">{{ experience.company }}</p>
          </div>
          
          <div class="mt-4 md:mt-0 md:w-5/12">
            <p class="text-muted-foreground">{{ experience.description }}</p>
            <div class="mt-3 flex flex-wrap gap-2">
              <span
                v-for="tech in experience.technologies"
                :key="tech"
                class="rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground"
              >
                {{ tech }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const experiences = [
  {
    position: 'Full Stack Developer',
    company: 'Freelance',
    period: '2020 - Present',
    description: 'Building web applications and digital experiences for clients worldwide using modern technologies and best practices.',
    technologies: ['Vue.js', 'React', 'Node.js', 'TypeScript', 'MongoDB']
  },
  {
    position: 'Frontend Developer',
    company: 'Tech Company',
    period: '2019 - 2020',
    description: 'Developed and maintained customer-facing web applications with focus on performance and user experience.',
    technologies: ['React', 'Redux', 'SASS', 'Webpack']
  },
  {
    position: 'Web Developer',
    company: 'Startup',
    period: '2018 - 2019',
    description: 'Built responsive websites and web applications, collaborating with designers and backend developers.',
    technologies: ['JavaScript', 'PHP', 'WordPress', 'MySQL']
  }
]
</script>