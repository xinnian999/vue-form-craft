import { FormDesign, FormRender } from '@vue-form-craft/components'
import install from './install'
import '@vue-form-craft/styles'

export default { install }

export { FormDesign, FormRender }

export { useFormInstance } from '@vue-form-craft/hooks'

export type {
  FormElement,
  FormItemType,
  FormSchema,
  TemplateData,
  FormInstance
} from '@vue-form-craft/types'
