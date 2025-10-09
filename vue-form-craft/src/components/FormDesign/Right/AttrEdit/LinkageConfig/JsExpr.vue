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
      <FormRender v-model="designInstance.current!" :schema="editSchema" class="edit" />
    </div>
  </el-dialog>
</template>

<script setup lang="ts">
import { FormRender } from '@/components'
import { useDesignInstance } from '@/hooks'
import type { FormSchema } from '@/types'

const designInstance = useDesignInstance()

const visible = defineModel<boolean>()

const editSchema = {
  labelWidth: 100,
  labelAlign: 'top',
  items: [
    {
      label: '',
      component: 'JsonEdit',
      designKey: 'design-A2bj',
      name: '.',
      hideLabel: true,
      props: {
        style: {
          height: '70vh'
        }
      }
    }
  ]
} satisfies FormSchema
</script>

<style lang="scss" scoped>
.config-linkages {
  display: flex;
  gap: 15px;
  flex-direction: column;
}
</style>
