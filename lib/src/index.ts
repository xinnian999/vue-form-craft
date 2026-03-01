import install from './install'

export default { install }

export { FormRender, FormDesign } from './components'

export { useFormInstance } from '@/hooks'

export * from './uiAdapter'

export type {
  FormElement,
  FormItemType,
  FormSchema,
  TemplateData,
  FormInstance,
  AiGenerateParams,
  AiGenerateFunction
} from '@/types'
