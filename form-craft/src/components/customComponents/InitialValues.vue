<template>
  <div>
    <el-button type="primary" plain size="small" @click="visible = true">编辑</el-button>
    <el-dialog
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
        <el-button @click="visible = false">取消</el-button>
        <el-button type="primary" @click="handleSave">保存</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { FormRender } from '@/components'
import { useDesignInstance } from '@/hooks'

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
</script>
