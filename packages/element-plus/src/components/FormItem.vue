<template>
  <template v-if="formInstance.design || !hidden">
    <div v-if="config.type === 'layout'" :class="[ns('form-item'), thisProps.class]" :style="style">
      <component :is="config.render" v-bind="formItemProps" />
    </div>

    <el-form-item
      v-else
      :class="[ns('form-item'), thisProps.class, `${component}-${name}`]"
      :style="style"
      :key="name"
      :prop="name"
      :label-width="hideLabel ? '0' : formInstance.schema.labelWidth"
      :rules="computeRules"
    >
      <template #label v-if="!hideLabel">
        <div :class="[ns('form-item-label'), label && `${name}-label`]">
          <div :style="formInstance.schema.labelBold && 'font-weight: bold'">{{ label }}</div>
          <el-tooltip effect="dark" :content="help" v-if="help">
            <Icon name="help" />
          </el-tooltip>
          <div :class="ns('form-item-label-suffix')" v-if="formInstance.schema.labelSuffix">
            {{ formInstance.schema.labelSuffix }}
          </div>
        </div>
      </template>

      <!-- 弹窗展示复杂组件 -->
      <template v-if="dialog">
        <el-dialog
          v-model="dialogState.visible"
          :title="dialogState.title"
          width="70%"
          center
          destroy-on-close
        >
          <component
            :is="config.render"
            :disabled="formInstance.schema.disabled"
            :size="formInstance.schema.size"
            v-bind="formItemProps"
            v-model:[config.modelName!]="value"
          />
        </el-dialog>

        <el-button type="primary" plain @click="handleDialog">配置</el-button>
      </template>

      <component
        v-else
        :is="config.render"
        :disabled="formInstance.schema.disabled"
        :size="formInstance.schema.size"
        v-bind="formItemProps"
        v-model:[config.modelName!]="value"
      />
    </el-form-item>
  </template>
</template>

<script setup lang="ts">
import { Icon, tools, useFormItem, type FormItemType } from '@form-magic/core'

const thisProps = defineProps<FormItemType>()

const { value, computeRules, config, formItemProps, dialogState, handleDialog, formInstance } =
  useFormItem(thisProps)

const { ns } = tools
</script>
