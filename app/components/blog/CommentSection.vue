<script setup lang="ts">
import type { Comment } from '~/composables/useApi'

const props = defineProps<{
  blogId: string
  comments: Comment[]
}>()

const emit = defineEmits<{
  refresh: []
}>()

const { comments: commentsApi } = useApi()

// Form state
const newComment = ref({
  name: '',
  email: '',
  content: ''
})

const isSubmitting = ref(false)
const submitError = ref('')
const submitSuccess = ref(false)

// Edit state
const editingId = ref<string | null>(null)
const editText = ref('')

// Reply state
const replyingTo = ref<string | null>(null)
const replyText = ref('')

// Organize comments into a tree structure
const organizeComments = (comments: Comment[]) => {
  const commentMap = new Map()
  const rootComments: any[] = []

  // Create a map of all comments with empty replies array
  comments?.forEach(comment => {
    commentMap.set(comment._id, { ...comment, replies: [] })
  })

  // Build the tree structure
  comments?.forEach(comment => {
    if (comment.parentComment) {
      const parent = commentMap.get(comment.parentComment)
      if (parent) {
        parent.replies.push(commentMap.get(comment._id))
      }
    } else {
      rootComments.push(commentMap.get(comment._id))
    }
  })

  return rootComments
}

// Sort comments by date (newest first) and organize into tree
const organizedComments = computed(() => {
  const sorted = [...props.comments].sort((a, b) => 
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  )
  return organizeComments(sorted)
})

// Submit new comment
const submitComment = async () => {
  if (!newComment.value.name || !newComment.value.email || !newComment.value.content) {
    submitError.value = 'Please fill in all fields'
    return
  }

  if (!isValidEmail(newComment.value.email)) {
    submitError.value = 'Please enter a valid email address'
    return
  }

  isSubmitting.value = true
  submitError.value = ''
  submitSuccess.value = false

  try {
    await commentsApi.create(props.blogId, {
      name: newComment.value.name,
      email: newComment.value.email,
      content: newComment.value.content
    } as any)

    // Reset form
    newComment.value = {
      name: '',
      email: '',
      content: ''
    }

    submitSuccess.value = true
    emit('refresh')

    setTimeout(() => {
      submitSuccess.value = false
    }, 3000)
  } catch (error: any) {
    submitError.value = error.message || 'Failed to submit comment. Please try again.'
  } finally {
    isSubmitting.value = false
  }
}

// Submit reply
const submitReply = async (parentCommentId: string) => {
  if (!replyText.value.trim()) {
    return
  }

  try {
    await commentsApi.create(props.blogId, {
      name: newComment.value.name || 'Anonymous',
      email: newComment.value.email || 'noreply@example.com',
      content: replyText.value,
      parentComment: parentCommentId
    } as any)

    replyText.value = ''
    replyingTo.value = null
    emit('refresh')
  } catch (error: any) {
    submitError.value = error.message || 'Failed to submit reply'
  }
}

// Start editing a comment
const startEdit = (comment: Comment) => {
  editingId.value = comment._id
  editText.value = comment.content
}

// Cancel editing
const cancelEdit = () => {
  editingId.value = null
  editText.value = ''
}

// Update comment
const updateComment = async (commentId: string) => {
  if (!editText.value.trim()) {
    return
  }

  try {
    await commentsApi.update(props.blogId, commentId, { content: editText.value })
    editingId.value = null
    editText.value = ''
    emit('refresh')
  } catch (error: any) {
    submitError.value = error.message || 'Failed to update comment'
  }
}

// Delete comment
const deleteComment = async (commentId: string) => {
  if (!confirm('Are you sure you want to delete this comment?')) {
    return
  }

  try {
    await commentsApi.delete(props.blogId, commentId)
    emit('refresh')
  } catch (error: any) {
    submitError.value = error.message || 'Failed to delete comment'
  }
}

// Like/Unlike comment
const toggleLike = async (commentId: string) => {
  try {
    // This would need to be implemented in your API
    // await commentsApi.toggleLike(props.blogId, commentId)
    emit('refresh')
  } catch (error: any) {
    console.error('Failed to toggle like:', error)
  }
}

// Email validation
const isValidEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// Format date
const formatDate = (date: string) => {
  const diff = new Date().getTime() - new Date(date).getTime()
  const hours = Math.floor(diff / (1000 * 60 * 60))
  const days = Math.floor(hours / 24)
  const months = Math.floor(days / 30)
  const years = Math.floor(days / 365)

  if (hours < 1) return 'just now'
  if (hours < 24) return `${hours} hour${hours > 1 ? 's' : ''} ago`
  if (days < 30) return `${days} day${days > 1 ? 's' : ''} ago`
  if (months < 12) return `${months} month${months > 1 ? 's' : ''} ago`
  return `${years} year${years > 1 ? 's' : ''} ago`
}
</script>

<template>
  <section class="border-t border-border pt-12">
    <h2 class="mb-8 text-3xl font-bold">
      Comments ({{ comments.length }})
    </h2>

    <!-- Comment Form -->
    <div class="mb-12 rounded-xl border border-border bg-card p-6">
      <h3 class="mb-6 text-xl font-semibold">Leave a Comment</h3>

      <!-- Success Message -->
      <div
        v-if="submitSuccess"
        class="mb-6 flex items-center gap-3 rounded-lg bg-green-500/10 p-4 text-green-600 dark:text-green-400"
      >
        <Icon name="lucide:check-circle" class="h-5 w-5" />
        <span>Comment submitted successfully!</span>
      </div>

      <!-- Error Message -->
      <div
        v-if="submitError"
        class="mb-6 flex items-center gap-3 rounded-lg bg-destructive/10 p-4 text-destructive"
      >
        <Icon name="lucide:alert-circle" class="h-5 w-5" />
        <span>{{ submitError }}</span>
      </div>

      <form @submit.prevent="submitComment" class="space-y-4">
        <div class="grid gap-4 md:grid-cols-2">
          <!-- Name Input -->
          <div>
            <label for="name" class="mb-2 block text-sm font-medium">
              Name <span class="text-destructive">*</span>
            </label>
            <input
              id="name"
              v-model="newComment.name"
              type="text"
              required
              placeholder="Your name"
              class="w-full rounded-lg border border-border bg-background px-4 py-3 transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>

          <!-- Email Input -->
          <div>
            <label for="email" class="mb-2 block text-sm font-medium">
              Email <span class="text-destructive">*</span>
            </label>
            <input
              id="email"
              v-model="newComment.email"
              type="email"
              required
              placeholder="your@email.com"
              class="w-full rounded-lg border border-border bg-background px-4 py-3 transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>
        </div>

        <!-- Comment Textarea -->
        <div>
          <label for="comment" class="mb-2 block text-sm font-medium">
            Comment <span class="text-destructive">*</span>
          </label>
          <textarea
            id="comment"
            v-model="newComment.content"
            required
            rows="5"
            placeholder="What are your thoughts?"
            class="w-full rounded-lg border border-border bg-background px-4 py-3 transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>

        <!-- Submit Button -->
        <div class="flex justify-end">
          <button
            type="submit"
            :disabled="isSubmitting"
            class="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 font-semibold text-primary-foreground transition-all hover:scale-105 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Icon
              :name="isSubmitting ? 'lucide:loader-2' : 'lucide:send'"
              class="h-5 w-5"
              :class="{ 'animate-spin': isSubmitting }"
            />
            {{ isSubmitting ? 'Submitting...' : 'Post Comment' }}
          </button>
        </div>

        <p class="text-sm text-muted-foreground">
          Your email will not be published. Required fields are marked *
        </p>
      </form>
    </div>

    <!-- Comments List -->
    <div v-if="organizedComments.length > 0" class="space-y-4">
      <CommentItem
        v-for="comment in organizedComments"
        :key="comment._id"
        :comment="comment"
        :blog-id="blogId"
        :level="0"
        :editing-id="editingId"
        :edit-text="editText"
        :replying-to="replyingTo"
        :reply-text="replyText"
        :current-user-name="newComment.name"
        :format-date="formatDate"
        @start-edit="startEdit"
        @cancel-edit="cancelEdit"
        @update-comment="updateComment"
        @delete-comment="deleteComment"
        @start-reply="(id) => replyingTo = id"
        @cancel-reply="replyingTo = null"
        @submit-reply="submitReply"
        @toggle-like="toggleLike"
        @update:edit-text="editText = $event"
        @update:reply-text="replyText = $event"
      />
    </div>

    <!-- Empty State -->
    <div v-else class="rounded-xl border border-border bg-muted/30 p-12 text-center">
      <Icon name="lucide:message-circle" class="mx-auto mb-4 h-16 w-16 text-muted-foreground/50" />
      <p class="text-lg font-semibold">No comments yet</p>
      <p class="mt-2 text-sm text-muted-foreground">
        Be the first to share your thoughts!
      </p>
    </div>
  </section>
</template>