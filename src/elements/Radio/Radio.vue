<template>
  <div v-if="!currentOptions.length && !loading" style="font-size: 12px">暂无选项</div>
  <el-radio-group v-model="selectVal" @change="selectChange" v-el-loading="loading" v-bind="$attrs">
    <el-space wrap :direction="direction" :size="[space, space]" alignment="normal">
      <template v-if="optionType === 'circle' || optionType === 'border'">
        <el-radio
          v-for="item in currentOptions"
          :key="item[valueKey]"
          :label="item[valueKey]"
          :border="optionType === 'border'"
          >{{ item[labelKey] }}</el-radio
        >
      </template>

      <template v-else>
        <el-radio-button
          v-for="item in currentOptions"
          :key="item[valueKey]"
          :label="item[valueKey]"
          :size="$attrs.size"
          >{{ item[labelKey] }}
        </el-radio-button>
      </template>
    </el-space>
  </el-radio-group>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
import { ElRadioGroup, ElRadio, ElRadioButton, ElSpace } from 'element-plus'
import useSelect from '@/hooks/useSelect'
import type { Direction, OptionType, SchemaApi } from '@/config/commonType'

const props = withDefaults(
  defineProps<{
    options?: Array<Record<string, any>>
    multiple?: boolean
    mode?: string
    labelKey?: string
    valueKey?: string
    autoSelectedFirst?: boolean
    api?: SchemaApi
    name?: string
    optionType?: OptionType
    direction?: Direction
    space?: number
  }>(),
  {
    options: () => [],
    multiple: false,
    mode: 'static',
    labelKey: 'label',
    valueKey: 'value',
    autoSelectedFirst: false,
    name: '',
    optionType: 'circle',
    direction: 'horizontal',
    space: 20
  }
)

const { selectVal, currentOptions, selectChange, loading } = useSelect(props)
</script>

<style lang="scss" scoped></style>
