<template>
  <div v-if="formInstance.read">
    {{ value?.map((item) => currentOptions.find((v) => v.value === item)?.label).join('、') }}
  </div>
  <template v-else>
    <div v-if="!currentOptions.length && !loading" style="font-size: 12px">暂无选项</div>

    <el-checkbox-group v-bind="$attrs" v-model="value" @change="selectChange" v-loading="loading">
      <template v-if="optionType === 'circle' || optionType === 'border'">
        <el-checkbox
          v-for="item in currentOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
          :border="optionType === 'border'"
        />
      </template>

      <el-space v-if="optionType === 'button'" wrap :size="[space, space]">
        <el-checkbox-button
          v-for="item in currentOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
          size="large"
        />
      </el-space>
    </el-checkbox-group>
  </template>
</template>

<script setup lang="ts">
import { type CheckboxGroupValueType } from 'element-plus'
import { watch } from 'vue'
import { useFormInstance, useSelect } from '@/hooks'
import type { Direction, OptionType, SelectProps } from '@/types'

type Props = Omit<SelectProps, 'multiple'> & {
  optionType?: OptionType
  direction?: Direction
  space?: number
}

const props = withDefaults(defineProps<Props>(), {
  options: () => [],
  mode: 'static',
  name: '',
  optionType: 'circle',
  direction: 'horizontal',
  space: 20,
  multiple: true
})

const value = defineModel<CheckboxGroupValueType>()

const formInstance = useFormInstance()

const { currentOptions, selectChange, loading } = useSelect(props)

watch(value, selectChange)
</script>
