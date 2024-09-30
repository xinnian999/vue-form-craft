<template>
  <div class="vfc-codeHighLight">
    <div class="vfc-codeHighLight-copy" @click="handleCopy">
      <icon-render name="copy" />
    </div>
    <highlightjs class="vfc-codeHighLight-content" language="js" :code="code" />
  </div>
</template>

<script setup lang="ts">
import { IconRender } from '@vue-form-craft/components'
import { ElMessage } from 'element-plus'

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
</script>

<style lang="less">
.vfc-codeHighLight {
  position: relative;
  overflow: auto;

  &:hover &-copy {
    opacity: 1;
  }
  pre {
    margin: 0;
  }
  &-copy {
    transition: 0.5s all;
    opacity: 0;
    position: absolute;
    right: 15px;
    top: 15px;
    width: 40px;
    height: 40px;
    border: 1px solid #999;
    font-size: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 7px;
    color: #fff;
    cursor: pointer;
    &:hover {
      color: var(--el-color-primary);
    }
  }

  &-content {
    overflow: auto;
    height: 100%;
  }
}
</style>
