import UploadImage from './UploadImage.vue'
import attr from './attr'

export default {
  name: '图片上传',
  component: UploadImage,
  icon: 'uploadImage',
  type: 'basic',
  order: 13,
  attr,
  initialValues: {
    label: '图片上传',
    component: 'UploadImage',
    props: {
      width: 150,
      height: 150,
      uploadKey: 'image',
      action: 'https://hyl999.co/api/upload/image',
      fileTypes: ['jpeg', 'png'],
      size: 5
    }
  }
}
