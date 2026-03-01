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


const formValues = ref({})

const visible = defineModel<boolean>()

const handleFinish = async () => {
  console.log(formValues.value)
  alert(JSON.stringify(formValues.value, null, 2))
}
</script>
