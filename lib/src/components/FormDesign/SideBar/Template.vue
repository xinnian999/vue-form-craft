<template>
  <div :class="ns('template-list')">
    <Tree :data="templates" :default-expand-all="true" node-key="label">
      <template #default="{ data }">
        <div class="catalog" v-if="data.children">
          <Icon name="catalog" />
          <span> {{ data.label }}</span>
        </div>
        <div class="form" v-else>
          <div class="form-header">
            <Icon name="form" />
            <span>{{ data.label }}</span>
            <Icon name="edit" class="edit" @click="useTemplate(data)" />
          </div>
          <div class="form-description" v-if="data.description">
            {{ data.description }}
          </div>
        </div>
      </template>
    </Tree>
  </div>
</template>

<script setup lang="ts">
import { Icon, Tree } from '@/components'
import { useDesignInstance } from '@/hooks'
import templates from '@/templates'
import { ns, repirJsonSchema } from '@/utils'

const designInstance = useDesignInstance()!

const useTemplate = (template: any) => {
  const schema = repirJsonSchema(template.schema)
  designInstance.setSchema(schema)
  designInstance.setCurrentKey('root')
  designInstance.recordHistory(`使用模板-${template.label}`)
}
</script>

<style lang="scss">
@import '@/style';

@include ns('template-list') {
  .title {
    font-size: 14px;
    font-weight: bold;
    margin: 5px 0px;
  }
  .description {
    font-size: 12px;
    color: #999;
    margin: 5px 0px;
    margin-bottom: 20px;
  }

  .catalog {
    display: flex;
    align-items: center;
    gap: 5px;
  }
  .form {
    padding: 5px 0;
    width: 100%;
    .form-header {
      display: flex;
      align-items: center;
      gap: 5px;
      .edit {
        cursor: pointer;
        margin-left: auto;
        font-size: 18px;
      }
    }
    .form-description {
      font-size: 12px;
      color: #999;
      // padding-right: 20px;
      margin-top: 5px;
      white-space: wrap;
    }
  }
}
</style>
