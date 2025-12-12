<template>
  <div :class="ns('style-editor')">
    <Form :model="styleForm" :labelWidth="120" labelAlign="left" size="small">
      <FormItem label="宽度">
        <UnitInput
          v-model="styleForm.width"
          :presets="['auto', 'inherit', 'none']"
          :units="['px', '%', 'vw', 'rem']"
          default-mode="unit"
          :default-value="100"
          default-unit="%"
        />
      </FormItem>
      <FormItem label="高度">
        <UnitInput
          v-model="styleForm.height"
          :presets="['auto', 'inherit', 'none']"
          :units="['px', '%', 'vh', 'rem']"
        />
      </FormItem>

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
      <Divider contentPosition="left">边框</Divider>
      <FormItem label="边框宽度">
        <UnitInput v-model="styleForm.borderWidth" :presets="['0']" :units="['px', 'em', 'rem']" />
      </FormItem>
      <FormItem label="边框样式">
        <Select
          v-model="styleForm.borderStyle"
          placeholder="请选择"
          clearable
          :options="[
            { label: '无', value: 'none' },
            { label: '实线', value: 'solid' },
            { label: '虚线', value: 'dashed' },
            { label: '点线', value: 'dotted' },
            { label: '双线', value: 'double' }
          ]"
        />
      </FormItem>
      <FormItem label="边框颜色">
        <ColorPicker v-model="styleForm.borderColor" show-alpha />
      </FormItem>
      <FormItem label="圆角">
        <UnitInput
          v-model="styleForm.borderRadius"
          :presets="['0']"
          :units="['px', '%', 'em', 'rem']"
        />
      </FormItem>

      <!-- 背景 -->
      <Divider contentPosition="left">背景</Divider>
      <FormItem label="背景颜色">
        <ColorPicker v-model="styleForm.backgroundColor" show-alpha />
      </FormItem>
      <FormItem label="背景图片">
        <Input v-model="styleForm.backgroundImage" placeholder="url(...)" clearable />
      </FormItem>
      <FormItem label="背景大小">
        <Select
          v-model="styleForm.backgroundSize"
          placeholder="请选择"
          clearable
          :options="[
            { label: '自动', value: 'auto' },
            { label: '覆盖', value: 'cover' },
            { label: '包含', value: 'contain' }
          ]"
        />
      </FormItem>
      <FormItem label="背景位置">
        <Input v-model="styleForm.backgroundPosition" placeholder="center" clearable />
      </FormItem>
      <FormItem label="背景重复">
        <Select
          v-model="styleForm.backgroundRepeat"
          placeholder="请选择"
          clearable
          :options="[
            { label: '重复', value: 'repeat' },
            { label: '不重复', value: 'no-repeat' },
            { label: '水平重复', value: 'repeat-x' },
            { label: '垂直重复', value: 'repeat-y' }
          ]"
        />
      </FormItem>

      <!-- 文字 -->
      <Divider contentPosition="left">文字</Divider>
      <FormItem label="字体大小">
        <UnitInput
          v-model="styleForm.fontSize"
          :presets="['inherit']"
          :units="['px', 'em', 'rem', '%']"
        />
      </FormItem>
      <FormItem label="字体粗细">
        <Select
          v-model="styleForm.fontWeight"
          placeholder="请选择"
          clearable
          :options="[
            { label: '正常', value: 'normal' },
            { label: '加粗', value: 'bold' },
            { label: '100', value: '100' },
            { label: '200', value: '200' },
            { label: '300', value: '300' },
            { label: '400', value: '400' },
            { label: '500', value: '500' },
            { label: '600', value: '600' },
            { label: '700', value: '700' },
            { label: '800', value: '800' },
            { label: '900', value: '900' }
          ]"
        />
      </FormItem>
      <FormItem label="文字颜色">
        <ColorPicker v-model="styleForm.color" show-alpha />
      </FormItem>
      <FormItem label="行高">
        <UnitInput
          v-model="styleForm.lineHeight"
          :presets="['normal', 'inherit']"
          :units="['px', 'em', 'rem', '%']"
        />
      </FormItem>
      <FormItem label="文字对齐">
        <Select
          v-model="styleForm.textAlign"
          placeholder="请选择"
          clearable
          :options="[
            { label: '左对齐', value: 'left' },
            { label: '居中', value: 'center' },
            { label: '右对齐', value: 'right' },
            { label: '两端对齐', value: 'justify' }
          ]"
        />
      </FormItem>
      <FormItem label="文字装饰">
        <Select
          v-model="styleForm.textDecoration"
          placeholder="请选择"
          clearable
          :options="[
            { label: '无', value: 'none' },
            { label: '下划线', value: 'underline' },
            { label: '删除线', value: 'line-through' },
            { label: '上划线', value: 'overline' }
          ]"
        />
      </FormItem>

      <!-- 显示 -->
      <Divider contentPosition="left">显示</Divider>
      <FormItem label="显示方式">
        <Select
          v-model="styleForm.display"
          placeholder="请选择"
          clearable
          :options="[
            { label: '块级', value: 'block' },
            { label: '行内', value: 'inline' },
            { label: '行内块', value: 'inline-block' },
            { label: '弹性盒子', value: 'flex' },
            { label: '网格', value: 'grid' },
            { label: '隐藏', value: 'none' }
          ]"
        />
      </FormItem>
      <FormItem label="定位">
        <Select
          v-model="styleForm.position"
          placeholder="请选择"
          clearable
          :options="[
            { label: '静态', value: 'static' },
            { label: '相对', value: 'relative' },
            { label: '绝对', value: 'absolute' },
            { label: '固定', value: 'fixed' },
            { label: '粘性', value: 'sticky' }
          ]"
        />
      </FormItem>
      <FormItem label="上偏移">
        <UnitInput
          v-model="styleForm.top"
          :presets="['auto', '0']"
          :units="['px', '%', 'em', 'rem']"
        />
      </FormItem>
      <FormItem label="右偏移">
        <UnitInput
          v-model="styleForm.right"
          :presets="['auto', '0']"
          :units="['px', '%', 'em', 'rem']"
        />
      </FormItem>
      <FormItem label="下偏移">
        <UnitInput
          v-model="styleForm.bottom"
          :presets="['auto', '0']"
          :units="['px', '%', 'em', 'rem']"
        />
      </FormItem>
      <FormItem label="左偏移">
        <UnitInput
          v-model="styleForm.left"
          :presets="['auto', '0']"
          :units="['px', '%', 'em', 'rem']"
        />
      </FormItem>
      <FormItem label="层级">
        <InputNumber v-model="styleForm.zIndex" />
      </FormItem>
      <FormItem label="透明度">
        <Slider v-model="styleForm.opacity" :min="0" :max="1" :step="0.1" />
      </FormItem>
      <FormItem label="溢出">
        <Select
          v-model="styleForm.overflow"
          placeholder="请选择"
          clearable
          :options="[
            { label: '可见', value: 'visible' },
            { label: '隐藏', value: 'hidden' },
            { label: '滚动', value: 'scroll' },
            { label: '自动', value: 'auto' }
          ]"
        />
      </FormItem>

      <!-- Flex布局 -->
      <Divider contentPosition="left">Flex布局</Divider>
      <FormItem label="主轴方向">
        <Select
          v-model="styleForm.flexDirection"
          placeholder="请选择"
          clearable
          :options="[
            { label: '水平', value: 'row' },
            { label: '水平反向', value: 'row-reverse' },
            { label: '垂直', value: 'column' },
            { label: '垂直反向', value: 'column-reverse' }
          ]"
        />
      </FormItem>
      <FormItem label="主轴对齐">
        <Select
          v-model="styleForm.justifyContent"
          placeholder="请选择"
          clearable
          :options="[
            { label: '起点', value: 'flex-start' },
            { label: '终点', value: 'flex-end' },
            { label: '居中', value: 'center' },
            { label: '两端对齐', value: 'space-between' },
            { label: '环绕对齐', value: 'space-around' },
            { label: '均匀分布', value: 'space-evenly' }
          ]"
        />
      </FormItem>
      <FormItem label="交叉轴对齐">
        <Select
          v-model="styleForm.alignItems"
          placeholder="请选择"
          clearable
          :options="[
            { label: '拉伸', value: 'stretch' },
            { label: '起点', value: 'flex-start' },
            { label: '终点', value: 'flex-end' },
            { label: '居中', value: 'center' },
            { label: '基线', value: 'baseline' }
          ]"
        />
      </FormItem>
      <FormItem label="换行">
        <Select
          v-model="styleForm.flexWrap"
          placeholder="请选择"
          clearable
          :options="[
            { label: '不换行', value: 'nowrap' },
            { label: '换行', value: 'wrap' },
            { label: '反向换行', value: 'wrap-reverse' }
          ]"
        />
      </FormItem>
      <FormItem label="间距">
        <UnitInput v-model="styleForm.gap" :presets="['0']" :units="['px', 'em', 'rem', '%']" />
      </FormItem>

      <!-- 其他 -->
      <Divider contentPosition="left">其他</Divider>
      <FormItem label="光标样式">
        <Select
          v-model="styleForm.cursor"
          placeholder="请选择"
          clearable
          :options="[
            { label: '默认', value: 'default' },
            { label: '指针', value: 'pointer' },
            { label: '文本', value: 'text' },
            { label: '移动', value: 'move' },
            { label: '禁止', value: 'not-allowed' },
            { label: '等待', value: 'wait' }
          ]"
        />
      </FormItem>
      <FormItem label="阴影">
        <Input v-model="styleForm.boxShadow" placeholder="0 0 10px rgba(0,0,0,0.1)" clearable />
      </FormItem>
      <FormItem label="过渡">
        <Input v-model="styleForm.transition" placeholder="all 0.3s" clearable />
      </FormItem>
      <FormItem label="变换">
        <Input v-model="styleForm.transform" placeholder="translate(0, 0)" clearable />
      </FormItem>
    </Form>
  </div>
</template>

<script setup lang="ts">
import { reactive, watch } from 'vue'
import { useUI } from '@/hooks'
import { ns } from '@/utils'
import MarginInput from './MarginInput.vue'
import UnitInput from './UnitInput.vue'

defineOptions({
  name: 'StyleEditor'
})

const { Form, FormItem, Input, Select, ColorPicker, InputNumber, Slider, Divider } = useUI()

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
}
</style>
