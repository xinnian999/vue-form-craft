<template>
  <div :class="ns('unit-input')">
    <!-- 当前是预设值模式 -->
    <Button
      v-if="currentMode === 'preset'"
      :class="ns('unit-input__preset-btn')"
      @click="switchMode"
    >
      {{ currentValue }}
    </Button>

    <!-- 当前是单位模式 -->
    <div v-else :class="ns('unit-input__unit-mode')">
      <el-input-number
        v-model="numericValue"
        :class="ns('unit-input__number')"
        @change="handleNumberChange"
        controlsPosition="right"
      />
      <Button :class="ns('unit-input__unit-btn')" @click="switchMode">
        {{ currentUnit }}
      </Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useUI } from '@/hooks'
import { ns } from '@/utils'

const { Button } = useUI()

defineOptions({
  name: 'UnitInput'
})

interface Props {
  presets?: string[] // 预设值，如 ['auto', 'inherit', 'none']
  units?: string[] // 可用单位，如 ['px', '%', 'em', 'rem', 'vh', 'vw']
  defaultMode?: 'preset' | 'unit' // 默认模式
  defaultValue?: number // 默认数字值（当defaultMode为unit时使用）
  defaultUnit?: string // 默认单位（当defaultMode为unit时使用）
}

const props = withDefaults(defineProps<Props>(), {
  presets: () => ['auto', 'inherit'],
  units: () => ['px', '%', 'em', 'rem'],
  defaultMode: 'preset',
  defaultValue: 0,
  defaultUnit: undefined
})

const modelValue = defineModel<string>({ default: '' })

// 当前模式：preset（预设值）或 unit（单位）
const currentMode = ref<'preset' | 'unit'>('preset')
// 当前预设值索引
const currentPresetIndex = ref(0)
// 当前单位索引
const currentUnitIndex = ref(0)
// 数字值
const numericValue = ref(0)

// 当前显示的值
const currentValue = computed(() => {
  if (currentMode.value === 'preset') {
    return props.presets[currentPresetIndex.value]
  }
  return `${numericValue.value}${currentUnit.value}`
})

// 当前单位
const currentUnit = computed(() => props.units[currentUnitIndex.value])

// 初始化：解析modelValue
const parseValue = (value: string) => {
  if (!value) {
    // 使用默认值
    currentMode.value = props.defaultMode
    if (props.defaultMode === 'unit') {
      numericValue.value = props.defaultValue
      // 设置默认单位
      if (props.defaultUnit) {
        const unitIndex = props.units.indexOf(props.defaultUnit)
        currentUnitIndex.value = unitIndex !== -1 ? unitIndex : 0
      } else {
        currentUnitIndex.value = 0
      }
    } else {
      currentPresetIndex.value = 0
    }
    return
  }

  // 检查是否是预设值
  const presetIndex = props.presets.indexOf(value)
  if (presetIndex !== -1) {
    currentMode.value = 'preset'
    currentPresetIndex.value = presetIndex
    return
  }

  // 解析数字+单位
  const match = value.match(/^(-?\d+\.?\d*)(.*)$/)
  if (match) {
    const [, num, unit] = match
    numericValue.value = parseFloat(num) || 0

    // 查找单位索引
    const unitIndex = props.units.indexOf(unit)
    if (unitIndex !== -1) {
      currentUnitIndex.value = unitIndex
    }

    currentMode.value = 'unit'
  } else {
    // 无法解析，使用默认值
    currentMode.value = props.defaultMode
    currentPresetIndex.value = 0
  }
}

// 切换模式
const switchMode = () => {
  if (currentMode.value === 'preset') {
    // 从预设值切换到下一个预设值或单位
    if (currentPresetIndex.value < props.presets.length - 1) {
      currentPresetIndex.value++
    } else {
      // 切换到单位模式
      currentMode.value = 'unit'
      currentPresetIndex.value = 0
      numericValue.value = 0
      currentUnitIndex.value = 0
    }
  } else {
    // 从单位切换到下一个单位或回到预设值
    if (currentUnitIndex.value < props.units.length - 1) {
      currentUnitIndex.value++
    } else {
      // 切换回预设值模式
      currentMode.value = 'preset'
      currentUnitIndex.value = 0
      currentPresetIndex.value = 0
    }
  }

  // 更新modelValue
  updateModelValue()
}

// 数字改变时
const handleNumberChange = () => {
  updateModelValue()
}

// 更新modelValue
const updateModelValue = () => {
  modelValue.value = currentValue.value
}

// 监听modelValue变化（外部修改）
watch(
  () => modelValue.value,
  (newVal) => {
    parseValue(newVal)
  },
  { immediate: true }
)
</script>

<style lang="scss" scoped>
@import '@/style.scss';

@include ns('unit-input') {
  display: flex;
  width: 100%;

  .vfc-unit-input__preset-btn {
    flex: 1;
    width: 100%;
    color: $primaryColor;
    border-color: $primaryColor;
    background: transparent;

    &:hover {
      color: $primaryColor;
      border-color: $primaryColor;
      background: rgba($primaryColor, 0.1);
    }
  }

  .vfc-unit-input__unit-mode {
    display: flex;
    width: 100%;
    gap: 8px;
  }

  .vfc-unit-input__number {
    flex: 1;
  }

  .vfc-unit-input__unit-btn {
    min-width: 48px;
    color: $primaryColor;
    border-color: $primaryColor;
    background: transparent;

    &:hover {
      color: $primaryColor;
      border-color: $primaryColor;
      background: rgba($primaryColor, 0.1);
    }
  }
}
</style>
