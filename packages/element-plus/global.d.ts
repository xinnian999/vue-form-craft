declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    FormRender: (typeof import(@form-magic/element-plus))['FormRender']
    FormDesign: (typeof import(@form-magic/element-plus))['FormDesign']
  }
}

export {}
