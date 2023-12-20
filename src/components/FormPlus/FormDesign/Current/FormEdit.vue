<template>
  <div class="attrForm">
    <schema-form v-model="form" :schema="formOptions"></schema-form>
  </div>
</template>

<script setup lang="jsx">
import { computed, inject, ref } from "vue";
import { SchemaForm } from "../../components";
import formOptions from "./formOptions";

const schema = inject("$schema");

const form = computed({
  get() {
    return schema;
  },
  set(value) {
    Object.assign(schema, value);
  },
});
</script>

<style scoped lang="less">
.attrForm {
  height: 100%;
  overflow: auto;
  h3 {
    margin-bottom: 10px;
  }
}
</style>
