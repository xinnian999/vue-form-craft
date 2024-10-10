import {  $useFormInstance } from '@vue-form-craft/config/symbol'
import { inject } from 'vue'

const useFormInstance = () => {
  return inject($useFormInstance)!
}

export default useFormInstance
