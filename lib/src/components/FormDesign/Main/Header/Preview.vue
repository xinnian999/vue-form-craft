<template>
  <Modal
    v-model="visible"
    title="预览"
    width="70%"
    center
    destroyOnClose
    :to="`.${ns('form-design')}`"
    top="10vh"
    @close="formValues = {}"
  >
    <FormRender
      v-model="formValues"
      class="preview-FormRender"
      :schema="designInstance.getSchema()"
      ref="formRef"
      @finish="handleFinish"
    />
  </Modal>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { FormRender } from '@/components'
import { useDesignInstance, useUI } from '@/hooks'
import type { FormInstance } from '@/types'
import { ns } from '@/utils'

const { Modal } = useUI()

const designInstance = useDesignInstance()!

const formRef = ref<FormInstance>()

const formValues = ref({})

const visible = defineModel<boolean>()

const handleFinish = async () => {
  alert(JSON.stringify(formValues.value, null, 2))
}
</script>
