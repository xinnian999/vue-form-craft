<template>
  <el-upload
    class="image-uploader"
    :action="action"
    :show-file-list="false"
    :on-success="handleAvatarSuccess"
    :before-upload="beforeAvatarUpload"
    :name="uploadKey"
  >
    <img v-if="imageUrl" :src="imageUrl" class="image" :style="imageSizeStyle" />
    <div class="container" :style="imageSizeStyle" v-else><icon-render name="add" /></div>
  </el-upload>
</template>

<script setup>
import { ref, defineProps, computed } from 'vue'
import { ElMessage, ElUpload } from 'element-plus'
import { getDataByPath } from '@/utils'

const props = defineProps({
  action: String,
  height: Number,
  width: Number,
  fileTypes: { type: Array, default: () => [] },
  size: Number,
  dataPath: {
    type: String,
    default: 'data'
  },
  modelValue: String,
  uploadKey: {
    type: String,
    default: 'image'
  }
})

const emits = defineEmits(['update:modelValue'])

const imageUrl = ref('')

const imageSizeStyle = computed(() => {
  return {
    height: props.height + 'px',
    lineHeight: props.height + 'px',
    width: props.width + 'px'
  }
})

const handleAvatarSuccess = (response, uploadFile) => {
  imageUrl.value = URL.createObjectURL(uploadFile.raw)
  emits('update:modelValue', getDataByPath(response, props.dataPath))
}

const beforeAvatarUpload = (rawFile) => {
  const [, type] = rawFile.type.split('/')

  if (!props.fileTypes.includes(type)) {
    ElMessage.error('不支持该图片格式!')
    return false
  }

  if (rawFile.size / 1024 / 1024 > props.size) {
    ElMessage.error(`图片文件大小不能超过${props.size}MB！`)
    return false
  }

  return true
}
</script>

<style scoped>
.image-uploader .image {
  width: 150px;
  height: 150px;
  display: block;
  border-radius: 6px;
}
.image-uploader .container {
  border: 1px dashed var(--el-border-color);
  width: 150px;
  height: 150px;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
  text-align: center;
  font-size: 28px;
  color: #8c939d;
  line-height: 150px;
}

.image-uploader .container:hover {
  border-color: var(--el-color-primary);
}
</style>
