import install from './install'
import './styles/index.scss'

export default { install }

export { FormRender, FormDesign } from './components'

export { useFormInstance } from '@magic-form/core'

export type {
  FormElement,
  FormItemType,
  FormSchema,
  TemplateData,
  FormInstance
} from '@magic-form/core'
