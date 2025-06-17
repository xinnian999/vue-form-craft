import FormRender from '@/form-render'
import FormDesign from '@/form-design'
import install from './install'
import '@/styles'

export default { install }

export { FormDesign, FormRender }

export { useFormInstance } from '@/hooks'

export type {
  FormElement,
  FormItemType,
  FormSchema,
  TemplateData,
  FormInstance
} from '@/types/index'
