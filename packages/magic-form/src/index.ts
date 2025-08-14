import install from './install'
import './styles/index.scss'

export default { install }

export { FormRender, FormDesign } from './components'

export { useFormInstance } from '@/hooks'

export type {
  FormElement,
  FormItemType,
  FormSchema,
  TemplateData,
  FormInstance
} from '@magic-form/core'
