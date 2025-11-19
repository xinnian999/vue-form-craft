<template>
  <div :class="ns('margin-input')">
    <!-- 统一边距 -->
    <div :class="ns('margin-input__unified')">
      <el-button
        text
        :icon="expanded ? ArrowDown : ArrowRight"
        :class="ns('margin-input__toggle')"
        @click="toggleExpand"
      />
      <span :class="ns('margin-input__label')">{{ label }}</span>
      <UnitInput
        v-model="unifiedValue"
        :presets="presets"
        :units="units"
        :default-mode="defaultMode"
        :default-value="defaultValue"
        :default-unit="defaultUnit"
        :class="ns('margin-input__unified-input')"
        @update:model-value="handleUnifiedChange"
      />
    </div>

    <!-- 四个方向的子边距 -->
    <div v-if="expanded" :class="ns('margin-input__details')">
      <div :class="ns('margin-input__row')">
        <div :class="ns('margin-input__item')">
          <span :class="ns('margin-input__icon')">↑</span>
          <UnitInput
            v-model="topValue"
            :presets="presets"
            :units="units"
            :default-mode="defaultMode"
            :default-value="defaultValue"
            :default-unit="defaultUnit"
            @update:model-value="handleChildChange"
          />
        </div>
        <div :class="ns('margin-input__item')">
          <span :class="ns('margin-input__icon')">→</span>
          <UnitInput
            v-model="rightValue"
            :presets="presets"
            :units="units"
            :default-mode="defaultMode"
            :default-value="defaultValue"
            :default-unit="defaultUnit"
            @update:model-value="handleChildChange"
          />
        </div>
      </div>
      <div :class="ns('margin-input__row')">
        <div :class="ns('margin-input__item')">
          <span :class="ns('margin-input__icon')">↓</span>
          <UnitInput
            v-model="bottomValue"
            :presets="presets"
            :units="units"
            :default-mode="defaultMode"
            :default-value="defaultValue"
            :default-unit="defaultUnit"
            @update:model-value="handleChildChange"
          />
        </div>
        <div :class="ns('margin-input__item')">
          <span :class="ns('margin-input__icon')">←</span>
          <UnitInput
            v-model="leftValue"
            :presets="presets"
            :units="units"
            :default-mode="defaultMode"
            :default-value="defaultValue"
            :default-unit="defaultUnit"
            @update:model-value="handleChildChange"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ArrowDown, ArrowRight } from '@element-plus/icons-vue'
import { ref, watch } from 'vue'
import { ns } from '@/utils'
import UnitInput from './UnitInput.vue'

defineOptions({
  name: 'MarginInput'
})

interface Props {
  label?: string
  presets?: string[]
  units?: string[]
  defaultMode?: 'preset' | 'unit'
  defaultValue?: number
  defaultUnit?: string
}

const props = withDefaults(defineProps<Props>(), {
  label: '边距',
  presets: () => ['auto', '0'],
  units: () => ['px', '%', 'em', 'rem'],
  defaultMode: 'unit',
  defaultValue: 0,
  defaultUnit: 'px'
})

// 接收CSS margin字符串，如 "20px" 或 "20px 10px 20px 10px"
const modelValue = defineModel<string>({ default: '' })

const expanded = ref(false)
const unifiedValue = ref('')
const topValue = ref('')
const rightValue = ref('')
const bottomValue = ref('')
const leftValue = ref('')

// 是否正在同步（防止循环更新）
const isSyncing = ref(false)

// 切换展开/收起
const toggleExpand = () => {
  expanded.value = !expanded.value
}

// 解析CSS margin字符串
const parseMargin = (margin: string) => {
  if (!margin) return { top: '', right: '', bottom: '', left: '' }

  const parts = margin.trim().split(/\s+/)

  if (parts.length === 1) {
    // 一个值：四个方向相同
    return { top: parts[0], right: parts[0], bottom: parts[0], left: parts[0] }
  } else if (parts.length === 2) {
    // 两个值：上下 左右
    return { top: parts[0], right: parts[1], bottom: parts[0], left: parts[1] }
  } else if (parts.length === 3) {
    // 三个值：上 左右 下
    return { top: parts[0], right: parts[1], bottom: parts[2], left: parts[1] }
  } else if (parts.length === 4) {
    // 四个值：上 右 下 左
    return { top: parts[0], right: parts[1], bottom: parts[2], left: parts[3] }
  }

  return { top: '', right: '', bottom: '', left: '' }
}

// 组合CSS margin字符串
const composeMargin = (top: string, right: string, bottom: string, left: string): string => {
  if (!top && !right && !bottom && !left) return ''

  // 如果四个值相同
  if (top && top === right && top === bottom && top === left) {
    return top
  }

  // 如果上下相同，左右相同
  if (top === bottom && right === left) {
    return `${top} ${right}`
  }

  // 四个值都不同
  return `${top} ${right} ${bottom} ${left}`
}

// 初始化：从modelValue读取值
const initValues = () => {
  const parsed = parseMargin(modelValue.value)
  topValue.value = parsed.top
  rightValue.value = parsed.right
  bottomValue.value = parsed.bottom
  leftValue.value = parsed.left

  // 检查四个值是否相同
  if (
    topValue.value &&
    topValue.value === rightValue.value &&
    topValue.value === bottomValue.value &&
    topValue.value === leftValue.value
  ) {
    unifiedValue.value = topValue.value
  } else {
    unifiedValue.value = ''
  }
}

// 统一边距改变
const handleUnifiedChange = (value: string) => {
  if (isSyncing.value) return
  isSyncing.value = true

  // 同步到四个子边距
  topValue.value = value
  rightValue.value = value
  bottomValue.value = value
  leftValue.value = value

  // 更新modelValue
  modelValue.value = value

  isSyncing.value = false
}

// 子边距改变
const handleChildChange = () => {
  if (isSyncing.value) return
  isSyncing.value = true

  // 清空统一边距
  unifiedValue.value = ''

  // 组合成CSS字符串
  const composed = composeMargin(
    topValue.value,
    rightValue.value,
    bottomValue.value,
    leftValue.value
  )
  modelValue.value = composed

  // 检查是否四个值相同，如果相同则同步到统一边距
  if (
    topValue.value &&
    topValue.value === rightValue.value &&
    topValue.value === bottomValue.value &&
    topValue.value === leftValue.value
  ) {
    unifiedValue.value = topValue.value
  }

  isSyncing.value = false
}

// 监听modelValue变化（外部修改）
watch(
  () => modelValue.value,
  () => {
    if (!isSyncing.value) {
      initValues()
    }
  },
  { immediate: true }
)
</script>

<style lang="scss" scoped>
@import '@/style.scss';

@include ns('margin-input') {
  margin-bottom: 16px;
  font-size: 12px;
  .vfc-margin-input__unified {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .vfc-margin-input__toggle {
    padding: 4px;
    min-width: auto;
    height: auto;
  }

  .vfc-margin-input__label {
    min-width: 120px;
    color: $textColor1;
    font-size: 12px;
  }

  .vfc-margin-input__unified-input {
    flex: 1;
  }

  .vfc-margin-input__details {
    margin-top: 12px;
    padding: 12px;
    background: $bgColor3;
    border-radius: 4px;
  }

  .vfc-margin-input__row {
    display: flex;
    gap: 12px;

    &:not(:last-child) {
      margin-bottom: 12px;
    }
  }

  .vfc-margin-input__item {
    flex: 1;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .vfc-margin-input__icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 24px;
    color: $textColor3;
    font-size: 12px;
    font-weight: bold;
  }
}
</style>
