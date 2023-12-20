<template>
  <div class="attrForm">
    <schema-form
      v-model="current"
      :schema="attrs[current.component]"
    ></schema-form>

    <div>
      <el-button @click="handleEdit">编辑配置文本</el-button>
    </div>

    <el-drawer destroy-on-close v-model="editVisible">
      <json-editor-vue
        class="editor"
        v-model="current"
        currentMode="code"
        :modeList="['text', 'view', 'tree', 'code', 'form']"
        :options="{ search: true, history: true }"
        language="zh"
      />
    </el-drawer>
  </div>
</template>

<script setup lang="jsx">
import { inject, ref } from "vue";
import JsonEditorVue from "json-editor-vue3";
import * as attrs from "./attrs";
import { SchemaForm } from "../../components";

const current = inject("$current");

const editVisible = ref(false);

const handleEdit = () => {
  editVisible.value = true;
};
</script>

<style scoped lang="less">
.attrForm {
  h3 {
    margin-bottom: 10px;
  }
}
</style>
