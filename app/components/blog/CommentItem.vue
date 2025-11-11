<script setup lang="ts">
const props = defineProps<{
  comment: any
  blogId: string
  level: number
  editingId: string | null
  editText: string
  replyingTo: string | null
  replyText: string
  currentUserName: string
  formatDate: (date: string) => string
}>()

const emit = defineEmits<{
  startEdit: [comment: any]
  cancelEdit: []
  updateComment: [commentId: string]
  deleteComment: [commentId: string]
  startReply: [commentId: string]
  cancelReply: []
  submitReply: [parentCommentId: string]
  toggleLike: [commentId: string]
  'update:editText': [value: string]
  'update:replyText': [value: string]
}>()

const isCollapsed = ref(false)
const showOptions = ref(false)
const maxLevel = 15

const likeCount = computed(() => props.comment.likes?.length || 0)
const isEdited = computed(() => props.comment.updatedAt !== props.comment.createdAt)
</script>

<template>
  <div :class="['relative', level > 0 ? 'ml-8 pl-4' : '']">
    <!-- Thread Line -->
    <div
      v-if="level > 0"
      class="absolute left-0 top-0 h-full w-0.5 cursor-pointer bg-border hover:bg-primary/50"
      @click="isCollapsed = !isCollapsed"
    />

    <div class="flex gap-3">
      <!-- Vote Section -->
      <div class="flex flex-col items-center gap-1">
        <button
          @click="$emit('toggleLike', comment._id)"
          class="rounded p-1 transition-colors hover:bg-muted"
          :class="{ 'text-red-500': false }"
        >
          <Icon name="lucide:chevron-up" class="h-5 w-5" />
        </button>
        <span class="text-sm font-bold">{{ likeCount }}</span>
        <button
          @click="$emit('toggleLike', comment._id)"
          class="rounded p-1 transition-colors hover:bg-muted"
        >
          <Icon name="lucide:chevron-down" class="h-5 w-5" />
        </button>
      </div>

      <!-- Comment Content -->
      <div class="flex-1">
        <!-- Comment Header -->
        <div class="mb-2 flex items-center gap-2 text-sm">
          <button
            @click="isCollapsed = !isCollapsed"
            class="rounded p-1 transition-colors hover:bg-muted"
          >
            <Icon
              :name="isCollapsed ? 'lucide:plus-square' : 'lucide:minus-square'"
              class="h-4 w-4 text-muted-foreground"
            />
          </button>
          <span class="font-semibold">{{ comment.name }}</span>
          <span class="text-muted-foreground">
            {{ formatDate(comment.createdAt) }}
            <span v-if="isEdited" class="ml-1">(edited)</span>
          </span>

          <!-- Options Menu -->
          <div v-if="currentUserName === comment.name" class="relative ml-auto">
            <button
              @click="showOptions = !showOptions"
              class="rounded p-1 transition-colors hover:bg-muted"
            >
              <Icon name="lucide:more-horizontal" class="h-4 w-4" />
            </button>
            <div
              v-if="showOptions"
              class="absolute right-0 z-10 mt-1 rounded-lg border border-border bg-card shadow-lg"
            >
              <button
                @click="$emit('startEdit', comment); showOptions = false"
                class="block w-full px-4 py-2 text-left text-sm hover:bg-muted"
              >
                Edit
              </button>
              <button
                @click="$emit('deleteComment', comment._id); showOptions = false"
                class="block w-full px-4 py-2 text-left text-sm text-destructive hover:bg-destructive/10"
              >
                Delete
              </button>
            </div>
          </div>
        </div>

        <!-- Comment Body -->
        <div v-if="!isCollapsed">
          <!-- Edit Mode -->
          <div v-if="editingId === comment._id" class="space-y-3">
            <textarea
              :value="editText"
              @input="$emit('update:editText', ($event.target as HTMLTextAreaElement).value)"
              rows="3"
              class="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
            <div class="flex gap-2">
              <button
                @click="$emit('updateComment', comment._id)"
                class="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:opacity-90"
              >
                Save
              </button>
              <button
                @click="$emit('cancelEdit')"
                class="rounded-lg border border-border px-4 py-2 text-sm font-semibold hover:bg-muted"
              >
                Cancel
              </button>
            </div>
          </div>

          <!-- Display Mode -->
          <div v-else>
            <p class="mb-3 text-sm leading-relaxed whitespace-pre-wrap">{{ comment.content }}</p>

            <!-- Actions -->
            <div class="flex items-center gap-4 text-xs text-muted-foreground">
              <button
                v-if="level < maxLevel"
                @click="$emit('startReply', comment._id)"
                class="flex items-center gap-1 rounded px-2 py-1 transition-colors hover:bg-muted hover:text-foreground"
              >
                <Icon name="lucide:message-circle" class="h-3 w-3" />
                Reply
              </button>
            </div>

            <!-- Reply Form -->
            <div v-if="replyingTo === comment._id" class="mt-3 space-y-3">
              <textarea
                :value="replyText"
                @input="$emit('update:replyText', ($event.target as HTMLTextAreaElement).value)"
                rows="3"
                placeholder="Write your reply..."
                class="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
              <div class="flex gap-2">
                <button
                  @click="$emit('submitReply', comment._id)"
                  class="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:opacity-90"
                >
                  Reply
                </button>
                <button
                  @click="$emit('cancelReply')"
                  class="rounded-lg border border-border px-4 py-2 text-sm font-semibold hover:bg-muted"
                >
                  Cancel
                </button>
              </div>
            </div>

            <!-- Nested Replies -->
            <div v-if="comment.replies?.length > 0" class="mt-4 space-y-4">
              <CommentItem
                v-for="reply in comment.replies"
                :key="reply._id"
                :comment="reply"
                :blog-id="blogId"
                :level="level + 1"
                :editing-id="editingId"
                :edit-text="editText"
                :replying-to="replyingTo"
                :reply-text="replyText"
                :current-user-name="currentUserName"
                :format-date="formatDate"
                @start-edit="$emit('startEdit', $event)"
                @cancel-edit="$emit('cancelEdit')"
                @update-comment="$emit('updateComment', $event)"
                @delete-comment="$emit('deleteComment', $event)"
                @start-reply="$emit('startReply', $event)"
                @cancel-reply="$emit('cancelReply')"
                @submit-reply="$emit('submitReply', $event)"
                @toggle-like="$emit('toggleLike', $event)"
                @update:edit-text="$emit('update:editText', $event)"
                @update:reply-text="$emit('update:replyText', $event)"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>