<template>
  <div class="template-list">
    <div class="title">表单模板</div>
    <div class="description">用于管理和切换表单模板，方便在不同业务场景中快速切换和配置表单。</div>
    <el-tree style="max-width: 600px" :data="templates">
      <template #default="{ data }">
        <div class="catalog" v-if="data.children">
          <Icon name="catalog" />
          <span> {{ data.label }}</span>
        </div>
        <div class="form" v-else>
          <div class="form-header">
            <Icon name="form" />
            <span>{{ data.label }}</span>
            <Icon name="edit" class="edit" @click="useTemplate(data.schema)" />
          </div>
          <div class="form-description" v-if="data.description">
            {{ data.description }}
          </div>
        </div>
      </template>
    </el-tree>
  </div>
</template>

<script setup lang="ts">
import { useDesignInstance } from '@/hooks'
import Icon from '@/Icon/index.vue'
import templates from '@/templates'

const designInstance = useDesignInstance()

const useTemplate = (schema: any) => {
  designInstance.setSchema(schema)
}
</script>
