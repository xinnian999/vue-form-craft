<template>
  <div class="attrForm">
    <FormRender v-model="form" :schema="formOptions"></FormRender>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { FormRender } from '@vue-form-craft/components'
import formOptions from './formOptions'
import { useDesignInstance } from '@vue-form-craft/hooks';

const designInstance = useDesignInstance()

//修改schema除了items的其他属性
const form = computed({
  get() {
    return designInstance.schema
  },
  set(value) {
    designInstance.updateSchema(value)
  }
})
</script>

<style scoped lang="less">
.attrForm {
  height: 100%;
  overflow: auto;
  h3 {
    margin-bottom: 10px;
  }
}
</style>
