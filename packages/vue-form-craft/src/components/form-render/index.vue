<template>
  <el-form
    :class="ns('form')"
    :model="formValues"
    :label-position="schema.labelAlign"
    ref="formRef"
    v-bind="{ ...$attrs, ...schema }"
  >
    <slot />

    <FormItemGroup :list="formItems" :empty-text="locale.canvas.emptyTip" :empty-size="18" />

    <el-form-item v-if="!design && !read">
      <el-button v-if="schema.submitBtn" type="primary" @click="instance.submit" name="submit-btn">
        提交
      </el-button>
      <el-button v-if="schema.resetBtn" @click="() => instance.resetFields()" name="reset-btn">
        重置
      </el-button>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import type { FormRenderEmits, FormRenderProps, FormSchema } from '@vue-form-craft/core'
import { FormItemGroup, ns, useFormRender, useLocale } from '@vue-form-craft/core'

const props = defineProps<FormRenderProps>()

const emits = defineEmits<FormRenderEmits>()

// 注意：默认值必须使用工厂函数返回新对象，避免跨实例共享
const formValues = defineModel<Record<string, any>>({ default: () => reactive({}) })

const schema = defineModel<FormSchema>('schema', {
  default: () =>
    reactive({
      labelWidth: 150,
      labelAlign: 'right',
      scrollToError: true,
      size: 'default',
      items: []
    })
})

const locale = useLocale()

const { instance, formItems, formRef } = useFormRender({
  props,
  emits,
  schema,
  formValues
})

defineExpose(instance)
</script>
