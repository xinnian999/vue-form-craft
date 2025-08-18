import install from './install'
import './theme.scss'

export default { install }

export { FormRender, FormDesign } from './components'

export { useFormInstance } from '@form-magic/core'

export type {
  FormElement,
  FormItemType,
  FormSchema,
  TemplateData,
  FormInstance
} from '@form-magic/core'
