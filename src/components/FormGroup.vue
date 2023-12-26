<template>
  <div id="formGroup">
    <el-card v-if="component === 'card'" v-bind="props" :header="label">
      <form-render v-model="form" :formItems="children" />
    </el-card>

    <form-item v-if="component === 'formList'" v-bind="thisProps">
      <form-list
        v-model="formValues[name]"
        v-bind="props"
        :children="children"
        :title="label"
      />
    </form-item>

    <item-group
      v-if="component === 'itemGroup'"
      v-model="formValues[name]"
      :children="children"
    >
    </item-group>
  </div>
</template>

<script setup lang="jsx">
import { defineProps, inject, computed, defineEmits } from "vue";
import FormList from "./group/FormList.vue";
import ItemGroup from "./group/ItemGroup.vue";
import FormRender from "./FormRender.vue";
import FormItem from "./FormItem.vue";

const thisProps = defineProps({
  label: String,
  name: String,
  component: String,
  required: Boolean,
  props: Object,
  modelValue: null,
  initialValue: null,
  children: Array,
});

const emit = defineEmits(["update:modelValue"]);

const form = computed({
  get() {
    return thisProps.modelValue;
  },
  set(val) {
    emit("update:modelValue", val);
  },
});

// 通过Proxy接管的数据源，某项属性被修改会立刻通知父组件，遵守单项数据流原则
const formValues = computed(() => {
  return new Proxy(thisProps.modelValue, {
    set(target, key, value) {
      // console.log(target, key, value);
      emit("update:modelValue", { ...target, [key]: value });
      return true;
    },
  });
});
</script>

<style lang="less" scoped>
#formGroup {
  margin-bottom: 18px;
}
</style>
