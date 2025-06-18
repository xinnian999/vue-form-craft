import install from './install'
import '@/styles/index.scss'

export { FormRender, FormDesign } from '@/components'

export default { install }

export { useFormInstance } from '@form-magic/core'

export type {
  FormElement,
  FormItemType,
  FormSchema,
  TemplateData,
  FormInstance
} from '@form-magic/core'
