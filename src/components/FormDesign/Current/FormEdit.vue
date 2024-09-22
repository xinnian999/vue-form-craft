<template>
  <div class="attrForm">
    <FormRender v-model="form" :schema="formOptions"></FormRender>
  </div>
</template>

<script setup>
import { computed, inject } from 'vue'
import { FormRender } from '@/components'
import { $schema } from '@/config/symbol'
import formOptions from './formOptions'

const { schema, updateSchema } = inject($schema)

//修改schema除了items的其他属性
const form = computed({
  get() {
    return schema.value
  },
  set(value) {
    updateSchema(value)
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
