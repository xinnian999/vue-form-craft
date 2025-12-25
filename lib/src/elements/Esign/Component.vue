<template>
  <template v-if="read || value">
    <div>
      <div class="vfc-esign-preview"><img :src="value" alt="未签名" /></div>
      <Button v-if="!read" :disabled @click="handleClear" type="primary">重写</Button>
    </div>
  </template>

  <div v-else class="vfc-esign">
    <FormRender v-model="actionValues" :schema="actionSchema" class="vfc-esign-actions" />

    <VueEsign
      class="vfc-esign-canvas"
      ref="esign"
      :width
      :height
      :isCrop
      :lineWidth="actionValues.lineWidth"
      :lineColor="actionValues.lineColor"
      :bgColor="actionValues.bgColor"
      :format
    />

    <div>
      <Button v-if="oldValue" :disabled @click="value = oldValue" plain type="primary">取消</Button>
      <Button :disabled @click="handleReset" plain type="primary">清空</Button>
      <Button :disabled @click="handleGenerate" type="primary">保存</Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { FormRender } from '@/components'
import { useFormInstance, useUI } from '@/hooks'
import type { FormSchema } from '@/types'
import VueEsign from './VueEsign.vue'

const { Button } = useUI()

interface Props {
  lineWidth?: number
  lineColor?: string
  bgColor?: string
  isCrop?: false
  width?: number
  height?: number
  disabled?: boolean
  format?: string
}

const props = withDefaults(defineProps<Props>(), {
  lineWidth: 6,
  lineColor: '#000000',
  bgColor: '#f6f6f6',
  resultImg: '',
  isCrop: false,
  width: 700,
  height: 300,
  format: 'image/png'
})

const esign = ref()

const formInstance = useFormInstance()

// 使用 computed 包装 getter 方法，保持响应式
const read = computed(() => formInstance?.getRead() ?? false)

const value = defineModel<string>()

const actionSchema: FormSchema = {
  size: 'small',
  labelAlign: 'right',
  items: [
    {
      component: 'Inline',
      children: [
        {
          label: '画笔粗细',
          component: 'InputNumber',
          name: 'lineWidth'
        },
        { label: '画笔颜色', component: 'ColorPicker', name: 'lineColor' },
        { label: '画板背景色', component: 'ColorPicker', name: 'bgColor' }
      ],
      props: {
        align: 'left',
        gap: 20
      },
      name: 'form-OqAi',
      style: {
        marginBottom: '10px'
      }
    }
  ]
}

const actionValues = ref({
  lineWidth: 6,
  lineColor: '#000000',
  bgColor: '#fff'
})

const handleReset = () => {
  esign.value.reset()
}

const handleGenerate = () => {
  esign.value
    .generate()
    .then((res: string) => {
      value.value = res
    })
    .catch((err: any) => {
      alert(err) // 画布没有签字时会执行这里 'Not Signned'
    })
}

const oldValue = ref('')

const handleClear = () => {
  oldValue.value = value.value!
  value.value = ''
}

onMounted(() => {
  Object.assign(actionValues.value, props)
})
</script>

<style lang="scss">
.vfc-esign {
  position: relative;
  width: 100%;
}

.vfc-esign-actions {
  #form-item {
    margin-bottom: 0 !important;
  }
}

.vfc-esign-canvas {
  min-height: 300px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-bottom: 10px;
  z-index: 10;
}

.vfc-esign-preview {
  width: 350px;
  height: 150px;
  border: 1px solid #ccc;
  border-radius: 5px;
  img {
    width: 100%;
    height: 100%;
  }

  margin-bottom: 10px;
}
</style>
