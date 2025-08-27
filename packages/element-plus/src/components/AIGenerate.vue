<template>
  <div class="ai-generate">
    <el-input v-model="input" size="large">
      <template #append>
        <el-button @click="handleGenerate" :loading="loading">AI生成</el-button>
      </template>
    </el-input>
  </div>
</template>

<script setup lang="ts">
import axios from 'axios'
import { ref } from 'vue'
import { useDesignInstance } from '@form-magic/core'

const input = ref('生成一个登陆表单')

const loading = ref(false)

const designInstance = useDesignInstance()

const handleGenerate = async () => {
  loading.value = true
  const res = await axios.post('/ai/generateForm', { input: input.value })
  const data = res.data.data
  // console.log(data)
  loading.value = false

  const match = data.match(/```json\s*([\s\S]*?)```/)
  if (match) {
    const jsonContent = match[1].trim()
    const json = JSON.parse(jsonContent)
    console.log('json', json)
    designInstance.updateSchema(json)
  }
  // designInstance.updateSchema({
  //   labelWidth: 150,
  //   labelAlign: 'right',
  //   size: 'default',
  //   scrollToError: true,
  //   items: [
  //     {
  //       component: 'Input',
  //       designKey: 'design-l6dB',
  //       name: 'form-LXJ2',
  //       label: '单行文本',
  //       props: {
  //         placeholder: '请输入文本'
  //       }
  //     }
  //   ]
  // })
}
</script>

<style scoped lang="scss">
.ai-generate {
  position: absolute;
  bottom: 50px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 10px;
  width: 400px;
}
</style>
