export const useSEO = () => {
  const config = useRuntimeConfig()
  const route = useRoute()

  const setPageSEO = (options: SEOOptions) => {
    const {
      title,
      description,
      image,
      type = 'website',
      author,
      publishedTime,
      modifiedTime,
      tags = [],
      schema,
    } = options

    const fullTitle = title 
      ? `${title} | ${config.public.siteName}`
      : config.public.siteName

    const canonicalUrl = `${config.public.siteUrl}${route.path}`
    const imageUrl = image || `${config.public.siteUrl}/og-image.jpg`

    // Basic meta tags
    const meta: any[] = [
      { name: 'description', content: description || config.public.siteDescription },
      { name: 'author', content: author || 'Patrick Cheruitot' },
      
      // Open Graph
      { property: 'og:title', content: fullTitle },
      { property: 'og:description', content: description || config.public.siteDescription },
      { property: 'og:type', content: type },
      { property: 'og:url', content: canonicalUrl },
      { property: 'og:image', content: imageUrl },
      { property: 'og:image:width', content: '1200' },
      { property: 'og:image:height', content: '630' },
      { property: 'og:site_name', content: config.public.siteName },
      
      // Twitter Card
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: fullTitle },
      { name: 'twitter:description', content: description || config.public.siteDescription },
      { name: 'twitter:image', content: imageUrl },
      { name: 'twitter:creator', content: '@patrickcheruitot' },
    ]

    // Article specific meta
    if (type === 'article') {
      if (publishedTime) {
        meta.push({ property: 'article:published_time', content: publishedTime })
      }
      if (modifiedTime) {
        meta.push({ property: 'article:modified_time', content: modifiedTime })
      }
      if (author) {
        meta.push({ property: 'article:author', content: author })
      }
      tags.forEach(tag => {
        meta.push({ property: 'article:tag', content: tag })
      })
    }

    // Links
    const link = [
      { rel: 'canonical', href: canonicalUrl },
    ]

    // Schema.org structured data
    const script: any[] = []
    
    if (schema) {
      script.push({
        type: 'application/ld+json',
        children: JSON.stringify(schema),
      })
    }

    // Set head
    useHead({
      title: fullTitle,
      meta,
      link,
      script,
    })
  }

  const generateBlogSchema = (blog: any) => {
    return {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: blog.title,
      description: blog.content?.substring(0, 160),
      image: blog.image || `${config.public.siteUrl}/og-image.jpg`,
      datePublished: blog.createdAt,
      dateModified: blog.updatedAt,
      author: {
        '@type': 'Person',
        name: blog.author || 'Patrick Cheruitot',
        url: config.public.siteUrl,
      },
      publisher: {
        '@type': 'Organization',
        name: config.public.siteName,
        logo: {
          '@type': 'ImageObject',
          url: `${config.public.siteUrl}/logo.png`,
        },
      },
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': `${config.public.siteUrl}/blog/${blog._id}`,
      },
    }
  }

  const generatePortfolioSchema = (portfolio: any) => {
    return {
      '@context': 'https://schema.org',
      '@type': 'CreativeWork',
      name: portfolio.title,
      description: portfolio.description,
      image: portfolio.image,
      author: {
        '@type': 'Person',
        name: 'Patrick Cheruitot',
        url: config.public.siteUrl,
      },
      dateCreated: portfolio.createdAt,
      keywords: portfolio.technologies?.join(', '),
      url: portfolio.link,
    }
  }

  const generateBreadcrumbSchema = (items: BreadcrumbItem[]) => {
    return {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: items.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: item.name,
        item: `${config.public.siteUrl}${item.path}`,
      })),
    }
  }

  const generatePersonSchema = () => {
    return {
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: 'Patrick Cheruitot',
      jobTitle: 'Full Stack Developer',
      url: config.public.siteUrl,
      sameAs: [
        'https://github.com/patrickcheruitot',
        'https://linkedin.com/in/patrickcheruitot',
        'https://twitter.com/patrickcheruitot',
      ],
      knowsAbout: [
        'Web Development',
        'Full Stack Development',
        'JavaScript',
        'TypeScript',
        'Vue.js',
        'Nuxt.js',
        'React',
        'Node.js',
      ],
    }
  }

  return {
    setPageSEO,
    generateBlogSchema,
    generatePortfolioSchema,
    generateBreadcrumbSchema,
    generatePersonSchema,
  }
}

interface SEOOptions {
  title?: string
  description?: string
  image?: string
  type?: 'website' | 'article' | 'profile'
  author?: string
  publishedTime?: string
  modifiedTime?: string
  tags?: string[]
  schema?: any
}

interface BreadcrumbItem {
  name: string
  path: string
}