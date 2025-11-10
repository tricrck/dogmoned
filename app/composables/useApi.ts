export const useApi = () => {
  const config = useRuntimeConfig()
  const baseURL = config.public.apiBase

  const api = $fetch.create({
    baseURL,
    headers: {
      'Content-Type': 'application/json',
    },
    onRequest({ options }) {
      // Add auth token if needed
      const token = useCookie('auth_token')
      if (token.value) {
        options.headers = {
          ...(options.headers as any),
          Authorization: `Bearer ${token.value}`,
        }
      }
    },
    onResponseError({ response }) {
      console.error('API Error:', response._data)
    },
  })

  return {
    // Portfolio endpoints
    portfolio: {
      getAll: () => api<Portfolio[]>('/portfolio'),
      getById: (id: string) => api<Portfolio>(`/portfolio/${id}`),
      search: (query: string) => api<Portfolio[]>(`/portfolio/search/${query}`),
      create: (data: Partial<Portfolio>) => api<Portfolio>('/portfolio', {
        method: 'POST',
        body: data,
      }),
      update: (id: string, data: Partial<Portfolio>) => api<Portfolio>(`/portfolio/${id}`, {
        method: 'PUT',
        body: data,
      }),
      delete: (id: string) => api(`/portfolio/${id}`, {
        method: 'DELETE',
      }),
    },

    // Blog endpoints
    blog: {
      getAll: () => api<Blog[]>('/blogs'),
      getById: (id: string) => api<Blog>(`/blogs/${id}`),
      create: (data: Partial<Blog>) => api<Blog>('/blogs', {
        method: 'POST',
        body: data,
      }),
      update: (id: string, data: Partial<Blog>) => api<Blog>(`/blogs/${id}`, {
        method: 'PUT',
        body: data,
      }),
      delete: (id: string) => api(`/blogs/${id}`, {
        method: 'DELETE',
      }),
    },

    // Comment endpoints
    comments: {
      getAll: (blogId: string) => api<Comment[]>(`/blogs/${blogId}/comments`),
      create: (blogId: string, data: Partial<Comment>) => api<Comment>(`/blogs/${blogId}/comments`, {
        method: 'POST',
        body: data,
      }),
      update: (blogId: string, commentId: string, data: Partial<Comment>) => 
        api<Comment>(`/blogs/${blogId}/comments/${commentId}`, {
          method: 'PUT',
          body: data,
        }),
      delete: (blogId: string, commentId: string) => 
        api(`/blogs/${blogId}/comments/${commentId}`, {
          method: 'DELETE',
        }),
      like: (blogId: string, commentId: string, userId: string) => 
        api(`/blogs/${blogId}/comments/${commentId}/like`, {
          method: 'POST',
          body: { userId },
        }),
      unlike: (blogId: string, commentId: string, userId: string) => 
        api(`/blogs/${blogId}/comments/${commentId}/unlike`, {
          method: 'POST',
          body: { userId },
        }),
    },

    // Testimonial endpoints
    testimonials: {
      getAll: () => api<Testimonial[]>('/testimonials'),
      getById: (id: string) => api<Testimonial>(`/testimonials/${id}`),
      search: (query: string) => api<Testimonial[]>(`/testimonials/search/${query}`),
      create: (data: Partial<Testimonial>) => api<Testimonial>('/testimonials', {
        method: 'POST',
        body: data,
      }),
      update: (id: string, data: Partial<Testimonial>) => api<Testimonial>(`/testimonials/${id}`, {
        method: 'PUT',
        body: data,
      }),
      delete: (id: string) => api(`/testimonials/${id}`, {
        method: 'DELETE',
      }),
    },

    // User endpoints
    users: {
      getAll: () => api<User[]>('/users'),
      getByUid: (uid: string) => api<User>(`/users/${uid}`),
      create: (data: Partial<User>) => api<User>('/users', {
        method: 'POST',
        body: data,
      }),
    },
  }
}

// Types
export interface Portfolio {
  _id: string
  title: string
  role: string
  description: string
  technologies: string[]
  link: string
  image: string
  skills: string[]
  createdAt: string
  updatedAt: string
}

export interface Blog {
  _id: string
  title: string
  content: string
  author: string
  comments: string[] | Comment[]
  createdAt: string
  updatedAt: string
}

export interface Comment {
  _id: string
  blog: string
  content: string
  author: string
  parentComment: string | null
  replies: string[] | Comment[]
  likes: string[]
  createdAt: string
  updatedAt: string
}

export interface Testimonial {
  _id: string
  name: string
  testimonial: string
  designation: string
  link: string
  createdAt: string
  updatedAt: string
}

export interface User {
  _id: string
  uid: string
  email: string
  displayName: string
  photoURL: string
  createdAt: string
  updatedAt: string
}