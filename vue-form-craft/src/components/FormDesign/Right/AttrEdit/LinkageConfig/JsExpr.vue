<template>
  <el-dialog
    destroy-on-close
    v-model="visible"
    top="3vh"
    :title="`${designInstance.current?.label} - JS表达式`"
    width="70vw"
    center
  >
    <div class="config-linkages">
      <p>
        《JS表达式》使用方法请参考：<el-link
          type="primary"
          href="https://xinnian999.github.io/vue-form-craft/zh/linkage.html#js表达式"
          target="_blank"
          >VueFormCraft表单联动</el-link
        >
      </p>
      <!-- @vue-generic {import('@/types').FormItemType} -->
      <JsonSchemaEdit
        :json="designInstance.current!"
        :customGetCompletionItems="customGetCompletionItems"
        @save="onSave"
      />
    </div>
  </el-dialog>
</template>

<script setup lang="ts">
import { JsonSchemaEdit } from '@/components'
import { FORM_ITEM_CONFIG_ITEMS } from '@/config'
import { useDesignInstance } from '@/hooks'
import type { FormItemType } from '@/types'
import type { GetCompletionItems } from '@/types/complete'
import { isAtRootLevel, isInKeyPosition } from '@/utils'

const designInstance = useDesignInstance()

const visible = defineModel<boolean>()

const customGetCompletionItems: GetCompletionItems = ({ session, pos, beforeCursor }) => {
  // 在 key 位置
  if (isInKeyPosition(beforeCursor)) {
    // 优先判断是否在根层级（表单全局配置）
    if (isAtRootLevel(session, pos, beforeCursor)) {
      return FORM_ITEM_CONFIG_ITEMS
    }

    // 其他层级（items 内部的深层嵌套）：不提供配置项补全
    return []
  }
  return []
}

const onSave = (json: FormItemType) => {
  designInstance.updateCurrentKey(json.designKey!)
}
</script>

<style lang="scss" scoped>
.config-linkages {
  display: flex;
  gap: 15px;
  flex-direction: column;
}
</style>
