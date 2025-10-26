<template>
  <el-dialog
    destroy-on-close
    v-model="visible"
    top="3vh"
    :title="`${designInstance.current?.label} - JS表达式`"
    width="70vw"
    center
  >
    <div class="config-linkages">
      <p>
        《JS表达式》使用方法请参考：<el-link
          type="primary"
          href="https://xinnian999.github.io/form-craft/zh/linkage.html#js表达式"
          target="_blank"
          >VueFormCraft表单联动</el-link
        >
      </p>
      <JsonSchemaEdit :json="designInstance.getSchema()" @save="onSave" @init="onInit" />
    </div>
  </el-dialog>
</template>

<script setup lang="ts">
import JsonEditorType from 'jsoneditor'
import { JsonSchemaEdit } from '@/components'
import { useDesignInstance } from '@/hooks'
import type { FormSchema } from '@/types'
import { repirJsonSchema } from '@/utils'

const designInstance = useDesignInstance()!

const visible = defineModel<boolean>()

const onSave = (json: FormSchema) => {
  const jsonSchema = repirJsonSchema(json)
  designInstance.applySchema(jsonSchema)
}

const onInit = (editor: JsonEditorType) => {
  const currentName = designInstance.current!.name

  // const currentPlaceholder = '请输入'

  setTimeout(() => {
    // 跳转到当前字段位置
    if (currentName) {
      const aceEditor = editor.aceEditor
      if (aceEditor) {
        // 先找到唯一的 currentName
        aceEditor.find(currentName, {
          backwards: false,
          wrap: true,
          caseSensitive: true,
          wholeWord: false,
          regExp: false
        })

        // 然后从当前位置继续查找 currentPlaceholder
        // aceEditor.find(currentPlaceholder, {
        //   backwards: true,
        //   wrap: true,
        //   caseSensitive: true,
        //   wholeWord: false,
        //   regExp: false
        // })
      }
    }
  }, 100)
}
</script>

<style lang="scss" scoped>
.config-linkages {
  gap: 15px;
  flex-direction: column;
}
</style>
