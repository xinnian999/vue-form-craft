<template>
  <div :class="ns('upload')">
    <input
      ref="inputRef"
      type="file"
      :multiple="multiple"
      :name="name"
      :accept="accept"
      @change="handleFileChange"
      style="display: none"
    />

    <div
      v-if="drag"
      class="upload-dragger"
      :class="{ 'is-dragover': isDragover }"
      @click="triggerUpload"
      @dragover.prevent="isDragover = true"
      @dragleave.prevent="isDragover = false"
      @drop.prevent="handleDrop"
    >
      <Icon class="upload-icon" name="upload" />
      <div class="upload-text">
        拖拽文件到此处上传 <br />
        或<em>点击上传</em>
      </div>
    </div>

    <template v-else>
      <div v-if="listType === 'picture-card'" class="upload-picture-card" @click="triggerUpload">
        <Icon name="add" />
      </div>
      <Button v-else type="primary" @click="triggerUpload">{{ btnText }}</Button>
    </template>

    <div v-if="tip" class="upload-tip">{{ tip }}</div>

    <ul class="upload-file-list" :class="{ 'is-picture-card': listType === 'picture-card' }">
      <li v-for="(file, index) in fileList" :key="file.name + index" class="upload-file-item">
        <template v-if="listType === 'picture-card'">
          <img v-if="file.url" :src="file.url" class="upload-picture" />
          <span class="upload-actions">
            <Icon name="preview" @click="handlePreview(file)" />
            <Icon name="delete" @click="handleRemove(index)" />
          </span>
        </template>
        <template v-else>
          <Icon name="file" class="file-icon" />
          <span class="file-name" @click="handlePreview(file)">{{ file.name }}</span>
          <Icon name="close" class="remove-icon" @click="handleRemove(index)" />
        </template>
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { Icon } from '@/components'
import { useUI } from '@/hooks'
import { ns } from '@/utils'

const { Button, Message } = useUI()

export interface UploadFile {
  name: string
  url?: string
  status?: 'ready' | 'uploading' | 'success' | 'fail'
  raw?: File
}

interface Props {
  action: string
  multiple?: boolean
  btnText?: string
  tip?: string
  limit?: number
  drag?: boolean
  name?: string
  accept?: string
  listType?: 'text' | 'picture-card'
}

const props = withDefaults(defineProps<Props>(), {
  btnText: '点击上传',
  limit: 3,
  name: 'file',
  listType: 'text'
})

const fileList = defineModel<UploadFile[]>({
  default: () => []
})

const inputRef = ref<HTMLInputElement>()
const isDragover = ref(false)

const triggerUpload = () => {
  inputRef.value?.click()
}

const handleFileChange = (e: Event) => {
  const target = e.target as HTMLInputElement
  const files = target.files
  if (files) {
    processFiles(Array.from(files))
  }
  target.value = ''
}

const handleDrop = (e: DragEvent) => {
  isDragover.value = false
  const files = e.dataTransfer?.files
  if (files) {
    processFiles(Array.from(files))
  }
}

const processFiles = (files: File[]) => {
  if (props.limit && fileList.value.length + files.length > props.limit) {
    Message.warning(`最多只能上传 ${props.limit} 个文件`)
    return
  }

  files.forEach((file) => {
    const uploadFile: UploadFile = {
      name: file.name,
      status: 'ready',
      raw: file,
      url: file.type.startsWith('image/') ? URL.createObjectURL(file) : undefined
    }
    fileList.value = [...fileList.value, uploadFile]
    uploadToServer(uploadFile)
  })
}

const uploadToServer = async (file: UploadFile) => {
  if (!props.action || !file.raw) return

  const formData = new FormData()
  formData.append(props.name, file.raw)

  file.status = 'uploading'

  try {
    const response = await fetch(props.action, {
      method: 'POST',
      body: formData
    })

    if (response.ok) {
      file.status = 'success'
    } else {
      file.status = 'fail'
      Message.error(`${file.name} 上传失败`)
    }
  } catch {
    file.status = 'fail'
    Message.error(`${file.name} 上传失败`)
  }
}

const handlePreview = (file: UploadFile) => {
  if (file.url) {
    window.open(file.url)
  }
}

const handleRemove = async (index: number) => {
  const file = fileList.value[index]
  try {
    await Message.confirm(`确定要删除 ${file.name} 吗？`)
    fileList.value = fileList.value.filter((_, i) => i !== index)
  } catch {
    // 用户取消
  }
}
</script>

<style lang="scss">
@import '@/style';

@include ns('upload') {
  .upload-dragger {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-width: 300px;
    padding: 20px;
    border: 1px dashed $borderColor;
    border-radius: 6px;
    cursor: pointer;
    transition: border-color 0.2s;

    &:hover,
    &.is-dragover {
      border-color: $themeColor;
    }

    .upload-icon {
      font-size: 48px;
      color: $textColorSecondary;
    }

    .upload-text {
      margin-top: 10px;
      color: $textColorSecondary;
      text-align: center;

      em {
        color: $themeColor;
        font-style: normal;
      }
    }
  }

  .upload-picture-card {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100px;
    height: 100px;
    border: 1px dashed $borderColor;
    border-radius: 6px;
    cursor: pointer;
    transition: border-color 0.2s;

    &:hover {
      border-color: $themeColor;
    }
  }

  .upload-tip {
    margin-top: 8px;
    font-size: 12px;
    color: $textColorSecondary;
  }

  .upload-file-list {
    margin: 0;
    padding: 0;
    list-style: none;

    &.is-picture-card {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      margin-top: 10px;

      .upload-file-item {
        position: relative;
        width: 100px;
        height: 100px;
        border-radius: 6px;
        overflow: hidden;

        .upload-picture {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .upload-actions {
          position: absolute;
          inset: 0;
          display: none;
          align-items: center;
          justify-content: center;
          gap: 10px;
          background: rgba(0, 0, 0, 0.5);
          color: #fff;
          cursor: pointer;
        }

        &:hover .upload-actions {
          display: flex;
        }
      }
    }
  }

  .upload-file-item {
    display: flex;
    align-items: center;
    padding: 5px 0;

    .file-icon {
      margin-right: 8px;
      color: $textColorSecondary;
    }

    .file-name {
      flex: 1;
      cursor: pointer;
      color: $textColor3;

      &:hover {
        color: $themeColor;
      }
    }

    .remove-icon {
      cursor: pointer;
      color: $textColorSecondary;

      &:hover {
        color: $dangerColor;
      }
    }
  }
}
</style>
