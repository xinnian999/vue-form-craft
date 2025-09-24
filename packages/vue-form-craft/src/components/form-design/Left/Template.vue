<template>
  <div class="template-list">
    <div class="title">表单模板</div>
    <div class="description">用于管理和切换表单模板，方便在不同业务场景中快速切换和配置表单。</div>
    <el-space wrap alignment="center">
      <el-button :key="name" v-for="{ name, schema } in templates" @click="useTemplate(schema)">
        {{ name }}
      </el-button>
    </el-space>
  </div>
</template>

<script setup lang="ts">
import { template } from '@/config'
import { useDesignInstance } from '@vue-form-craft/core'

const designInstance = useDesignInstance()

const templates = designInstance.templates?.length ? designInstance.templates : template

const useTemplate = (schema: any) => {
  designInstance.updateSchema(schema)
}
</script>
