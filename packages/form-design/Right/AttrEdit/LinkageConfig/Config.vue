<template>
  <el-dialog
    destroy-on-close
    v-model="visible"
    top="3vh"
    :title="`${designInstance.current?.label} - 配置级联动`"
    width="75vw"
    center
  >
    <div class="config-linkages">
      <div class="quick">
        <FormRender
          v-model="quickValues"
          :schema="quickSchema(designInstance.schema)"
          ref="quickRef"
        />
        <el-button
          v-if="quickValues.quick?.length"
          @click="handleUseQuick"
          style="margin-bottom: 20px"
          type="primary"
          >应用快速配置</el-button
        >
      </div>

      <ElAffix class="edit">
        <FormRender v-model="designInstance.current!" :schema="editSchema" />
      </ElAffix>
    </div>
  </el-dialog>
</template>

<script setup lang="ts">
import FormRender from '@vue-form-craft/form-render'
import { quickSchema, editSchema } from './configSchema'
import { useDesignInstance } from '@vue-form-craft/hooks'
import { ref, watch } from 'vue'
import { setDataByPath } from '@vue-form-craft/utils'
import type { FormInstance } from '@vue-form-craft/types'
import { generateCondition, parseQuick, type ConfigLinkage } from './utils'
import { cloneDeep, isBoolean } from 'lodash'

const designInstance = useDesignInstance()

const visible = defineModel<boolean>()

const quickRef = ref<FormInstance>()

const quickValues = ref<Record<string, any>>({})

const handleUseQuick = async () => {
  // console.log(quickValues.value.quick)
  await quickRef.value?.validate()

  const linkages: Record<string, string>[] = quickValues.value.quick.map((item: ConfigLinkage) => {
    const { name, conditions, trueReturn, falseReturn } = item

    let value = generateCondition(conditions)

    if (!isBoolean(trueReturn) && !isBoolean(falseReturn)) {
      value += ` ? ${trueReturn} : ${falseReturn}`
    }

    return {
      name,
      value
    }
  })
  

  const newCurrent = linkages.reduce((acc, { name, value }) => {
    return setDataByPath(acc, name, `{{ ${value} }}`)
  }, cloneDeep(designInstance.current!))

  designInstance.updateCurrent(newCurrent)
}

watch(visible, (newVal) => {
  if (newVal) {
    quickValues.value = {
      quick: parseQuick(designInstance.current!)
    }
  } else {
    quickValues.value = {}
  }
})
</script>

<style lang="scss" scoped>
.config-linkages {
  display: flex;
  gap: 20px;
  .quick {
    width: 50%;
  }
  .edit {
    width: 50%;
  }
}
</style>
