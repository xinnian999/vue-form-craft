<template>
  <div class="vfc-codeHighLight">
    <div class="vfc-codeHighLight-copy" @click="handleCopy">
      <icon-render name="copy" />
    </div>
    <div class="vfc-codeHighLight-content" v-html="html" />
  </div>
</template>

<script setup lang="ts">
import { IconRender } from '@vue-form-craft/components'
import { ElMessage } from 'element-plus'
import { codeToHtml } from 'shiki'
import { onMounted, ref } from 'vue'

const props = withDefaults(
  defineProps<{
    code: string
    language?: string
  }>(),
  {
    language: 'js'
  }
)

const handleCopy = async () => {
  try {
    await navigator.clipboard.writeText(props.code)
    ElMessage.success('已成功复制到剪贴板')
  } catch (error) {
    ElMessage.error('复制文本到剪贴板时出错')
  }
}

const html = ref('')

onMounted(async () => {
  html.value = await codeToHtml(props.code, {
    lang: props.language,
    theme: 'github-light'
  })
})
</script>

<style lang="less">
.vfc-codeHighLight {
  position: relative;
  overflow: auto;

  &:hover &-copy {
    opacity: 1;
  }

  &-copy {
    transition: 0.5s all;
    opacity: 0;
    position: absolute;
    right: 15px;
    top: 15px;
    width: 40px;
    height: 40px;
    border: 1px solid #c0bebe;
    font-size: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 7px;
    color: #999;
    cursor: pointer;
    &:hover {
      background-color: #fff;
    }
  }

  &-content {
    overflow: auto;
    height: 100%;
    background-color: #f6f6f7;
    padding: 15px;
    border-radius: 10px;
    pre {
      margin: 0;
      background-color: transparent!important;
    }
  }
}
</style>
