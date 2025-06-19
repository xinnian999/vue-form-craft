import install from './install'
import '@form-magic/styles'

export { FormRender, FormDesign } from '@form-magic/components'

export default { install }

export { useFormInstance } from '@form-magic/core'

export type {
  FormElement,
  FormItemType,
  FormSchema,
  TemplateData,
  FormInstance
} from '@form-magic/core'
