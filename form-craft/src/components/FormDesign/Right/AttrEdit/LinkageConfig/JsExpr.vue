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
      <JsonSchemaEdit :json="designInstance.schema" @save="onSave" @init="onInit" />
    </div>
  </el-dialog>
</template>

<script setup lang="ts">
import JsonEditorType from 'jsoneditor'
import { JsonSchemaEdit } from '@/components'
import { useDesignInstance } from '@/hooks'
import type { FormSchema } from '@/types'
import { repirItems } from '@/utils'

const designInstance = useDesignInstance()

const visible = defineModel<boolean>()

const onSave = (json: FormSchema) => {
  const items = repirItems(json.items)
  designInstance.updateSchema({ ...json, items })
}

const onInit = (editor: JsonEditorType) => {
  const currentName = designInstance.current!.name

  setTimeout(() => {
    // 跳转到当前字段位置
    if (currentName) {
      const aceEditor = (editor as any)?.aceEditor
      if (aceEditor) {
        const session = aceEditor.session

        // 1. 先折叠所有节点
        session.foldAll()

        // 2. 搜索目标字段
        aceEditor.find(`"name": "${currentName}"`, {
          backwards: false,
          wrap: true,
          caseSensitive: true,
          wholeWord: false,
          regExp: false
        })

        // 3. 展开包含目标字段的节点
        const cursorPosition = aceEditor.getCursorPosition()
        if (cursorPosition) {
          // 展开当前行及其父级
          session.unfold(cursorPosition.row, true)
        }
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
