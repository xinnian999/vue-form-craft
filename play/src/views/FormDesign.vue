<template>
  <div class="design">
    <uiToggle style="margin: 5px" />
    <FormDesign
      v-model="schema"
      class="form-design"
      @save="onSave"
      @add="onAdd"
      ref="formDesignRef"
    />
  </div>
</template>

<script setup lang="ts">
import { ElMessage } from 'element-plus'
import type { FormElement, FormSchema } from 'formora'
import { onMounted, ref } from 'vue'
import uiToggle from '../components/uiToggle.vue'

const formDesignRef = ref()

const schema = ref<FormSchema>({})

const onSave = () => {
  localStorage.setItem('schema', JSON.stringify(schema.value))
  ElMessage.success('保存成功')
}

const onAdd = (element: FormElement) => {
  console.log('onAdd===>', element)
}

onMounted(() => {
  const localSchema = localStorage.getItem('schema')
  if (localSchema) {
    schema.value = JSON.parse(localSchema)
    formDesignRef.value?.recordHistory('回显保存的表单')
  }
})
</script>

<style lang="scss" scoped>
.design {
  height: 100vh;
  display: flex;
  flex-direction: column;

  .form-design {
    flex: 1;
    overflow: hidden;
  }
}
</style>
