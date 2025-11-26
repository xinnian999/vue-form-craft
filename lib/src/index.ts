import install from './install'

export default { install }

export { FormRender, FormDesign } from './components'

export { useFormInstance } from '@/hooks'

export { createAiHelper } from '@/utils/aiHelper'

export type {
  FormElement,
  FormItemType,
  FormSchema,
  TemplateData,
  FormInstance,
  AiGenerateParams,
  AiGenerateFunction
} from '@/types'
