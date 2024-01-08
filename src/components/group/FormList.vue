<template>
  <div id="formList">
    <template v-if="mode === 'inline'">
      <el-form-item v-for="(item, index) in list" :key="item.key" class="list-item">
        <div class="list-item-content">
          <el-space>
            <form-item
              v-for="field in children"
              v-model="item[field.name]"
              v-bind="field"
              :key="field.label"
              label=""
            />
          </el-space>

          <el-button
            v-if="allowReduce"
            @click="handleReduceItem(index)"
            circle
            type="primary"
            class="list-btn"
          >
            <template #icon> <icon-render name="reduce" color="#fff" /> </template
          ></el-button>
        </div>
      </el-form-item>
    </template>

    <template v-if="mode === 'card'">
      <el-card v-for="(item, index) in list" :key="item.key" class="list-card">
        <template #header>
          <div class="card-header">
            <span>{{ title + index }}</span>
            <el-button
              v-if="allowReduce"
              @click="handleReduceItem(index)"
              circle
              type="primary"
              class="list-btn"
            >
              <template #icon> <icon-render name="reduce" color="#fff" /> </template>
            </el-button>
          </div>
        </template>
        <form-item
          v-for="field in children"
          v-model="item[field.name]"
          v-bind="field"
          :key="field.label"
          class="list-card-item"
        />
      </el-card>
    </template>

    <el-table :data="list" style="width: 100%" v-if="mode === 'table' && list.length">
      <el-table-column
        :prop="item.name"
        :label="item.label"
        :key="item.name"
        v-for="item in children"
        :formatter="($event) => formatter(item, $event)"
      />
      <el-table-column fixed="right" min-width="60">
        <template #default="record">
          <el-button
            v-if="allowReduce"
            @click="handleReduceItem(record.$index)"
            circle
            type="primary"
            class="list-btn"
          >
            <template #icon> <icon-render name="reduce" color="#fff" /> </template
          ></el-button>
        </template>
      </el-table-column>
    </el-table>

    <div>
      <el-button
        v-if="allowAdd && !isMax"
        @click="handleAddItem"
        circle
        type="primary"
        class="list-btn addBtn"
      >
        <template #icon> <icon-render name="add" color="#fff" /></template>
      </el-button>
    </div>
  </div>
</template>

<script setup lang="jsx">
import { computed, defineProps, defineEmits, watch } from 'vue'
import { ElFormItem, ElSpace, ElButton, ElCard, ElTableColumn, ElTable } from 'element-plus'
import FormItem from '../FormItem.vue'

const props = defineProps({
  modelValue: Array,
  children: Array,
  allowAdd: {
    default: true,
    type: Boolean
  },
  allowReduce: {
    default: true,
    type: Boolean
  },
  defaultLineCount: {
    default: 0,
    type: Number
  },
  maxLines: {
    default: 999,
    type: Number
  },
  mode: {
    default: 'table',
    type: String
  },
  title: {
    default: '卡片',
    type: String
  },
  newItemDefaults: {
    type: Function,
    default: () => ({})
  }
})
const emit = defineEmits(['update:modelValue'])

const list = computed({
  get() {
    return props.modelValue || []
  },
  set(val) {
    console.log(val)
    emit('update:modelValue', val)
  }
})

const isMax = computed(() => {
  return list.value.length >= props.maxLines
})

const handleAddItem = () => {
  if (isMax.value) {
    return
  }
  emit('update:modelValue', [...list.value, props.newItemDefaults(list.value.length)])
}

const handleReduceItem = (index) => {
  const newData = list.value.filter((v, i) => i !== index)
  emit('update:modelValue', newData)
}

const formatter = (item, data) => {
  return (
    <FormItem
      {...item}
      label=""
      modelValue={data[item.name]} // 设置 value 属性
      onUpdate:modelValue={(newValue) => (data[item.name] = newValue)}
      style={{ marginBottom: 0 }}
    />
  )
}
</script>

<style lang="less">
#formList {
  position: relative;
  width: 100%;
  .list-item {
    margin-bottom: 10px;
    .list-item-content {
      display: flex;
    }
  }
  .list-card {
    margin-bottom: 10px;
    .card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .list-card-item {
      margin-bottom: 15px;
    }
  }
  .list-btn {
    margin-left: 10px;
  }

  .addBtn {
  }
}
</style>
