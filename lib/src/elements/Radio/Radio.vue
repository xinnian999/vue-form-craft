<template>
  <div v-if="formInstance.read">
    {{ currentOptions.find((item) => item.value === value)?.label }}
  </div>
  <template v-else>
    <div v-if="!currentOptions.length && !loading" style="font-size: 12px">暂无选项</div>
    <el-radio-group v-model="value" @change="selectChange" v-loading="loading" v-bind="$attrs">
      <el-space wrap :direction="direction" :size="[space, space]" alignment="normal">
        <template v-if="optionType === 'circle' || optionType === 'border'">
          <el-radio
            v-for="item in currentOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
            :disabled="item.disabled"
            :border="optionType === 'border'"
          >
            <slot :option="item" :value="value">
              {{ item.label }}
            </slot>
          </el-radio>
        </template>

        <template v-else>
          <el-radio-button
            v-for="item in currentOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
            :disabled="item.disabled"
            v-bind="$attrs"
          >
            <slot :option="item" :value="value">
              {{ item.label }}
            </slot>
          </el-radio-button>
        </template>
      </el-space>
    </el-radio-group>
  </template>
</template>

<script setup lang="ts">
import { watch } from 'vue'
import { useFormInstance, useSelect } from '@/hooks'
import type { Direction, OptionType, SelectProps, SelectValue } from '@/types'

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
  space: 20
})

const value = defineModel<SelectValue>({ default: '' })

const formInstance = useFormInstance()

const { currentOptions, selectChange, loading } = useSelect(props)

watch(value, selectChange)
</script>
