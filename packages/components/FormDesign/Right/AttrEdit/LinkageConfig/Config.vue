<template>
  <Dialog
    destroy-on-close
    v-model="visible"
    top="3vh"
    :title="`${designInstance.current?.label} - 配置级联动`"
    width="70vw"
    center
  >
    <div class="config-linkages">
      <!-- <div class="quick">
        <FormRender v-model="quickValues" :schema="quickSchema(designInstance.schema)" />
        <el-button
          v-if="quickValues.quick?.length"
          @click="handleUseQuick"
          style="margin-bottom: 20px"
          type="primary"
          >应用快速配置</el-button
        >
      </div> -->
      <FormRender v-model="designInstance.current!" :schema="editSchema" class="edit" />
    </div>
  </Dialog>
</template>

<script setup lang="ts">
import { quickSchema, editSchema } from './configSchema'
import { useComponents, useDesignInstance, setDataByPath } from '@form-magic/core'
import { FormRender } from '@form-magic/components'
import { ref } from 'vue'

const { Dialog } = useComponents()

const designInstance = useDesignInstance()

const visible = defineModel<boolean>()

const quickValues = ref<Record<string, any>>({})

const handleUseQuick = () => {
  console.log(quickValues.value.quick)

  quickValues.value.quick.map((item: any) => {
    const { name, type, variable, compute, numValue } = item

    if (type === 'var') {
      const newCurrent = setDataByPath(designInstance.current!, name, `{{ ${variable.join('.')} }}`)
      designInstance.updateCurrent(newCurrent)
    }

    if (type === 'computeVar' && compute.length > 1) {
      const [computeType, valueType] = compute

      let all = variable.join('.')

      const computeTypeParse = computeType
        .replaceAll('greater', ' > ')
        .replaceAll('equal', ' === ')
        .replaceAll('less', ' < ')

      all += computeTypeParse

      if (valueType === 'numValue') {
        all += numValue
      }

      const newCurrent = setDataByPath(designInstance.current!, name, `{{ ${all} }}`)
      designInstance.updateCurrent(newCurrent)
    }

    if (type === 'computeVar' && compute.length === 1) {
      const [bool] = compute

      const parseBoolean = bool.replaceAll('true', '!!').replaceAll('false', '!')

      const newCurrent = setDataByPath(
        designInstance.current!,
        name,
        `{{ ${parseBoolean}${variable.join('.')} }}`
      )
      designInstance.updateCurrent(newCurrent)
    }
  })
}
</script>

<style lang="scss" scoped>
.config-linkages {
  display: flex;
  gap: 20px;
  flex-direction: column
  // .quick {
  //   width: 50%;
  // }
  // .edit {
  //   width: 50%;
  // }
}
</style>
