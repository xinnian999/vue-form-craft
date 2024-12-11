<template>
  <div class="vfc-CompositeInput">
    <el-select v-model="typeValue" class="inputType">
      <el-option
        v-for="item in typeOptions"
        :label="item.label"
        :value="item.value"
        :key="item.value"
      />
    </el-select>

    <el-input v-model="value" class="input" v-if="typeValue === 'string'" />
    <el-input-number
      v-model="value"
      class="input"
      controlsPosition="right"
      v-if="typeValue === 'number'"
    />
    <el-tree-select
      v-model="value"
      :data="varOptions"
      class="input"
      :renderContent="renderTreeNode"
      v-if="typeValue === 'var'"
    />
    <el-select v-if="typeValue === 'boolean'" v-model="value" class="inputType">
      <el-option label="true" :value="true" />
      <el-option label="false" :value="false" />
    </el-select>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

type Props = {
  varOptions?: any[]
  renderTreeNode: (node: any) => any
  initType: string
}

const props = defineProps<Props>()

const value = defineModel<any>({
  default: ''
})

const typeValue = ref(props.initType)

const typeOptions = [
  {
    label: '变量',
    value: 'var'
  },
  {
    label: '字符串',
    value: 'string'
  },
  {
    label: '数字',
    value: 'number'
  },
  {
    label: '布尔值',
    value: 'boolean'
  }
]
</script>

<style lang="scss">
.vfc-CompositeInput {
  // width: 100%;
  display: flex;
  .input {
    flex: 1;
    min-width: 150px;
  }
  .inputType {
    width: 90px;
  }
}
</style>
