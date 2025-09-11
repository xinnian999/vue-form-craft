<template>
  <div class="bubble-list">
    <div v-for="{ role, content, loading, key } in props.list" :key="key" :class="['bubble', role]">
      <div
        class="bubble-content"
      >
        <template v-if="loading">
          <div class="loading">
            <div class="loading-loader"></div>
            <div class="loading-text">表单制作中 请稍等...</div>
          </div>
        </template>

        <template v-else>
          {{ content }}
        </template>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { BubbleItem } from './type'

const props = defineProps<{
  list: BubbleItem[]
}>()
</script>