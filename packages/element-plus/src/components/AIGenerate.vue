<template>
  <div :class="ns('ai-generate')">
    <el-input v-model="input" size="large" placeholder="请输入表单需求，例如：生成一个登陆表单">
      <template #append>
        <el-button @click="handleGenerate" :loading="loading">AI生成</el-button>
      </template>
    </el-input>
  </div>
</template>

<script setup lang="ts">
import axios from 'axios'
import { ref } from 'vue'
import { tools, useDesignInstance } from '@form-magic/core'

const { ns } = tools

const input = ref('')

const loading = ref(false)

const designInstance = useDesignInstance()

const handleGenerate = async () => {
  loading.value = true

  const res = await axios.post('/ai/generateForm', { input: input.value })

  const data = res.data.data

  designInstance.updateSchema(data)

  loading.value = false
}
</script>
