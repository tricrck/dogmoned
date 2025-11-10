// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  components: [
    {
      path: '~/components',
      pathPrefix: false,
    },
    {
      path: '~/app/components',
      pathPrefix: false,
    },
  ],

  // App configuration
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      title: 'Patrick Cheruiyot - Full Stack Developer & Creative Technologist',
      htmlAttrs: {
        lang: 'en'
      },
      meta: [
        { name: 'description', content: 'Portfolio of Patrick Cheruiyot - Full Stack Developer specializing in modern web technologies, creative solutions, and exceptional user experiences.' },
        { name: 'format-detection', content: 'telephone=no' },
        { name: 'theme-color', content: '#000000' },
        // Open Graph
        { property: 'og:type', content: 'website' },
        { property: 'og:site_name', content: 'Patrick Cheruiyot' },
        { property: 'og:locale', content: 'en_US' },
        // Twitter Card
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:creator', content: '@RiczNgetch' },
      ],
      link: [
        { rel: 'icon', type: 'image/png', href: '/topper.png' },
        { rel: 'canonical', href: 'https://tricrock.co.ke' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
      ],
      script: [
        {
          type: 'application/ld+json',
          innerHTML: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Person',
            name: 'Patrick Cheruiyot',
            jobTitle: 'Full Stack Developer',
            url: 'https://tricrock.co.ke',
            sameAs: [
              'https://github.com/tricrck',
              'https://linkedin.com/in/patrick-cheruiyot-359999188',
              'https://x.com/RiczNgetch'
            ]
          })
        }
      ]
    },
    pageTransition: { name: 'page', mode: 'out-in' },
    layoutTransition: { name: 'layout', mode: 'out-in' }
  },

  // CSS
  css: ['~/assets/css/main.css'],

  // Modules
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/color-mode',
    '@pinia/nuxt',
    '@nuxt/image',
    '@vueuse/nuxt',
    '@nuxt/icon',
    '@nuxtjs/sitemap',
  ],

  // Tailwind CSS configuration
  tailwindcss: {
    cssPath: '~/assets/css/main.css',
    configPath: 'tailwind.config.ts',
    exposeConfig: false,
    viewer: true,
  },

  // Color mode (dark/light theme)
  colorMode: {
    classSuffix: '',
    preference: 'system',
    fallback: 'light',
  },

  // Image optimization
  image: {
    quality: 80,
    format: ['webp', 'avif'],
    screens: {
      xs: 320,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
      xxl: 1536,
    },
  },

  // Sitemap
  sitemap: {
    // Other sitemap options can go here
    // Use 'urls' instead of 'routes' for @nuxtjs/sitemap v3+
    urls: [
      '/',
      '/about',
      '/portfolio',
      '/blog',
      '/testimonials',
      '/contact',
    ],
  },

  // Runtime config
  runtimeConfig: {
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE || 'http://localhost:5000/api',
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || 'https://tricrock.co.ke',
      siteName: 'Patrick Cheruiyot',
      siteDescription: 'Full Stack Developer & Creative Technologist',
      firebase: {
        apiKey: process.env.NUXT_PUBLIC_FIREBASE_API_KEY,
        authDomain: process.env.NUXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
        projectId: process.env.NUXT_PUBLIC_FIREBASE_PROJECT_ID,
        storageBucket: process.env.NUXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
        messagingSenderId: process.env.NUXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
        appId: process.env.NUXT_PUBLIC_FIREBASE_APP_ID,
      },
      gtag: {
        id: process.env.NUXT_PUBLIC_GA_ID,
      }
    }
  },

  // Build configuration
  nitro: {
    compressPublicAssets: true,
    prerender: {
      crawlLinks: true,
      routes: ['/', '/about', '/portfolio', '/blog', '/contact'],
    }
  },

  // Experimental features
  experimental: {
    payloadExtraction: true,
    renderJsonPayloads: true,
    typedPages: true,
  },

  // TypeScript
  typescript: {
    strict: true,
    typeCheck: true,
  },

  // Vite configuration
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "~/assets/css/_variables.scss" as *;'
        }
      }
    }
  },
})