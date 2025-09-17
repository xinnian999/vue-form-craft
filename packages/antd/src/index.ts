import install from './install'
import './theme.scss'

export default { install }

export { FormRender, FormDesign } from './components'

export { useFormInstance } from '@vue-form-craft/core'

export type {
  FormElement,
  FormItemType,
  FormSchema,
  TemplateData,
  FormInstance
} from '@vue-form-craft/core'
