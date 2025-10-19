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
          href="https://xinnian999.github.io/form-craft/zh/linkage.html#js表达式"
          target="_blank"
          >VueFormCraft表单联动</el-link
        >
      </p>
      <!-- @vue-generic {import('@/types').FormItemType} -->
      <JsonSchemaEdit :json="designInstance.current!" @save="onSave" />
    </div>
  </el-dialog>
</template>

<script setup lang="ts">
import { JsonSchemaEdit } from '@/components'
import { useDesignInstance } from '@/hooks'
import type { FormItemType } from '@/types'
import { repirItems } from '@/utils'

const designInstance = useDesignInstance()

const visible = defineModel<boolean>()

const onSave = (json: FormItemType) => {
  const [repirJson] = repirItems([json])
  designInstance.updateCurrent(repirJson)
}
</script>

<style lang="scss" scoped>
.config-linkages {
  display: flex;
  gap: 15px;
  flex-direction: column;
}
</style>
