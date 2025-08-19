<template>
  <template v-if="formInstance.design || !hidden">
    <div v-if="config.type === 'layout'" :class="[ns('form-item'), thisProps.class]" :style="style">
      <component :is="config.render" v-bind="formItemProps" />
    </div>

    <a-form-item
      v-else
      :class="[ns('form-item'), thisProps.class, `${component}-${name}`]"
      :style="style"
      :key="name"
      :name="name"
      :laba-width="hideLabel ? '0' : formInstance.schema.labelWidth"
      :rules="computeRules"
    >
      <template #label v-if="!hideLabel">
        <div :class="[ns('form-item-label'), label && `${name}-label`]">
          <div :style="formInstance.schema.labelBold && 'font-weight: bold'">{{ label }}</div>
          <div :class="ns('form-item-laba-ico')" v-if="help">
            <a-tooltip effect="dark">
              <template #title>
                {{ help }}
              </template>
              <Icon name="help" />
            </a-tooltip>
          </div>
          <div :class="ns('form-item-laba-suffix')" v-if="formInstance.schema.labelSuffix">
            {{ formInstance.schema.labelSuffix }}
          </div>
        </div>
      </template>

      <!-- 弹窗展示复杂组件 -->
      <template v-if="dialog">
        <a-modal
          v-model:open="dialogState.visible"
          :title="dialogState.title"
          width="70%"
          centered
          destroy-on-close
          :footer="null"
        >
          <component
            :is="config.render"
            :disabled="formInstance.schema.disabled"
            :size="formInstance.schema.size"
            v-bind="formItemProps"
            v-model:[config.modelName!]="value"
          />
        </a-modal>

        <a-button type="primary" plain @click="handleDialog">配置</a-button>
      </template>

      <component
        v-else
        :is="config.render"
        :disabled="formInstance.schema.disabled"
        :size="formInstance.schema.size"
        v-bind="formItemProps"
        v-model:[config.modelName!]="value"
      />
    </a-form-item>
  </template>
</template>

<script setup lang="ts">
import { Icon, tools, useFormItem, type FormItemType } from '@form-magic/core'

const thisProps = defineProps<FormItemType>()

const { value, computeRules, config, formItemProps, dialogState, handleDialog, formInstance } =
  useFormItem(thisProps)

const { ns } = tools
</script>
