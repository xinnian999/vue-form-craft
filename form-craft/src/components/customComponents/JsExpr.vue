<template>
  <div>
    <el-button type="primary" plain size="small" @click="visible = true">JS表达式</el-button>
    <el-dialog
      v-model="visible"
      title="JS表达式"
      append-to-body
      destroy-on-close
      @close="expr = modelValue"
    >
      <el-input v-model="expr" type="textarea" />
      <template #footer>
        <el-button @click="visible = false">取消</el-button>
        <el-button type="primary" @click="handleSave">保存</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'

const modelValue = defineModel<string>()

const visible = ref<boolean>()

const expr = ref<string>()

onMounted(() => {
  expr.value = modelValue.value
})

const handleSave = () => {
  modelValue.value = expr.value
  visible.value = false
}
</script>
