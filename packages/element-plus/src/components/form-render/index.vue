<template>
  <el-form
    :model="formValues"
    :label-position="schema.labelAlign"
    :size="schema.size"
    :disabled="schema.disabled"
    :hide-required-asterisk="schema.hideRequiredAsterisk"
    :scroll-to-error="schema.scrollToError"
    ref="formRef"
    v-bind="$attrs"
  >
    <slot />

    <FormItemGroup :list="formItems" :empty-text="locale.canvas.emptyTip" :empty-size="18" />
    <Footer />
  </el-form>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import type { FormRenderEmits, FormRenderProps, FormSchema } from '@form-magic/core'
import Footer from './Footer.vue'
import { FormItemGroup } from '@/components'
import { useFormRender, useLocale } from '@form-magic/core'

const props = defineProps<FormRenderProps>()

const emits = defineEmits<FormRenderEmits>()

const formValues = defineModel<Record<string, any>>({ default: reactive({}) })

const schema = defineModel<FormSchema>('schema', {
  default: reactive({
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
