<template>
  <div class="attrForm">
    <schema-form v-model="form" :schema="formOptions"></schema-form>
  </div>
</template>

<script setup lang="jsx">
import { computed, inject } from 'vue'
import { SchemaForm } from '@/components'
import { $schema } from '@/components/symbol'
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
