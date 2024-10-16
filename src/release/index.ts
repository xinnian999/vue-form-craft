import { FormDesign, FormRender } from '@vue-form-craft/components'
import install from './install'

export default { install }

export { FormDesign, FormRender }

export { default as useFormInstance } from '@vue-form-craft/hooks/useFormInstance'

export type {
  FormElement,
  FormItemType,
  FormSchema,
  TemplateData,
  FormInstance
} from '@vue-form-craft/config/commonType'
