<template>
  <div>
    <Button type="primary" plain size="small" @click="visible = true">编辑</Button>
    <Modal
      v-model="visible"
      title="表单初始值"
      append-to-body
      destroy-on-close
      @close="handleClose"
    >
      <FormRender
        v-model="initialValues"
        :schema="{ ...designInstance.getSchema(), submitBtn: false, resetBtn: false }"
      ></FormRender>
      <template #footer>
        <div style="display: flex; justify-content: center">
          <Button @click="handleClear">清空</Button>
          <Button type="primary" @click="handleSave">保存</Button>
        </div>
      </template>
    </Modal>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { FormRender } from '@/components'
import { useDesignInstance, useUI } from '@/hooks'

const { Button, Modal } = useUI()

const modelValue = defineModel()

const visible = ref<boolean>()

const designInstance = useDesignInstance()!

const initialValues = ref()

onMounted(() => {
  initialValues.value = modelValue.value
})

const handleSave = () => {
  modelValue.value = initialValues.value
  visible.value = false
}

const handleClose = () => {
  initialValues.value = modelValue.value
}

const handleClear = () => {
  initialValues.value = {}
}
</script>
