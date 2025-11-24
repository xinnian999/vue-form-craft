<template>
  <div :class="ns('style-editor')">
    <el-form :model="styleForm" label-width="120px" label-position="left" size="small">
      <el-form-item label="宽度">
        <UnitInput
          v-model="styleForm.width"
          :presets="['auto', 'inherit', 'none']"
          :units="['px', '%', 'vw', 'rem']"
          default-mode="unit"
          :default-value="100"
          default-unit="%"
        />
      </el-form-item>
      <el-form-item label="高度">
        <UnitInput
          v-model="styleForm.height"
          :presets="['auto', 'inherit', 'none']"
          :units="['px', '%', 'vh', 'rem']"
        />
      </el-form-item>

      <MarginInput
        v-model="styleForm.margin"
        label="外边距"
        :presets="['auto', '0']"
        :units="['px', '%', 'em', 'rem']"
        default-mode="unit"
        :default-value="0"
        default-unit="px"
      />

      <MarginInput
        v-model="styleForm.padding"
        label="内边距"
        :presets="['0']"
        :units="['px', '%', 'em', 'rem']"
        default-mode="unit"
        :default-value="0"
        default-unit="px"
      />

      <!-- 边框 -->
      <el-divider content-position="left">边框</el-divider>
      <el-form-item label="边框宽度">
        <UnitInput v-model="styleForm.borderWidth" :presets="['0']" :units="['px', 'em', 'rem']" />
      </el-form-item>
      <el-form-item label="边框样式">
        <el-select v-model="styleForm.borderStyle" placeholder="请选择" clearable>
          <el-option label="无" value="none" />
          <el-option label="实线" value="solid" />
          <el-option label="虚线" value="dashed" />
          <el-option label="点线" value="dotted" />
          <el-option label="双线" value="double" />
        </el-select>
      </el-form-item>
      <el-form-item label="边框颜色">
        <el-color-picker v-model="styleForm.borderColor" show-alpha />
      </el-form-item>
      <el-form-item label="圆角">
        <UnitInput
          v-model="styleForm.borderRadius"
          :presets="['0']"
          :units="['px', '%', 'em', 'rem']"
        />
      </el-form-item>

      <!-- 背景 -->
      <el-divider content-position="left">背景</el-divider>
      <el-form-item label="背景颜色">
        <el-color-picker v-model="styleForm.backgroundColor" show-alpha />
      </el-form-item>
      <el-form-item label="背景图片">
        <el-input v-model="styleForm.backgroundImage" placeholder="url(...)" clearable />
      </el-form-item>
      <el-form-item label="背景大小">
        <el-select v-model="styleForm.backgroundSize" placeholder="请选择" clearable>
          <el-option label="自动" value="auto" />
          <el-option label="覆盖" value="cover" />
          <el-option label="包含" value="contain" />
        </el-select>
      </el-form-item>
      <el-form-item label="背景位置">
        <el-input v-model="styleForm.backgroundPosition" placeholder="center" clearable />
      </el-form-item>
      <el-form-item label="背景重复">
        <el-select v-model="styleForm.backgroundRepeat" placeholder="请选择" clearable>
          <el-option label="重复" value="repeat" />
          <el-option label="不重复" value="no-repeat" />
          <el-option label="水平重复" value="repeat-x" />
          <el-option label="垂直重复" value="repeat-y" />
        </el-select>
      </el-form-item>

      <!-- 文字 -->
      <el-divider content-position="left">文字</el-divider>
      <el-form-item label="字体大小">
        <UnitInput
          v-model="styleForm.fontSize"
          :presets="['inherit']"
          :units="['px', 'em', 'rem', '%']"
        />
      </el-form-item>
      <el-form-item label="字体粗细">
        <el-select v-model="styleForm.fontWeight" placeholder="请选择" clearable>
          <el-option label="正常" value="normal" />
          <el-option label="加粗" value="bold" />
          <el-option label="100" value="100" />
          <el-option label="200" value="200" />
          <el-option label="300" value="300" />
          <el-option label="400" value="400" />
          <el-option label="500" value="500" />
          <el-option label="600" value="600" />
          <el-option label="700" value="700" />
          <el-option label="800" value="800" />
          <el-option label="900" value="900" />
        </el-select>
      </el-form-item>
      <el-form-item label="文字颜色">
        <el-color-picker v-model="styleForm.color" show-alpha />
      </el-form-item>
      <el-form-item label="行高">
        <UnitInput
          v-model="styleForm.lineHeight"
          :presets="['normal', 'inherit']"
          :units="['px', 'em', 'rem', '%']"
        />
      </el-form-item>
      <el-form-item label="文字对齐">
        <el-select v-model="styleForm.textAlign" placeholder="请选择" clearable>
          <el-option label="左对齐" value="left" />
          <el-option label="居中" value="center" />
          <el-option label="右对齐" value="right" />
          <el-option label="两端对齐" value="justify" />
        </el-select>
      </el-form-item>
      <el-form-item label="文字装饰">
        <el-select v-model="styleForm.textDecoration" placeholder="请选择" clearable>
          <el-option label="无" value="none" />
          <el-option label="下划线" value="underline" />
          <el-option label="删除线" value="line-through" />
          <el-option label="上划线" value="overline" />
        </el-select>
      </el-form-item>

      <!-- 显示 -->
      <el-divider content-position="left">显示</el-divider>
      <el-form-item label="显示方式">
        <el-select v-model="styleForm.display" placeholder="请选择" clearable>
          <el-option label="块级" value="block" />
          <el-option label="行内" value="inline" />
          <el-option label="行内块" value="inline-block" />
          <el-option label="弹性盒子" value="flex" />
          <el-option label="网格" value="grid" />
          <el-option label="隐藏" value="none" />
        </el-select>
      </el-form-item>
      <el-form-item label="定位">
        <el-select v-model="styleForm.position" placeholder="请选择" clearable>
          <el-option label="静态" value="static" />
          <el-option label="相对" value="relative" />
          <el-option label="绝对" value="absolute" />
          <el-option label="固定" value="fixed" />
          <el-option label="粘性" value="sticky" />
        </el-select>
      </el-form-item>
      <el-form-item label="上偏移">
        <UnitInput
          v-model="styleForm.top"
          :presets="['auto', '0']"
          :units="['px', '%', 'em', 'rem']"
        />
      </el-form-item>
      <el-form-item label="右偏移">
        <UnitInput
          v-model="styleForm.right"
          :presets="['auto', '0']"
          :units="['px', '%', 'em', 'rem']"
        />
      </el-form-item>
      <el-form-item label="下偏移">
        <UnitInput
          v-model="styleForm.bottom"
          :presets="['auto', '0']"
          :units="['px', '%', 'em', 'rem']"
        />
      </el-form-item>
      <el-form-item label="左偏移">
        <UnitInput
          v-model="styleForm.left"
          :presets="['auto', '0']"
          :units="['px', '%', 'em', 'rem']"
        />
      </el-form-item>
      <el-form-item label="层级">
        <el-input-number v-model="styleForm.zIndex" :controls="true" />
      </el-form-item>
      <el-form-item label="透明度">
        <el-slider v-model="styleForm.opacity" :min="0" :max="1" :step="0.1" show-input />
      </el-form-item>
      <el-form-item label="溢出">
        <el-select v-model="styleForm.overflow" placeholder="请选择" clearable>
          <el-option label="可见" value="visible" />
          <el-option label="隐藏" value="hidden" />
          <el-option label="滚动" value="scroll" />
          <el-option label="自动" value="auto" />
        </el-select>
      </el-form-item>

      <!-- Flex布局 -->
      <el-divider content-position="left">Flex布局</el-divider>
      <el-form-item label="主轴方向">
        <el-select v-model="styleForm.flexDirection" placeholder="请选择" clearable>
          <el-option label="水平" value="row" />
          <el-option label="水平反向" value="row-reverse" />
          <el-option label="垂直" value="column" />
          <el-option label="垂直反向" value="column-reverse" />
        </el-select>
      </el-form-item>
      <el-form-item label="主轴对齐">
        <el-select v-model="styleForm.justifyContent" placeholder="请选择" clearable>
          <el-option label="起点" value="flex-start" />
          <el-option label="终点" value="flex-end" />
          <el-option label="居中" value="center" />
          <el-option label="两端对齐" value="space-between" />
          <el-option label="环绕对齐" value="space-around" />
          <el-option label="均匀分布" value="space-evenly" />
        </el-select>
      </el-form-item>
      <el-form-item label="交叉轴对齐">
        <el-select v-model="styleForm.alignItems" placeholder="请选择" clearable>
          <el-option label="拉伸" value="stretch" />
          <el-option label="起点" value="flex-start" />
          <el-option label="终点" value="flex-end" />
          <el-option label="居中" value="center" />
          <el-option label="基线" value="baseline" />
        </el-select>
      </el-form-item>
      <el-form-item label="换行">
        <el-select v-model="styleForm.flexWrap" placeholder="请选择" clearable>
          <el-option label="不换行" value="nowrap" />
          <el-option label="换行" value="wrap" />
          <el-option label="反向换行" value="wrap-reverse" />
        </el-select>
      </el-form-item>
      <el-form-item label="间距">
        <UnitInput v-model="styleForm.gap" :presets="['0']" :units="['px', 'em', 'rem', '%']" />
      </el-form-item>

      <!-- 其他 -->
      <el-divider content-position="left">其他</el-divider>
      <el-form-item label="光标样式">
        <el-select v-model="styleForm.cursor" placeholder="请选择" clearable>
          <el-option label="默认" value="default" />
          <el-option label="指针" value="pointer" />
          <el-option label="文本" value="text" />
          <el-option label="移动" value="move" />
          <el-option label="禁止" value="not-allowed" />
          <el-option label="等待" value="wait" />
        </el-select>
      </el-form-item>
      <el-form-item label="阴影">
        <el-input v-model="styleForm.boxShadow" placeholder="0 0 10px rgba(0,0,0,0.1)" clearable />
      </el-form-item>
      <el-form-item label="过渡">
        <el-input v-model="styleForm.transition" placeholder="all 0.3s" clearable />
      </el-form-item>
      <el-form-item label="变换">
        <el-input v-model="styleForm.transform" placeholder="translate(0, 0)" clearable />
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { reactive, watch } from 'vue'
import { ns } from '@/utils'
import MarginInput from './MarginInput.vue'
import UnitInput from './UnitInput.vue'

defineOptions({
  name: 'StyleEditor'
})

const modelValue = defineModel()

// 内部维护响应式对象
const styleForm = reactive<Record<string, any>>({})

// 初始化：modelValue -> styleForm
watch(
  () => modelValue.value,
  (newVal) => {
    if (newVal) {
      Object.assign(styleForm, newVal)
    }
  },
  { immediate: true, deep: true }
)

// 深度监听styleForm变化，实时同步到modelValue
watch(
  styleForm,
  (newVal) => {
    modelValue.value = { ...newVal }
  },
  { deep: true }
)
</script>

<style lang="scss" scoped>
@import '@/style.scss';

@include ns('style-editor') {
  overflow-y: auto;
  overflow-x: hidden;
  width: 100%;

  :deep(.el-divider__text) {
    font-weight: bold;
    color: $textColor1;
  }

  :deep(.el-form-item) {
    margin-bottom: 16px;
  }

  :deep(.el-color-picker) {
    width: 100%;
  }

  :deep(.el-input-number) {
    width: 100%;
  }
}
</style>
