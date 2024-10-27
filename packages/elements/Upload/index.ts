import Icon from '@vue-form-craft/icons'
import { h } from 'vue'
import type { FormElement } from '@vue-form-craft/types'
import attrSchema from './attrSchema'
import component from './Component.vue'

export default {
  name: '上传',
  component,
  icon: h(Icon, { name: 'upload' }),
  type: 'basic',
  order: 10,
  attrSchema,
  initialValues: {
    label: '上传',
    component: 'Upload',
    props: {
      action: 'https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15',
      name: 'file',
      multiple: true,
      btnText: '点击上传',
      limit: 3,
      showFileList: true,
      withCredentials: true,
      listType: 'text'
    }
  }
} satisfies FormElement
