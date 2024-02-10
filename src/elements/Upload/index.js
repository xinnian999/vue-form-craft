import Upload from './Upload.vue'
import attr from './attr'

export default {
  name: '文件上传',
  component: Upload,
  icon: 'upload',
  type: 'basic',
  order: 13,
  attr,
  initialValues: {
    label: '文件上传',
    component: 'Upload',
    props: {
      uploadKey: 'file',
      action: 'https://hyl999.co/api/upload/image',
      size: 5,
      buttonText: '点击上传',
      limit: 2,
      showFileList: true
    }
  }
}
