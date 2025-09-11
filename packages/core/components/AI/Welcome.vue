<template>
  <div class="welcome">
    <div class="title">Vue Form Craft 表单助手</div>
    <div class="desc">
      您好！我是智能表单助手。我可以帮你快速生成 or 修改表单。祝您高效完成表单设计！
    </div>
    <div class="prompt-title">可以试着问我： <span @click="refresh">换一组</span></div>
    <ul class="prompts">
      <li
        class="prompt-item"
        v-for="prompt in prompts"
        :key="prompt"
        @click="handleItemClick(prompt)"
      >
        {{ prompt }}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'

const emit = defineEmits(['itemClick'])

const promptData = [
  '生成一个登录表单',
  '生成一个就诊满意度表单',
  '生成一个订单表单',
  '生成一个调查表单',
  '生成一个注册表单',
  '生成一个问卷表单',
  '生成一个评分表单',
  '生成一个投票表单',
  '生成一个支付表单',
  '生成一个抽奖表单'
]

const prompts = ref<string[]>([])

const refresh = () => {
  prompts.value = promptData.sort(() => 0.5 - Math.random()).slice(0, 3)
}

const handleItemClick = (prompt: string) => {
  emit('itemClick', prompt)
}

onMounted(() => {
  refresh()
})
</script>
